import { FadeIn } from "@/components/ui/FadeIn";
import Image from "next/image";

export function EntrepreneursPartners() {
  const partners = [
    { src: "/partner-logo/nsia-logo.png", alt: "NSIA", width: 90 },
    { src: "/partner-logo/dbn-logo.png", alt: "DBN", width: 90 },
    { src: "/partner-logo/coat-of-arm-logo.png", alt: "Coat of Arms", width: 50 },
    { src: "/partner-logo/afdb-logo.png", alt: "AfDB", width: 90 },
    { src: "/partner-logo/sec-logo.png", alt: "SEC", width: 50 },
    { src: "/partner-logo/mofi-logo.png", alt: "MOFI", width: 110 },
  ];

  return (
    <section className="bg-white border-t border-[var(--color-evergreen)]/20 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl py-16 md:py-24">
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/4 text-center md:text-left">
              <h3 className="font-bold tracking-widest text-xs capitalize text-[var(--color-evergreen)]/50">
                Strategic Partners
              </h3>
            </div>
            
            <div className="md:w-3/4">
              <div className="flex flex-wrap justify-center md:justify-end items-center gap-8 md:gap-16">
                {partners.map((partner, index) => (
                  <div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                    <Image 
                      src={partner.src} 
                      alt={partner.alt} 
                      width={partner.width} 
                      height={40} 
                      style={{ width: "auto" }}
                      className="h-8 md:h-10 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
