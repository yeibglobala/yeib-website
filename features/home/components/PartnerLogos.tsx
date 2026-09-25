import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";

export function PartnerLogos() {
  const partners = [
    { src: "/partner-logo/nsia-logo.png", alt: "NSIA", width: 90 },
    { src: "/partner-logo/dbn-logo.png", alt: "DBN", width: 90 },
    { src: "/partner-logo/coat-of-arm-logo.png", alt: "Coat of Arms", width: 50 },
    { src: "/partner-logo/afdb-logo.png", alt: "AfDB", width: 90 },
    { src: "/partner-logo/sec-logo.png", alt: "SEC", width: 50 },
    { src: "/partner-logo/mofi-logo.png", alt: "MOFI", width: 110 },
  ];

  return (
    <section className="w-full bg-[var(--color-mint-cream)] py-12 border-b border-[var(--color-pale-oak)]/20">
      <div className="container mx-auto px-4 overflow-hidden">
        <FadeIn direction="up">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center">
                <Image 
                  src={partner.src} 
                  alt={partner.alt} 
                  width={partner.width} 
                  height={40} 
                  style={{ width: "auto" }}
                  className="h-8 md:h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
