import { FadeIn } from "@/components/ui/FadeIn";
import { Tag } from "@/components/ui/Tag";

export function SweetSpot() {
  const points = [
    {
      title: "Blended Capital",
      desc: "Combines equity, quasi-equity, guarantees & grants for a holistic funding approach."
    },
    {
      title: "Youth-Focused",
      desc: "Across all sectors & stages, with emphasis on under-served youth segments."
    },
    {
      title: "Ecosystem Development",
      desc: "Grants and TA to ESOs, policy convening, and a robust data platform."
    },
    {
      title: "Permanent Vehicle",
      desc: "A 20-year lifecycle designed for long-term sustainability."
    }
  ];

  return (
    <section className="py-24 bg-[var(--color-mint-cream)] relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn direction="up" className="text-center mb-16">
          <Tag variant="soft" className="mb-6 capitalize tracking-widest text-xs border-[var(--color-evergreen)] text-[var(--color-evergreen)]">
            Our Sweet Spot
          </Tag>
          <h2 className="font-asul text-3xl md:text-5xl font-bold text-[var(--color-evergreen)]">
            What makes YEIB different?
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((pt, i) => (
            <FadeIn key={i} delay={i * 100} direction="up" className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--color-evergreen)]/10">
              <h3 className="text-xl font-bold text-[var(--color-evergreen)] mb-3">{pt.title}</h3>
              <p className="text-[var(--color-evergreen)]/70">{pt.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
