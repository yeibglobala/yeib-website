import type { Metadata } from "next";
import { RotatingHero } from "@/features/home/components/RotatingHero";
import { PartnerLogos } from "@/features/home/components/PartnerLogos";
import { FounderCarousel } from "@/features/home/components/FounderCarousel";
import { StatsSection } from "@/features/home/components/StatsSection";
import { EligibilitySection } from "@/features/home/components/EligibilitySection";
import { ClosingCTA } from "@/features/home/components/ClosingCTA";

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
      <StatsSection />
      <ClosingCTA />
    </div>
  );
}
