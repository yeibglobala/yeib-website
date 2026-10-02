import { FadeIn } from "@/components/ui/FadeIn";
import { Tag } from "@/components/ui/Tag";

export function Roadmap() {
  const steps = [
    { title: "Incorporation of ManCo", status: "90% Complete" },
    { title: "Engagement with MoFI", status: "In Progress" },
    { title: "SEC Licensing", status: "Upcoming" },
    { title: "Recruitment of Key Management", status: "By Q3 2026" },
    { title: "Official Launch & Deployment", status: "Q3 - Q4 2026" },
  ];

  return (
    <section className="py-24 bg-[var(--color-evergreen)] text-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn direction="up" className="text-center mb-16">
          <Tag variant="soft" className="mb-6 capitalize tracking-widest text-xs">
            The Timeline
          </Tag>
          <h2 className="font-asul text-3xl md:text-5xl font-bold mb-6">
            Operational Roadmap
          </h2>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 100} direction="up" className="flex items-center gap-6 mb-8 last:mb-0 relative">
              {i !== steps.length - 1 && (
                <div className="absolute left-6 top-12 bottom-[-2rem] w-px bg-white/20"></div>
              )}
              <div className="w-12 h-12 rounded-full bg-[var(--color-tiger-orange)] text-white font-bold flex items-center justify-center shrink-0 z-10 border-4 border-[var(--color-evergreen)]">
                {i + 1}
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex-grow">
                <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                <p className="text-[var(--color-tiger-orange)] font-bold text-sm tracking-wider capitalize">{step.status}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
