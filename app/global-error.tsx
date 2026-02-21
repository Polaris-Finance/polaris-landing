"use client";

// global-error.tsx renders its own <html> tag outside the normal layout,
// so CSS variables and shared components are unavailable. Hex values here
// mirror the design tokens: #050a14 = --polaris-navy-darkest,
// #E8DCC4 = --polaris-star, #F5F0E6 = --polaris-cream.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#050a14]">
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-[#E8DCC4]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="font-serif text-2xl text-[#E8DCC4] mb-4">
              Something went wrong
            </h1>
            <p className="text-[#F5F0E6] opacity-70 mb-8">
              A critical error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => reset()}
              className="px-6 py-3 rounded-full bg-[#E8DCC4] text-[#050a14] font-medium hover:bg-[#F5F0E6] transition-colors"
            >
              Try again
            </button>
            {error.digest && (
              <p className="mt-6 text-xs text-[#F5F0E6] opacity-30">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
