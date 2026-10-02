import { FadeIn } from "@/components/ui/FadeIn";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function TransparencyFramework() {
  const partners = [
    { src: "/partner-logo/nsia-logo.png", alt: "NSIA", width: 90 },
    { src: "/partner-logo/dbn-logo.png", alt: "DBN", width: 90 },
    { src: "/partner-logo/coat-of-arm-logo.png", alt: "Coat of Arms", width: 50 },
    { src: "/partner-logo/afdb-logo.png", alt: "AfDB", width: 90 },
    { src: "/partner-logo/sec-logo.png", alt: "SEC", width: 50 },
    { src: "/partner-logo/mofi-logo.png", alt: "MOFI", width: 110 },
  ];

  const usefulLinks = [
    {
      title: "For Entrepreneurs",
      desc: "Everything you need to know about scaling your venture with us. Check our criteria and submit your pitch.",
      href: "/entrepreneurs"
    },
    {
      title: "Impact Targets",
      desc: "Our commitment to creating 5 million jobs and driving sustainable socio-economic growth.",
      href: "/impact"
    },
    {
      title: "ESG Framework",
      desc: "How we ensure compliance, transparency, and accountability across all our investments.",
      href: "/esg"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[var(--color-mint-cream)] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Partners Section */}
        <div className="text-center mb-32 border-b border-[var(--color-evergreen)]/10 pb-24">
          <FadeIn direction="up">
            <span className="text-[var(--color-evergreen)]/50 font-bold tracking-widest text-sm capitalize mb-8 block font-mono">
              Working With the Best
            </span>
            <h2 className="font-asul text-3xl md:text-5xl font-bold text-[var(--color-evergreen)] mb-6">
              An institutional framework built on transparency.
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-evergreen)]/80 leading-relaxed mx-auto max-w-2xl mb-16">
              Public trust is our mandate. We operate alongside esteemed government and international partners, ensuring accountability in all our operations.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {partners.map((partner, index) => (
                <div key={index} className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <Image 
                    src={partner.src} 
                    alt={partner.alt} 
                    width={partner.width} 
                    height={40} 
                    style={{ width: "auto" }}
                    className="h-8 md:h-12 w-auto object-contain mix-blend-multiply filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Useful Information Section */}
        <div>
          <FadeIn direction="up" className="mb-12">
            <span className="text-[var(--color-evergreen)]/50 font-bold tracking-widest text-sm capitalize block font-mono">
              Useful Information
            </span>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {usefulLinks.map((link, i) => (
              <FadeIn key={i} delay={i * 100} direction="up">
                <Link href={link.href} className="group block h-full">
                  <div className="bg-white rounded-xl p-10 h-full border border-[var(--color-evergreen)]/10 hover:border-[var(--color-tiger-orange)]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group-hover:-translate-y-1">
                    <div>
                      <div className="flex justify-end mb-8">
                        <ArrowUpRight className="w-8 h-8 text-[var(--color-evergreen)]/30 group-hover:text-[var(--color-tiger-orange)] transition-colors duration-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--color-evergreen)] mb-4">
                        {link.title}
                      </h3>
                      <p className="text-[var(--color-evergreen)]/70 leading-relaxed">
                        {link.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
