import type { Metadata } from "next";
import { InvestorsHero } from "@/features/investors/components/InvestorsHero";
import { TwoSidedModel } from "@/features/investors/components/TwoSidedModel";
import { FirstLossGuarantee } from "@/features/investors/components/FirstLossGuarantee";
import { InstitutionalPartners } from "@/features/investors/components/InstitutionalPartners";
import { ClosingCTA } from "@/features/home/components/ClosingCTA";

export const metadata: Metadata = {
  title: "Partners & Investors | YEIB Investment Fund",
  description: "Co-invest with AfDB, sovereign funds, and institutional partners deploying patient capital and catalytic first-loss guarantees.",
};

export default function InvestorsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <InvestorsHero />
      <TwoSidedModel />
      <FirstLossGuarantee />
      <InstitutionalPartners />
      <ClosingCTA />
    </div>
  );
}
