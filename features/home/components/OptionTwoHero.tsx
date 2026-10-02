import { Button } from "@/components/ui/Button";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function OptionTwoHero({ isActive = true }: { isActive?: boolean }) {
  return (
    <section 
      className="relative w-full h-[100svh] md:h-[100vh] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #00976F 24.52%, #003124 100%)" }}
    >
      
      {/* Bridge Background Image */}
      <div 
        className="absolute inset-0 bg-[position:center_bottom] bg-no-repeat bg-[length:100%_auto] md:bg-[length:75%_auto] bg-[url('/asset/hero-section-background-bridge-pattern.png')]"
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center text-white max-w-[940px] flex flex-col items-center justify-center">
        <div 
          className={cn(
            "transition-all duration-1000 ease-out",
            isActive ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-12"
          )}
        >
          <h1 className="mb-8 md:mb-12 font-asul text-3xl sm:text-4xl md:text-5xl lg:text-[72px] leading-[1.2] md:leading-[1.1] font-bold text-white drop-shadow-sm">
            The institutional bridge between capital and ambition
          </h1>
        </div>
        
        <div 
          className={cn(
            "flex flex-col sm:flex-row justify-center items-center gap-4 transition-all duration-1000 ease-out",
            isActive ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-12"
          )}
        >
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
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-evergreen)]/50 to-transparent pointer-events-none" />
    </section>
  );
}
