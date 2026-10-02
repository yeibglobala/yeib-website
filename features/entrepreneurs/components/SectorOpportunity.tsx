import { FadeIn } from "@/components/ui/FadeIn";
import { Tag } from "@/components/ui/Tag";

export function SectorOpportunity() {
  const sectors = [
    { name: "Agriculture", msme: "37.5%", jobs: "98.14%" },
    { name: "Trade", msme: "33.3%", jobs: "65.62%" },
    { name: "Creative Industries", msme: "0.7%", jobs: "56.88%" },
    { name: "ICT", msme: "0.6%", jobs: "37.06%" }
  ];

  return (
    <section className="py-24 bg-[var(--color-evergreen)] text-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn direction="up" className="mb-16">
          <Tag variant="soft" className="mb-6 capitalize tracking-widest text-xs border-[var(--color-evergreen)]/20 text-[var(--color-evergreen)]">
            Where We Play
          </Tag>
          <h2 className="font-asul text-3xl md:text-5xl font-bold mb-6">
            Sector Opportunity
          </h2>
          <p className="text-lg text-white/80 max-w-3xl">
            While the Fund is sector agnostic, we expect significant movement in Agriculture, Trade, Creative Industries, and ICT - where MSMEs are well-represented and have high potential for job creation.
          </p>
        </FadeIn>

        <FadeIn delay={200} direction="up" className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-4 px-4 font-bold capitalize tracking-widest text-xs text-white/50">Priority Sector</th>
                <th className="py-4 px-4 font-bold capitalize tracking-widest text-xs text-white/50">MSMEs (% of total)</th>
                <th className="py-4 px-4 font-bold capitalize tracking-widest text-xs text-white/50">MSME Employment (% of MSME jobs)</th>
              </tr>
            </thead>
            <tbody>
              {sectors.map((s, i) => (
                <tr key={i} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-6 px-4 font-bold text-lg">{s.name}</td>
                  <td className="py-6 px-4 text-white/80">{s.msme}</td>
                  <td className="py-6 px-4 text-[var(--color-tiger-orange)] font-bold">{s.jobs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeIn>
      </div>
    </section>
  );
}
