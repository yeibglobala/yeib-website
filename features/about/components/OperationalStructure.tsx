import { FadeIn } from "@/components/ui/FadeIn";
import { Tag } from "@/components/ui/Tag";

export function OperationalStructure() {
  const pillars = [
    {
      title: "Professionally Managed",
      desc: "A dedicated investment management team runs the Fund day to day, with independent oversight and clear accountability at every level.",
    },
    {
      title: "Ring-Fenced Capital",
      desc: "Investment, risk-sharing and grant capital are held separately, each with its own mandate, controls and decision-making process.",
    },
    {
      title: "Delivered Through Partners",
      desc: "Capital reaches entrepreneurs mainly through trusted intermediaries such as funds, lenders and support organisations that know their markets.",
    },
  ];

  return (
    <section className="py-24 bg-[var(--color-evergreen)] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <FadeIn direction="up" className="text-center mb-16">
          <Tag variant="soft" className="mb-6 capitalize tracking-widest text-xs">
            Operational Structure
          </Tag>
          <h2 className="font-asul text-3xl md:text-5xl font-bold mb-6">
            How the YEIB Investment Fund Operates
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            The YEIB Investment Fund brings investment, risk-sharing and ecosystem support together under one institutional structure, built for transparency, sound governance and long-term impact.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <FadeIn
              key={pillar.title}
              delay={(i + 1) * 100}
              direction="up"
              className="bg-white/5 border border-white/10 p-8 rounded-2xl"
            >
              <div className="text-[var(--color-tiger-orange)] font-bold text-lg mb-6">
                0{i + 1}.
              </div>
              <h3 className="text-xl font-bold text-[var(--color-mint-leaf)] mb-3">{pillar.title}</h3>
              <p className="text-white/70 leading-relaxed">{pillar.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
