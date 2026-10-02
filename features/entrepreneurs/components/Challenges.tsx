import { FadeIn } from "@/components/ui/FadeIn";
import { Tag } from "@/components/ui/Tag";

export function Challenges() {
  const financeChallenges = [
    "Availability of alternatives", "High cost", "High risk", 
    "Restrictive loan terms and ticket sizes", "Lack of collateral", 
    "Lack of data and infrastructure", "Limited access to funding"
  ];

  const ecosystemChallenges = [
    "Unfavorable policies", "Siloed nature of ecosystem", 
    "Shallow nature of support provided to MSMEs", "Limited access to training and skilled labor"
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn direction="up" className="mb-16">
          <Tag variant="soft" className="mb-6 capitalize tracking-widest text-xs border-[var(--color-evergreen)] text-[var(--color-evergreen)]">
            The Reality
          </Tag>
          <h2 className="font-asul text-3xl md:text-5xl font-bold text-[var(--color-evergreen)] mb-6">
            Challenges Addressed
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeIn delay={100} direction="up">
            <h3 className="text-xl font-bold capitalize text-[var(--color-tiger-orange)] tracking-widest mb-6">Access to Finance</h3>
            <ul className="space-y-4">
              {financeChallenges.map((c, i) => (
                <li key={i} className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-evergreen)]/30 mt-2 mr-4 flex-shrink-0"></span>
                  <span className="text-lg text-[var(--color-evergreen)]/80 font-medium">{c}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
          
          <FadeIn delay={200} direction="up">
            <h3 className="text-xl font-bold capitalize text-[var(--color-tiger-orange)] tracking-widest mb-6">Ecosystem</h3>
            <ul className="space-y-4">
              {ecosystemChallenges.map((c, i) => (
                <li key={i} className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-evergreen)]/30 mt-2 mr-4 flex-shrink-0"></span>
                  <span className="text-lg text-[var(--color-evergreen)]/80 font-medium">{c}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
