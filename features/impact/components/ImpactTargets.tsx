"use client";

import { CountUp } from "@/components/ui/CountUp";
import { motion } from "framer-motion";

export function ImpactTargets() {
  const targets = [
    {
      number: "~1.6M",
      label: "Direct and Indirect Jobs",
      desc: "To be unlocked and created through strategic capital deployment and ecosystem partnerships.",
    },
    {
      number: "118",
      label: "ESOs Mobilised",
      desc: "Enterprise Support Organizations directly funded and capacitated to incubate, accelerate, and support founders.",
    },
    {
      number: "Year 5",
      label: "Gender-Parity Target",
      desc: "On track to reach 50% representation across all funding distribution and ecosystem engagement by year 5.",
    },
    {
      number: "~38,400",
      label: "Businesses Supported",
      desc: "Youth and women-led enterprises empowered to overcome capital and ecosystem barriers to scale.",
    }
  ];

  return (
    <section className="bg-[var(--color-mint-cream)] text-[var(--color-evergreen)] overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl pt-24 pb-12 border-b border-[var(--color-evergreen)]/20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12"
        >
          <div className="w-full md:w-1/2">
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              className="inline-block px-4 py-1.5 rounded-full border border-[var(--color-tiger-orange)] text-[var(--color-tiger-orange)] text-xs font-bold tracking-widest capitalize mb-8 md:mb-12"
            >
              20-Year Targets
            </motion.div>
            
            <div className="overflow-hidden">
              <motion.h2 
                variants={{
                  hidden: { y: "100%", opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="font-asul text-4xl md:text-6xl font-bold tracking-tight capitalize"
              >
                The Numbers <br />
                That <span className="text-[var(--color-tiger-orange)]">Matter.</span>
              </motion.h2>
            </div>
          </div>
          
          <div className="w-full md:w-1/3">
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
              }}
              className="text-lg md:text-xl text-[var(--color-evergreen)]/80 font-medium leading-relaxed pb-2"
            >
              We measure success not just in capital deployed, but in systemic change generated across the entrepreneurial ecosystem.
            </motion.p>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {targets.map((target, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className={`p-8 md:p-16 border-b border-[var(--color-evergreen)]/20 ${index % 2 === 0 ? 'md:border-r' : ''}`}
            >
              <div className="font-asul text-[80px] sm:text-[100px] md:text-[120px] leading-[0.9] font-bold text-[var(--color-evergreen)] mb-12 tracking-tighter">
                {target.number !== "Year 5" ? (
                  <CountUp text={target.number} />
                ) : (
                  target.number
                )}
              </div>
              <h3 className="font-bold text-2xl md:text-3xl capitalize mb-4 tracking-tight">
                {target.label}
              </h3>
              <p className="text-xl text-[var(--color-evergreen)]/70 leading-relaxed font-medium max-w-sm">
                {target.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
