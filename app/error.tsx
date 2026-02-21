"use client";

import { AlertTriangleIcon } from "@/components/icons";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--polaris-navy-darkest)] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <AlertTriangleIcon className="mx-auto h-16 w-16 text-[var(--polaris-star)]" />
        </div>
        <h1 className="font-serif text-2xl text-[var(--polaris-star)] mb-4">
          Something went wrong
        </h1>
        <p className="text-[var(--polaris-cream-muted)] mb-8">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="btn-primary inline-flex items-center gap-2"
        >
          Try again
        </button>
        {error.digest && (
          <p className="mt-6 text-xs text-[var(--polaris-cream-muted)] opacity-50">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
