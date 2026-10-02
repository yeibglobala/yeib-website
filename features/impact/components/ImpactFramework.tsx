import { FadeIn } from "@/components/ui/FadeIn";
import { Tag } from "@/components/ui/Tag";

export function ImpactFramework() {
  const framework = [
    {
      title: "Impact",
      question: "Are we moving the needle on youth entrepreneurship?",
      desc: "Measuring the real-world effect on jobs, revenues, and productivity, while tracking spill-over benefits and ecosystem reinvestment."
    },
    {
      title: "Additionality",
      question: "Are we genuinely unlocking new money & markets?",
      desc: "Ensuring our capital crowds in new investors and shifts risk appetites rather than displacing existing private capital."
    },
    {
      title: "Risk",
      question: "Are we balancing upside with capital preservation?",
      desc: "Maintaining the right balance between long-term patient capital needs and short-term liquidity while mitigating ESG and macro shocks."
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn direction="up" className="text-center mb-16">
          <Tag variant="soft" className="mb-6 capitalize tracking-widest text-xs border-[var(--color-evergreen)] text-[var(--color-evergreen)]">
            Impact Evaluation
          </Tag>
          <h2 className="font-asul text-3xl md:text-5xl font-bold text-[var(--color-evergreen)]">
            The 3A Framework
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {framework.map((item, i) => (
            <FadeIn key={i} delay={i * 100} direction="up" className="bg-[var(--color-pale-oak)]/10 p-8 rounded-2xl border border-[var(--color-evergreen)]/5">
              <h3 className="text-2xl font-bold text-[var(--color-tiger-orange)] mb-4">{item.title}</h3>
              <p className="font-bold text-[var(--color-evergreen)] mb-4 leading-snug">{item.question}</p>
              <p className="text-[var(--color-evergreen)]/70">{item.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
