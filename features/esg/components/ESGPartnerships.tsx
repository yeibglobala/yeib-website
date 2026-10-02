import { FadeIn } from "@/components/ui/FadeIn";
import Image from "next/image";

export function ESGPartnerships() {
  const partners = [
    { 
      src: "/partner-logo/nsia-logo.png", 
      alt: "NSIA", 
      name: "NSIA",
      desc: "Anchoring our Environmental and Social Management System (ESMS) to sovereign standards of accountability and long-term impact." 
    },
    { 
      src: "/partner-logo/dbn-logo.png", 
      alt: "DBN", 
      name: "DBN",
      desc: "Co-investing to de-risk green sectors and promote financial inclusion across the MSME landscape." 
    },
    { 
      src: "/partner-logo/coat-of-arm-logo.png", 
      alt: "Ministry of Finance", 
      name: "Ministry of Finance",
      desc: "Ensuring alignment with national economic development policies and fostering a supportive regulatory environment." 
    },
    { 
      src: "/partner-logo/afdb-logo.png", 
      alt: "AfDB", 
      name: "AfDB",
      desc: "Providing technical assistance to align our portfolio with continental development and climate resilience goals." 
    },
    { 
      src: "/partner-logo/sec-logo.png", 
      alt: "SEC", 
      name: "Securities and Exchange Commission",
      desc: "Providing regulatory oversight and compliance frameworks to anchor the Fund's operations." 
    },
    { 
      src: "/partner-logo/mofi-logo.png", 
      alt: "MOFI", 
      name: "MOFI",
      desc: "Managing federal government investments and ensuring alignment with national development goals." 
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[var(--color-evergreen)] text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn direction="up">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/30 text-white text-xs font-bold tracking-widest capitalize mb-6 bg-white/5">
            Partnerships
          </div>
          
          <h2 className="font-asul text-3xl md:text-5xl font-bold mb-6 max-w-2xl">
            Collaboration for scale and sustainability.
          </h2>
          
          <p className="text-lg text-white/80 leading-relaxed mb-16 max-w-3xl">
            Our ESG and development objectives are ambitious. We partner with specialized institutions to ensure our capital deployment is backed by world-class frameworks and technical expertise.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <FadeIn key={index} delay={index * 150} direction="up">
                <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors h-full">
                  <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-4 flex-shrink-0">
                    <Image 
                      src={partner.src} 
                      alt={partner.alt} 
                      width={80} 
                      height={80} 
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{partner.name}</h3>
                    <p className="text-white/70 leading-relaxed text-sm">
                      {partner.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
