import { Footer } from "@/components/Footer";
import { TopNav } from "@/components/TopNav";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--polaris-navy-darkest)]">
      <TopNav />

      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mb-6">
            <span className="font-serif text-8xl text-[var(--polaris-star)] opacity-20">
              404
            </span>
          </div>
          <h1 className="font-serif text-2xl text-[var(--polaris-star)] mb-4">
            Page not found
          </h1>
          <p className="text-[var(--polaris-cream-muted)] mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            Return home
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
