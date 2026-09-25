import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function EntrepreneursHero() {
  return (
    <section 
      className="relative w-full min-h-[100svh] flex items-center justify-start overflow-hidden"
      style={{ background: "linear-gradient(180deg, #00976F 24.52%, #003124 100%)" }}
    >
      {/* Background Image anchored to the right with a soft fade */}
      <div 
        className="absolute inset-0 bg-[length:auto_130%] bg-[position:right_center] bg-no-repeat opacity-60 md:opacity-100"
        style={{ 
          backgroundImage: 'url("/asset/who-we-serve-hero-section-background-pattern.png")',
          maskImage: 'linear-gradient(to right, transparent, black 40%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)'
        }}
      />
      
      {/* Content Aligned to Left */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-left text-white max-w-6xl flex flex-col justify-center h-full">
        <div className="max-w-xl mt-20 md:mt-0">
          <FadeIn direction="up">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-tiger-orange)] text-white text-xs font-bold tracking-widest capitalize mb-8">
              Founders
            </div>
            
            <h1 className="mb-6 font-[var(--font-asul)] text-4xl lg:text-5xl leading-[1.15] font-bold text-white drop-shadow-sm">
              Capital and Support, <br className="hidden md:block" />
              Structured for How <br className="hidden md:block" />
              Your Business <br className="hidden md:block" />
              Grows.
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium mb-10">
              We don&apos;t just invest where you are leading. YEIB is an institutional bridge connecting you to - equity, credit guarantees, and ecosystem support - across stages. Because true potential needs patient momentum to reach your goals.
            </p>

            <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
              <Link href="/apply" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-[var(--color-tiger-orange)] text-white hover:bg-[var(--color-tiger-orange)]/90 hover:opacity-100 border border-[var(--color-tiger-orange)]">
                  Apply for funding
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10">
                  Read our approach
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
