import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function ClosingCTA() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-[var(--color-mint-cream)] rounded-3xl p-10 md:p-16 text-center shadow-sm border border-[var(--color-pale-oak)]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-mint-leaf)]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-tiger-orange)]/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>
          
          <h2 className="font-asul text-4xl md:text-5xl font-bold text-[var(--color-evergreen)] mb-6 relative z-10">
            Join the movement.
          </h2>
          <p className="text-lg text-[var(--color-evergreen)]/80 max-w-2xl mx-auto mb-10 relative z-10">
            Whether you are an institution looking to allocate capital for impact, or a young entrepreneur ready to scale, there is a place for you in the YEIB ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/apply">
              <Button size="lg" className="w-full sm:w-auto bg-[var(--color-tiger-orange)] text-white hover:bg-[var(--color-tiger-orange)]/90 hover:opacity-100">
                Apply for Funding
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto border-[var(--color-evergreen)] text-[var(--color-evergreen)] hover:bg-[var(--color-evergreen)] hover:text-white">
                Partner with YEIB
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
