import type { Metadata } from "next";
import { EntrepreneursHero } from "@/features/entrepreneurs/components/EntrepreneursHero";
import { GrowthCapital } from "@/features/entrepreneurs/components/GrowthCapital";
import { RiskBanksWont } from "@/features/entrepreneurs/components/RiskBanksWont";
import { CapitalAlone } from "@/features/entrepreneurs/components/CapitalAlone";
import { EntrepreneursPartners } from "@/features/entrepreneurs/components/EntrepreneursPartners";
import { Challenges } from "@/features/entrepreneurs/components/Challenges";
import { SectorOpportunity } from "@/features/entrepreneurs/components/SectorOpportunity";
import { ClosingCTA } from "@/features/home/components/ClosingCTA";

export const metadata: Metadata = {
  title: "Who We Serve | YEIB Investment Fund",
  description: "Flexible growth capital, credit guarantees, and technical assistance tailored to Nigerian youth-led and women-led MSMEs.",
};

export default function EntrepreneursPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <EntrepreneursHero />
      <GrowthCapital />
      <RiskBanksWont />
      <CapitalAlone />
      <Challenges />
      <SectorOpportunity />
      <EntrepreneursPartners />
      <ClosingCTA />
    </div>
  );
}
