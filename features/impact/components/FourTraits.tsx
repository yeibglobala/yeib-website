import { FadeIn } from "@/components/ui/FadeIn";
import { Tag } from "@/components/ui/Tag";

export function FourTraits() {
  const traits = [
    {
      title: "Climate Resilient",
      desc: "Environmentally sound practices that attract engaged customers and staff, reduce exposure to weather disruptions, and minimize regulatory risks."
    },
    {
      title: "Gender Positive",
      desc: "Promoting equality to build diverse teams, boost morale, and drive better decision-making while earning customer trust."
    },
    {
      title: "Digitally Enabled",
      desc: "Leveraging digital tools to increase market access, enable quick adaptability, and drive strategic, data-backed decisions."
    },
    {
      title: "Poised for Trade",
      desc: "Ready to participate in inter- and intra-regional global value chains, capitalizing on population growth and expanding local markets."
    }
  ];

  return (
    <section className="py-24 bg-[var(--color-evergreen)] text-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn direction="up" className="mb-16">
          <Tag variant="soft" className="mb-6 capitalize tracking-widest text-xs">
            Future-Proof Businesses
          </Tag>
          <h2 className="font-asul text-3xl md:text-5xl font-bold mb-6">
            The 4 Key Traits
          </h2>
          <p className="text-lg text-white/80 max-w-2xl">
            In addition to providing financing, YEIB provides non-financial support that nurtures businesses displaying these distinct characteristics.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {traits.map((trait, i) => (
            <FadeIn key={i} delay={i * 100} direction="up" className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-[var(--color-tiger-orange)] transition-colors">
              <h3 className="text-xl font-bold text-[var(--color-tiger-orange)] mb-4">{trait.title}</h3>
              <p className="text-white/70 leading-relaxed">{trait.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
