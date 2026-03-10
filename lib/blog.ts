import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sharp from "sharp";

const postsDirectory = path.join(process.cwd(), "content/blog");
const publicDirectory = path.join(process.cwd(), "public");

type BlogFrontmatter = {
  title?: string;
  description?: string;
  date?: string;
  updatedDate?: string;
  author?: string;
  image?: string;
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedDate?: string;
  lastModified: string;
  author: string;
  image?: string;
  imageSources: string[];
  readingTime: number;
  wordCount: number;
  content: string;
};

export type BlogPostMeta = Omit<BlogPost, "content">;

export type LocalImageMetadata = {
  src: string;
  width: number;
  height: number;
  mimeType: string;
};

function countWords(text: string) {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function estimateReadingTime(text: string): number {
  const words = countWords(text);
  return Math.max(1, Math.ceil(words / 230));
}

function normalizeText(value: unknown, fallback = "") {
  if (typeof value !== "string") {
    return fallback;
  }

  return value.trim();
}

function normalizeRequiredDate(value: unknown, field: string, relativePath: string) {
  const normalized = normalizeText(value);
  if (!normalized) {
    throw new Error(`${relativePath}: missing required frontmatter field "${field}"`);
  }

  if (Number.isNaN(new Date(normalized).valueOf())) {
    throw new Error(`${relativePath}: invalid date value for "${field}"`);
  }

  return normalized;
}

function normalizeOptionalDate(value: unknown, field: string, relativePath: string) {
  const normalized = normalizeText(value);
  if (!normalized) {
    return undefined;
  }

  if (Number.isNaN(new Date(normalized).valueOf())) {
    throw new Error(`${relativePath}: invalid date value for "${field}"`);
  }

  return normalized;
}

function validateImagePath(image: unknown, relativePath: string) {
  const normalized = normalizeText(image);
  if (!normalized) {
    return undefined;
  }

  if (!normalized.startsWith("/")) {
    throw new Error(`${relativePath}: image path must start with "/"`);
  }

  const resolvedPath = path.join(publicDirectory, normalized.slice(1));
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`${relativePath}: image file not found at "${normalized}"`);
  }

  return normalized;
}

export function extractMarkdownImageSources(markdown: string) {
  const imageRegex = /!\[[^\]]*]\(([^)\s]+)[^)]*\)/g;
  const sources = new Set<string>();
  let match;

  while ((match = imageRegex.exec(markdown)) !== null) {
    const src = match[1]?.trim();
    if (src?.startsWith("/")) {
      sources.add(src);
    }
  }

  return Array.from(sources);
}

function getGitLastModifiedDate(relativePath: string) {
  try {
    const output = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", relativePath],
      {
        cwd: process.cwd(),
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }
    ).trim();

    return output || null;
  } catch {
    return null;
  }
}

function resolveLastModifiedDate(relativePath: string, publishedDate: string, updatedDate?: string) {
  if (updatedDate) {
    return new Date(updatedDate).toISOString();
  }

  const gitLastModified = getGitLastModifiedDate(relativePath);
  if (gitLastModified && !Number.isNaN(new Date(gitLastModified).valueOf())) {
    return new Date(gitLastModified).toISOString();
  }

  return new Date(publishedDate).toISOString();
}

function parsePostFile(fileName: string, fileContents: string): BlogPost {
  const slug = fileName.replace(/\.md$/, "");
  const relativePath = path.posix.join("content/blog", fileName);
  const { data, content } = matter(fileContents);
  const frontmatter = data as BlogFrontmatter;
  const title = normalizeText(frontmatter.title, slug);
  const description = normalizeText(frontmatter.description);
  const date = normalizeRequiredDate(frontmatter.date, "date", relativePath);
  const updatedDate = normalizeOptionalDate(frontmatter.updatedDate, "updatedDate", relativePath);
  const author = normalizeText(frontmatter.author, "Polaris Team");
  const image = validateImagePath(frontmatter.image, relativePath);
  const contentImageSources = extractMarkdownImageSources(content);
  const imageSources = Array.from(new Set(image ? [image, ...contentImageSources] : contentImageSources));
  const wordCount = countWords(content);

  return {
    slug,
    title,
    description,
    date,
    updatedDate,
    lastModified: resolveLastModifiedDate(relativePath, date, updatedDate),
    author,
    image,
    imageSources,
    readingTime: estimateReadingTime(content),
    wordCount,
    content,
  };
}

function readPostFile(fileName: string) {
  const fullPath = path.join(postsDirectory, fileName);
  return fs.readFileSync(fullPath, "utf8");
}

const imageMetadataCache = new Map<string, Promise<LocalImageMetadata | null>>();

function resolveMimeType(format: string | undefined, src: string) {
  const ext = (format || path.extname(src).slice(1)).toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "avif":
      return "image/avif";
    case "svg":
      return "image/svg+xml";
    default:
      return "image/png";
  }
}

export async function getLocalImageMetadata(src?: string) {
  if (!src?.startsWith("/")) {
    return null;
  }

  if (!imageMetadataCache.has(src)) {
    imageMetadataCache.set(
      src,
      (async () => {
        const filePath = path.join(publicDirectory, src.slice(1));
        if (!fs.existsSync(filePath)) {
          return null;
        }

        const metadata = await sharp(filePath).metadata();
        if (!metadata.width || !metadata.height) {
          return null;
        }

        return {
          src,
          width: metadata.width,
          height: metadata.height,
          mimeType: resolveMimeType(metadata.format, src),
        };
      })()
    );
  }

  return imageMetadataCache.get(src)!;
}

export async function getLocalImageMetadataMap(sources: string[]) {
  const uniqueSources = Array.from(new Set(sources.filter((source) => source.startsWith("/"))));
  const entries = await Promise.all(
    uniqueSources.map(async (source) => [source, await getLocalImageMetadata(source)] as const)
  );

  return new Map(
    entries.filter(([, metadata]) => Boolean(metadata)) as [string, LocalImageMetadata][]
  );
}

export function getAllPosts(): BlogPostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const post = parsePostFile(fileName, readPostFile(fileName));
      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        updatedDate: post.updatedDate,
        lastModified: post.lastModified,
        author: post.author,
        image: post.image,
        imageSources: post.imageSources,
        readingTime: post.readingTime,
        wordCount: post.wordCount,
      };
    });

  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fileName = `${slug}.md`;
    return parsePostFile(fileName, readPostFile(fileName));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }

    console.error(`Failed to load blog post "${slug}":`, error);
    throw error;
  }
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getLatestPostLastModified(posts: BlogPostMeta[] = getAllPosts()) {
  if (posts.length === 0) {
    return null;
  }

  return posts.reduce((latest, post) => {
    return new Date(post.lastModified) > new Date(latest.lastModified) ? post : latest;
  }).lastModified;
}
