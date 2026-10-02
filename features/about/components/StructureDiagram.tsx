import { FadeIn } from "@/components/ui/FadeIn";
import { Tag } from "@/components/ui/Tag";
import { ArrowDown } from "lucide-react";

export function StructureDiagram() {
  return (
    <section className="py-24 bg-[var(--color-evergreen)] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <FadeIn direction="up" className="text-center mb-16">
          <Tag variant="soft" className="mb-6 capitalize tracking-widest text-xs">
            Operational Structure
          </Tag>
          <h2 className="font-asul text-3xl md:text-5xl font-bold mb-6">
            YEIB Nigeria Investment Management Company Ltd. (ManCo)
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            A seamless flow of capital and governance connecting investors, management, and independent financing entities.
          </p>
        </FadeIn>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Top Level: Investors */}
          <FadeIn delay={100} direction="up" className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-[var(--color-tiger-orange)] mb-2">ManCo Investors</h3>
            <p className="text-sm text-white/70">NSIA, DBN, and Other Donors</p>
          </FadeIn>

          <div className="flex justify-center">
            <ArrowDown className="text-white/30" />
          </div>

          {/* Middle Level: ManCo */}
          <FadeIn delay={200} direction="up" className="bg-white/10 border border-white/20 p-8 rounded-2xl relative">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">YEIB ManCo</h3>
              <p className="text-sm text-white/70">Management Team overseen by the Board of Directors & Advisory Board</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/20 p-4 rounded-xl text-center">
                <span className="text-xs font-bold capitalize tracking-wider text-white/50 block mb-1">Equity Mandate</span>
                <span className="font-bold text-[var(--color-mint-leaf)]">Investment Committee</span>
              </div>
              <div className="bg-black/20 p-4 rounded-xl text-center">
                <span className="text-xs font-bold capitalize tracking-wider text-white/50 block mb-1">Grant Mandate</span>
                <span className="font-bold text-[var(--color-mint-leaf)]">Grant Committee</span>
              </div>
            </div>
          </FadeIn>

          <div className="flex justify-center">
            <ArrowDown className="text-white/30" />
          </div>

          {/* Bottom Level: Entities */}
          <FadeIn delay={300} direction="up" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h4 className="font-bold text-[var(--color-tiger-orange)] mb-3">Equity Investment Fund</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Independent special-purpose entity for PE & VC funds and direct investments.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h4 className="font-bold text-[#2E86AB] mb-3">Credit Guarantee Fund</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Managed via DBN&apos;s Impact Credit Guarantee Limited (ICGL) ring-fenced youth window.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h4 className="font-bold text-[var(--color-mint-leaf)] mb-3">Ecosystem Development Fund</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Independent special-purpose entity deploying grants to MSMEs and ESOs.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
