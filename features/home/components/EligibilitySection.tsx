import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { FadeIn } from "@/components/ui/FadeIn";
import { CountUp } from "@/components/ui/CountUp";
import { UserIcon, UsersIcon, BuildingIcon, TargetIcon } from "lucide-react";

export function EligibilitySection() {
  const goals = [
    { value: "$300M", label: "Total capitalisation target", status: "" },
    { value: "$100M", label: "AfDB sovereign loan", status: "" },
    { value: "3", label: "Financing instruments", status: "" }
  ];
  
  const eligibilityCards = [
    { icon: <UserIcon size={20} />, title: "Youth-Led", desc: "Business owned, managed, or primarily employing youth" },
    { icon: <UsersIcon size={20} />, title: "Women-Led", desc: "Businesses with significant women ownership or management" },
    { icon: <BuildingIcon size={20} />, title: "Registered MSME", desc: "Formally registered Nigerian business with verifiable track record" },
    { icon: <TargetIcon size={20} />, title: "Future-Proof", desc: "Sector agnostic, prioritizing climate resilient, digitally enabled businesses poised for regional trade." }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[var(--color-pale-oak)]/20 relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: 'url("/asset/Eligibility-section-background-pattern.png?v=2")' }}
      />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <FadeIn direction="up" className="mb-12">
          <p className="text-[var(--color-tiger-orange)] font-bold text-sm tracking-wider capitalize mb-4">
            Eligibility
          </p>
          <h2 className="font-[var(--font-asul)] text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-evergreen)] mb-4">
            Built for <span className="text-[var(--color-tiger-orange)]">youth-owned</span> MSMEs
          </h2>
          <p className="text-lg text-[var(--color-evergreen)]/80 max-w-2xl mb-8">
            The YEIB Investment Fund is designed for sector-agnostic youth-led and women-led micro, small, and medium enterprises across Nigeria.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Tag variant="solid">Agriculture</Tag>
            <Tag variant="solid">Creative Industries</Tag>
            <Tag variant="solid">Trade</Tag>
            <Tag variant="solid">ICT</Tag>
            <Tag variant="soft">Women-led</Tag>
            <Tag variant="soft">Youth-led</Tag>
            <Tag variant="soft">Climate Resilient</Tag>
            <Tag variant="soft">Digitally Enabled</Tag>
            <Tag variant="soft">Poised for Trade</Tag>
          </div>
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column: Goals */}
          <FadeIn delay={200} direction="up" className="lg:w-1/3">
            <div className="bg-[var(--color-evergreen)] rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col justify-between h-full">
            <h3 className="font-bold text-xs tracking-[0.2em] capitalize text-white/70 mb-12 text-center">
              Our Goals
            </h3>
            <div className="space-y-8">
              {goals.map((goal, i) => (
                <div key={i} className="pb-8 border-b border-white/10 last:border-0 last:pb-0">
                  <div className="font-[var(--font-asul)] text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                    <CountUp text={goal.value} />
                  </div>
                  <div className="text-white/80 mb-4 text-sm font-medium">
                    {goal.label}
                  </div>
                  {goal.status && (
                    <div className="flex items-center text-xs font-bold tracking-wider text-[var(--color-mint-leaf)] capitalize">
                      <span className="w-2 h-2 rounded-full bg-[var(--color-mint-leaf)] mr-2"></span>
                      {goal.status}
                    </div>
                  )}
                </div>
              ))}
            </div>
            </div>
          </FadeIn>

          {/* Right Column: Eligibility Cards */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {eligibilityCards.map((card, i) => (
              <FadeIn key={i} delay={300 + (i * 150)} direction="up" className="h-full">
                <Card className="bg-white border-[var(--color-pale-oak)]/30 hover:border-[var(--color-mint-leaf)] transition-colors shadow-sm h-full">
                <CardHeader>
                  <div className="w-10 h-10 rounded bg-[var(--color-mint-cream)] text-[var(--color-evergreen)] flex items-center justify-center mb-4">
                    {card.icon}
                  </div>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-[var(--color-evergreen)]/70 leading-relaxed pt-0">
                  {card.desc}
                </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
