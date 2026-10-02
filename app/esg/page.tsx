import { ESGHero } from "@/features/esg/components/ESGHero";
import { OurApproach } from "@/features/esg/components/OurApproach";
import { ESGTargets } from "@/features/esg/components/ESGTargets";
import { FourTraits } from "@/features/impact/components/FourTraits";
import { DocumentLibrary } from "@/features/esg/components/DocumentLibrary";
import { ESGPartnerships } from "@/features/esg/components/ESGPartnerships";

export const metadata = {
  title: 'ESG & Sustainability | YEIB Investment Fund',
  description: 'Our approach to responsible investment, environmental and social risk management, transparency, and accountability.',
};

export default function ESGPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ESGHero />
      <OurApproach />
      <ESGTargets />
      <FourTraits />
      <DocumentLibrary />
      <ESGPartnerships />
    </div>
  );
}
