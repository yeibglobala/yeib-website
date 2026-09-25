"use client";

import { motion } from "framer-motion";

export function RiskBanksWont() {
  const points = [
    {
      title: "Commercial Lending",
      desc: "We pledge our balance sheet so commercial lenders and MFIs can confidently extend credit to your business at sustainable rates."
    },
    {
      title: "Microfinance",
      desc: "Working with specialized lenders to ensure capital reaches micro-enterprises that form the backbone of the economy."
    },
    {
      title: "Reduced Collateral",
      desc: "Our guarantee acts as a substitute for traditional collateral, breaking the cycle of asset-heavy lending requirements."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-col items-center"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            className="inline-block px-4 py-1.5 rounded-full border border-[var(--color-tiger-orange)] text-[var(--color-tiger-orange)] text-xs font-bold tracking-widest capitalize mb-12"
          >
            Credit Guarantee Fund
          </motion.div>
          
          <div className="overflow-hidden pb-4">
            <motion.h2 
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-[var(--font-asul)] text-5xl sm:text-7xl md:text-[96px] lg:text-[110px] leading-[0.9] font-bold text-[var(--color-evergreen)] mb-16 tracking-tighter capitalize"
            >
              We Take On <br />
              The Risk <span className="text-[var(--color-tiger-orange)]">Lenders</span> <br />
              Won&apos;t.
            </motion.h2>
          </div>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
            }}
            className="text-xl md:text-2xl text-[var(--color-evergreen)]/80 max-w-3xl font-medium mx-auto mb-24"
          >
            By absorbing a significant portion of the risk, we incentivize financial institutions to lower interest rates and ease collateral demands for youth and women founders.
          </motion.p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16"
        >
          {points.map((point, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="flex flex-col items-center text-center border-t border-[var(--color-evergreen)]/20 pt-8"
            >
              <h3 className="font-bold text-[var(--color-evergreen)] text-xl md:text-2xl mb-4 capitalize">{point.title}</h3>
              <p className="text-[var(--color-evergreen)]/70 text-lg leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
