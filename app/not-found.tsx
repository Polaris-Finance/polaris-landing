import { Footer } from "@/components/Footer";
import { NotFoundContent } from "@/components/NotFoundContent";
import { TopNav } from "@/components/TopNav";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--polaris-navy-darkest)]">
      <TopNav />

      <NotFoundContent
        title="This star has drifted out of view"
        message="The page you're looking for doesn't exist or has moved to a new orbit."
        actions={
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            Return home
          </Link>
        }
      />

      <Footer />
    </main>
  );
}
