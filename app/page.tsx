import type { Metadata } from "next";
import { RotatingHero } from "@/features/home/components/RotatingHero";
import { PartnerLogos } from "@/features/home/components/PartnerLogos";
import { FounderCarousel } from "@/features/home/components/FounderCarousel";
import { StatsSection } from "@/features/home/components/StatsSection";
import { EligibilitySection } from "@/features/home/components/EligibilitySection";
import { ClosingCTA } from "@/features/home/components/ClosingCTA";
import Image from "next/image";

export const metadata: Metadata = {
  title: "N-YEIB | Nigeria Youth Entrepreneurship Investment Bank",
  description: "The institutional bridge between capital and ambition, empowering youth-led and women-led MSMEs across Nigeria.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <RotatingHero />
      <PartnerLogos />
      <FounderCarousel />
      <EligibilitySection />
      
      <section className="w-full relative overflow-hidden bg-[var(--color-mint-cream)]">
        <Image 
          src="/asset/section-image.png" 
          alt="YEIB Office and Environment" 
          width={1535}
          height={1024}
          sizes="100vw"
          unoptimized={true}
          priority
          className="w-full h-auto block"
        />
      </section>

      <StatsSection />
      <ClosingCTA />
    </div>
  );
}
