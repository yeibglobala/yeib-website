import type { Metadata } from "next";
import { ImpactHero } from "@/features/impact/components/ImpactHero";
import { ImpactTargets } from "@/features/impact/components/ImpactTargets";
import { ImpactFramework } from "@/features/impact/components/ImpactFramework";
import { FourTraits } from "@/features/impact/components/FourTraits";
import { ImpactCommitment } from "@/features/impact/components/ImpactCommitment";
import { ClosingCTA } from "@/features/home/components/ClosingCTA";

export const metadata: Metadata = {
  title: "Impact & Measurement | N-YEIB",
  description: "Tracking over 1.6M jobs, 38,400 supported MSMEs, and 50% gender-parity targets across Nigeria.",
};

export default function ImpactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ImpactHero />
      <ImpactTargets />
      <ImpactFramework />
      <FourTraits />
      <ImpactCommitment />
      <ClosingCTA />
    </div>
  );
}
