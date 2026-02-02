"use client";

import { ZoomInIcon } from "@/components/icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type BlogImageLightboxProps = {
  src: string;
  alt: string;
};

export function BlogImageLightbox({ src, alt }: BlogImageLightboxProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group relative my-6 block w-full cursor-zoom-in overflow-hidden rounded-lg border border-[rgba(232,220,196,0.1)] transition-[border-color] hover:border-[rgba(232,220,196,0.25)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="block w-full rounded-lg"
            loading="lazy"
            decoding="async"
          />
          <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-[rgba(232,220,196,0.15)] bg-[rgba(5,10,20,0.75)] px-3 py-1.5 text-xs text-cream-muted opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <ZoomInIcon className="h-3.5 w-3.5" />
            View full size
          </span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="flex max-h-[90vh] max-w-[95vw] items-center justify-center border-[rgba(232,220,196,0.1)] bg-transparent p-0 sm:rounded-2xl"
        aria-describedby={undefined}
      >
        <VisuallyHidden>
          <DialogTitle>{alt || "Image preview"}</DialogTitle>
        </VisuallyHidden>
        <div
          className="overflow-auto"
          style={{ touchAction: "pan-x pan-y pinch-zoom" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[88vh] max-w-[93vw] rounded-2xl object-contain"
          />
        </div>
        <DialogClose className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(232,220,196,0.15)] bg-[rgba(5,10,20,0.75)] text-cream-muted backdrop-blur-sm transition hover:text-star sm:-right-10 sm:top-0">
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
