import { FadeIn } from "@/components/ui/FadeIn";
import { Tag } from "@/components/ui/Tag";

export function ESGTargets() {
  const targets = [
    {
      title: "Gender Parity Target",
      value: "50%",
      timeframe: "By Year 5",
      desc: "On track to reach 50% representation across all funding distribution and ecosystem engagement by year 5. A gender-diverse workforce builds trust and loyalty among customers who increasingly value diversity and inclusion."
    },
    {
      title: "Climate Integration",
      value: "Resilient",
      timeframe: "Continuous",
      desc: "Environmentally sound practices that attract engaged customers and staff, reduce exposure to extreme weather disruptions, and minimize regulatory risks."
    },
    {
      title: "Digital & Regional Trade",
      value: "Enabled",
      timeframe: "Continuous",
      desc: "Leveraging digital tools to increase market access, and maintaining readiness to participate in inter- and intra-regional global value chains."
    }
  ];

  return (
    <section className="py-24 bg-[var(--color-mint-cream)] text-[var(--color-evergreen)] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn direction="up" className="text-center mb-16">
          <Tag variant="soft" className="mb-6 capitalize tracking-widest text-xs border-[var(--color-evergreen)] text-[var(--color-evergreen)]">
            Our Commitments
          </Tag>
          <h2 className="font-asul text-3xl md:text-5xl font-bold mb-6">
            Key ESG Targets
          </h2>
          <p className="text-lg text-[var(--color-evergreen)]/80 max-w-2xl mx-auto">
            Our framework is designed to integrate strong gender and climate metrics throughout our operational lifecycle.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {targets.map((target, i) => (
            <FadeIn key={i} delay={i * 100} direction="up" className="bg-white p-8 rounded-2xl border border-[var(--color-evergreen)]/10 shadow-sm h-full flex flex-col">
              <h3 className="text-xl font-bold mb-2 capitalize tracking-tight">{target.title}</h3>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                <span className="font-asul text-4xl xl:text-5xl font-bold text-[var(--color-tiger-orange)] leading-none">{target.value}</span>
                <span className="text-sm font-bold capitalize tracking-widest text-[var(--color-evergreen)]/50">{target.timeframe}</span>
              </div>
              <p className="text-[var(--color-evergreen)]/80 leading-relaxed font-medium">
                {target.desc}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
