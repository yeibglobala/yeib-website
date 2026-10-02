import { FadeIn } from "@/components/ui/FadeIn";
import { Tag } from "@/components/ui/Tag";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export function EcosystemVehicles() {
  const vehicles = [
    {
      title: "Next-Gen",
      subtitle: "Retail Lending Vehicle",
      desc: "Dedicated retail working-capital loans ($1k-10k) for very early-stage youth businesses with simplified KYC, digital disbursement, and flexible repayment cycles (60-90 days)."
    },
    {
      title: "I-DICE Fund",
      subtitle: "Digital & Creative Focus",
      desc: "$170 million closed-end VC vehicle taking minority equity stakes in growth-stage startups (Seed-Series C), providing hands-on TA and market connections."
    },
    {
      title: "DBN / ICGL",
      subtitle: "Wholesale Debt & Guarantees",
      desc: "Wholesale debt facility providing long-term loans. Impact Credit Guarantee Ltd. (ICGL) offers 70-80% first-loss guarantees on MSME loans to stimulate credit supply."
    },
    {
      title: "JICA / NSIA Fund",
      subtitle: "Startup Act Implementation",
      desc: "Collaboration to implement Nigeria's Startup Act, including policy reforms, capacity-building for incubators/accelerators, and laying the regulatory foundation."
    },
    {
      title: "AFAWA Initiative",
      subtitle: "Women Entrepreneurs Finance",
      desc: "AfDB-led initiative offering partial credit guarantees (up to 50%) for women-led MSME lending, alongside dedicated technical assistance and capacity-building."
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn direction="up" className="mb-16">
          <Tag variant="soft" className="mb-6 capitalize tracking-widest text-xs border-[var(--color-evergreen)] text-[var(--color-evergreen)]">
            Ecosystem
          </Tag>
          <h2 className="font-asul text-3xl md:text-5xl font-bold text-[var(--color-evergreen)] mb-6">
            Complementary Vehicles
          </h2>
          <p className="text-lg text-[var(--color-evergreen)]/80 max-w-3xl">
            We operate in active collaboration with complementary initiatives to comprehensively develop the entrepreneurial ecosystem.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v, i) => (
            <FadeIn key={i} delay={i * 100} direction="up" className="h-full">
              <Card className="h-full bg-[var(--color-mint-cream)]/30 border border-[var(--color-evergreen)]/10 hover:border-[var(--color-tiger-orange)] transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl text-[var(--color-evergreen)]">{v.title}</CardTitle>
                  <div className="text-sm font-bold text-[var(--color-tiger-orange)] mt-1">{v.subtitle}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--color-evergreen)]/80 leading-relaxed text-sm">
                    {v.desc}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
