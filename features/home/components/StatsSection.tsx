import { CardStatBlock } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { BriefcaseIcon, TrendingUpIcon, UsersIcon, TargetIcon } from "lucide-react";

export function StatsSection() {
  return (
    <section className="py-16 md:py-32 bg-[var(--color-pale-oak)]/10 relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: 'url("/asset/goals-section-background-pattern.png?v=2")' }}
      />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <FadeIn direction="up" className="mb-12">
          <p className="text-[var(--color-tiger-orange)] font-bold text-sm tracking-wider capitalize mb-4">
            Goals
          </p>
          <h2 className="font-asul text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-evergreen)]">
            20-year Targets
          </h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn delay={200} direction="up" className="h-full">
            <CardStatBlock 
              value="~1.6M" 
              label="Direct and Indirect Jobs" 
              source="20-year target" 
            >
              <div className="mt-4 text-sm text-[var(--color-evergreen)]/70">
                Successfully created and sustained through strategic SME investments.
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--color-mint-cream)] rounded-full flex items-center justify-center opacity-50 pointer-events-none">
                <BriefcaseIcon size={48} className="text-[var(--color-evergreen)]/20" />
              </div>
            </CardStatBlock>
          </FadeIn>

          <FadeIn delay={300} direction="up" className="h-full">
            <CardStatBlock 
              value="118" 
              label="ESOs Mobilised" 
              source="20-year target" 
            >
              <div className="mt-4 text-sm text-[var(--color-evergreen)]/70">
                Entrepreneur Support Organisations activated to provide local support.
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--color-mint-cream)] rounded-full flex items-center justify-center opacity-50 pointer-events-none">
                <UsersIcon size={48} className="text-[var(--color-evergreen)]/20" />
              </div>
            </CardStatBlock>
          </FadeIn>

          <FadeIn delay={400} direction="up" className="h-full">
            <CardStatBlock 
              value="Year 5" 
              label="Gender Parity Target" 
              source="20-year target" 
            >
              <div className="mt-4 text-sm text-[var(--color-evergreen)]/70">
                On track to reach equal male-to-female founder representation.
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--color-mint-cream)] rounded-full flex items-center justify-center opacity-50 pointer-events-none">
                <TargetIcon size={48} className="text-[var(--color-evergreen)]/20" />
              </div>
            </CardStatBlock>
          </FadeIn>

          <FadeIn delay={500} direction="up" className="h-full">
            <CardStatBlock 
              value="~38,400" 
              label="Businesses Supported" 
              source="20-year target" 
            >
              <div className="mt-4 text-sm text-[var(--color-evergreen)]/70">
                Micro, small, and medium enterprises empowered with necessary resources.
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--color-mint-cream)] rounded-full flex items-center justify-center opacity-50 pointer-events-none">
                <TrendingUpIcon size={48} className="text-[var(--color-evergreen)]/20" />
              </div>
            </CardStatBlock>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
