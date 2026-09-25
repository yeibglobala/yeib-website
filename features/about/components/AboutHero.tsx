import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function AboutHero() {
  return (
    <section 
      className="relative w-full min-h-[100svh] flex items-center justify-start overflow-hidden"
      style={{ background: "linear-gradient(180deg, #00976F 24.52%, #003124 100%)" }}
    >
      {/* Background Image anchored to the right with a soft fade */}
      <div 
        className="absolute inset-0 bg-[length:auto_130%] bg-[position:calc(100%+150px)_center] bg-no-repeat opacity-60 md:opacity-100"
        style={{ 
          backgroundImage: 'url("/asset/what-we-do-hero-section-background-pattern.png")',
          maskImage: 'linear-gradient(to right, transparent, black 40%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)'
        }}
      />
      
      {/* Content Aligned to Left */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-left text-white max-w-6xl flex flex-col justify-center h-full">
        <div className="max-w-xl mt-20 md:mt-0">
          <FadeIn direction="up">
            <h1 className="mb-6 font-[var(--font-asul)] text-4xl lg:text-5xl leading-[1.15] font-bold text-white drop-shadow-sm">
              We Exist to Dismantle <br />
              the Barriers Standing <br />
              Between Young Founders <br />
              and Their Potential.
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg font-medium mx-auto md:mx-0 mb-10">
              A government-enabled, private sector-led investment fund providing the financial and non-financial support Nigerian youth-owned MSMEs need to grow and scale.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
              <Link href="/apply" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-[var(--color-tiger-orange)] text-white hover:bg-[var(--color-tiger-orange)]/90 hover:opacity-100 border border-[var(--color-tiger-orange)]">
                  Apply for funding
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10">
                  Partner with YEIB
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
