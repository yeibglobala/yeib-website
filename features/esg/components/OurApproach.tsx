import { FadeIn } from "@/components/ui/FadeIn";
import { Tag } from "@/components/ui/Tag";
import { Leaf, ShieldCheck, Users, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function OurApproach() {
  const pillars = [
    {
      title: "ESG Principles & Commitments",
      desc: "YEIB's overall commitment to responsible investment, environmental and social sustainability, good governance, and development impact.",
      icon: <Leaf className="w-8 h-8 text-[var(--color-tiger-orange)]" />
    },
    {
      title: "Governance & Accountability",
      desc: "Our governance structure for managing ESG matters, including oversight responsibilities and the roles of YEIB and participating financial institutions.",
      icon: <ShieldCheck className="w-8 h-8 text-[var(--color-tiger-orange)]" />
    },
    {
      title: "Stakeholder Engagement",
      desc: "Our approach to engaging beneficiaries, project-affected persons, communities, and other stakeholders throughout the investment lifecycle.",
      icon: <Users className="w-8 h-8 text-[var(--color-tiger-orange)]" />
    },
    {
      title: "Impact & Performance",
      desc: "An overview of key sustainability and development outcomes tracked by the Fund, including jobs created, youth beneficiaries, and environmental performance.",
      icon: <BarChart3 className="w-8 h-8 text-[var(--color-tiger-orange)]" />
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[url('/asset/logo-icon-section-background-pattern3.png')] bg-cover bg-center bg-white relative overflow-hidden bg-blend-overlay">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <FadeIn direction="up" className="mb-16">
          <Tag variant="soft" className="mb-6">Our Approach</Tag>
          <h2 className="font-asul text-3xl md:text-5xl font-bold text-[var(--color-evergreen)] max-w-2xl">
            Our Approach to Sustainability
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {pillars.map((pillar, i) => (
            <FadeIn key={i} delay={i * 150} direction="up" className="h-full">
              <Card className="bg-white border-transparent shadow-sm hover:shadow-md transition-shadow h-full flex flex-col p-2">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-[var(--color-tiger-orange)]/10 flex items-center justify-center mb-4">
                    {pillar.icon}
                  </div>
                  <CardTitle className="text-2xl text-[var(--color-evergreen)]">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-[var(--color-evergreen)]/80 leading-relaxed pt-0">
                  {pillar.desc}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
