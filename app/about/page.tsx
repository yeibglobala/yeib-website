import { AboutHero } from "@/features/about/components/AboutHero";
import { TheChallenge } from "@/features/about/components/TheChallenge";
import { OurApproach } from "@/features/about/components/OurApproach";
import { TransparencyFramework } from "@/features/about/components/TransparencyFramework";
import { Governance } from "@/features/about/components/Governance";
import { SweetSpot } from "@/features/about/components/SweetSpot";
import { EcosystemVehicles } from "@/features/about/components/EcosystemVehicles";
import { StructureDiagram } from "@/features/about/components/StructureDiagram";
import { ClosingCTA } from "@/features/home/components/ClosingCTA";

export const metadata = {
  title: 'About Us | YEIB Investment Fund',
  description: 'Learn about the YEIB Investment Fund and our mission to bridge the capital gap for young Nigerian founders.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AboutHero />
      <TheChallenge />
      <OurApproach />
      <SweetSpot />
      <Governance />
      <StructureDiagram />
      <EcosystemVehicles />
      <TransparencyFramework />
      <ClosingCTA />
    </div>
  );
}
