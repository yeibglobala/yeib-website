"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function BusinessStageMatrix() {
  const stages = [
    {
      num: "01",
      stage: "Idea & Seed Stage",
      instrument: "Ecosystem Development",
      pathways: "Grants, Bootcamps, Advisory Services"
    },
    {
      num: "02",
      stage: "Early & Growth",
      instrument: "Credit Guarantee",
      pathways: "Commercial & Microfinance Loans"
    },
    {
      num: "03",
      stage: "Scaling & Market Entry",
      instrument: "Direct Equity",
      pathways: "Growth Capital, Private Equity Partners"
    }
  ];

  return (
    <section className="bg-white text-[var(--color-evergreen)] overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl pt-24 pb-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          <div className="overflow-hidden pb-2">
            <motion.h2 
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-[var(--font-asul)] text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            >
              Three Stages. A Clear Pathway. <br /> 
              All the Way, or Just as Far as You Want.
            </motion.h2>
          </div>
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="text-lg text-[var(--color-evergreen)]/70 max-w-2xl font-medium"
          >
            No two businesses scale the same way. We align our capital instruments to fit the exact maturity and financial needs of your enterprise.
          </motion.p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl pb-24 md:pb-32">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 border-t border-[var(--color-evergreen)]/20"
        >
          {stages.map((row, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className={`pt-12 pb-16 flex flex-col h-full ${i !== stages.length - 1 ? 'md:border-r border-[var(--color-evergreen)]/20 md:pr-12 lg:pr-16 md:mr-12 lg:mr-16' : ''}`}
            >
              <div className="text-[var(--color-tiger-orange)] font-bold text-lg mb-8">
                {row.num}. {row.stage}
              </div>
              
              <div className="mb-12 flex-grow">
                <div className="text-sm font-bold tracking-widest capitalize text-[var(--color-evergreen)]/50 mb-2">Instrument</div>
                <div className="text-2xl font-bold mb-8">{row.instrument}</div>
                
                <div className="text-sm font-bold tracking-widest capitalize text-[var(--color-evergreen)]/50 mb-2">Access Pathways</div>
                <div className="text-lg text-[var(--color-evergreen)]/80 leading-relaxed">{row.pathways}</div>
              </div>

              <div className="mt-auto">
                <Button variant="secondary" className="w-full justify-between bg-transparent border border-[var(--color-evergreen)]/30 hover:border-[var(--color-evergreen)] hover:bg-transparent text-[var(--color-evergreen)] rounded-none py-6 transition-all duration-300 group">
                  Apply Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
