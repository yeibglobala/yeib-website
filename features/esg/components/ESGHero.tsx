import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export function ESGHero() {
  return (
    <section 
      className="relative w-full min-h-[100svh] flex flex-col md:flex-row items-stretch"
      style={{ background: "linear-gradient(180deg, #00976F 24.52%, #003124 100%)" }}
    >
      {/* Left side content */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 relative z-10">
        <div className="max-w-xl w-full mt-20 md:mt-0">
          <FadeIn direction="up">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-tiger-orange)] text-white text-xs font-bold tracking-widest capitalize mb-8">
              ESG & Sustainability
            </div>
            
            <h1 className="font-asul text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.1] font-bold text-white mb-8">
              Responsible Investment for Sustainable Impact.
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10">
              We integrate environmental, social, and governance (ESG) considerations across all our investment activities, ensuring transparency, stakeholder engagement, and accountability at every level.
            </p>

            <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
              <Link href="/apply" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-[var(--color-tiger-orange)] text-white hover:bg-[var(--color-tiger-orange)]/90 hover:opacity-100 border border-[var(--color-tiger-orange)]">
                  Apply for funding
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10">
                  Learn more
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Right side image */}
      <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-full">
        {/* Placeholder for ESG hero image */}
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        <Image 
          src="/asset/esg-hero-section-image.png" 
          alt="ESG and Sustainability" 
          fill
          className="object-cover object-center relative z-10"
        />
      </div>
    </section>
  );
}
