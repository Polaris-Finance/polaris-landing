import { Footer } from "@/components/Footer";
import { NotFoundContent } from "@/components/NotFoundContent";
import { TopNav } from "@/components/TopNav";
import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--polaris-navy-darkest)]">
      <TopNav />

      <NotFoundContent
        title="Post not found"
        message="The blog post you're looking for doesn't exist or has been moved."
        actions={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog" className="btn-primary inline-flex items-center justify-center gap-2">
              View all posts
            </Link>
            <Link href="/" className="btn-secondary inline-flex items-center justify-center gap-2">
              Return home
            </Link>
          </div>
        }
      />

      <Footer />
    </main>
  );
}
