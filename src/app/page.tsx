import { Suspense } from "react";
import { PortfolioShell } from "@/components/portfolio-shell";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
          <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 text-sm text-[var(--muted)]">
            Loading portfolio...
          </div>
        </div>
      }
    >
      <PortfolioShell />
    </Suspense>
  );
}
