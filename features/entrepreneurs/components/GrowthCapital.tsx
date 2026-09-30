"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function GrowthCapital() {
  const points = [
    {
      title: "Direct Equity",
      desc: "Capital injection in exchange for an ownership stake, giving you runway to scale without immediate debt."
    },
    {
      title: "Partner Funds",
      desc: "Co-investing alongside trusted venture capital and private equity funds to multiply impact."
    },
    {
      title: "First-Loss Protection",
      desc: "De-risking early-stage investments to crowd-in private capital that would otherwise stay sidelined."
    }
  ];

  return (
    <section className="bg-[var(--color-mint-cream)] pt-24 md:pt-32 overflow-hidden border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-6xl mb-16 md:mb-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <div className="overflow-hidden">
            <motion.h2 
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-[var(--font-asul)] text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-evergreen)] max-w-4xl tracking-tight leading-[1.1]"
            >
              Growth Capital, Direct or Through Funds You Trust.
            </motion.h2>
          </div>
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } }
            }}
            className="mt-8 text-xl md:text-2xl text-[var(--color-evergreen)]/80 max-w-2xl font-medium"
          >
            We invest patient capital directly into your business, or through pre-vetted fund managers, ensuring you have the financial foundation to scale boldly.
          </motion.p>
        </motion.div>
      </div>

      {/* 3-Column Grid for Features */}
      <div className="container mx-auto px-4 max-w-6xl mb-16 md:mb-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-b border-[var(--color-evergreen)]/20"
        >
          {points.map((point, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className={`p-8 md:p-12 ${index !== points.length - 1 ? 'md:border-r border-b md:border-b-0 border-[var(--color-evergreen)]/20' : ''}`}
            >
              <div className="text-[var(--color-tiger-orange)] font-bold text-xs tracking-widest capitalize mb-6">
                0{index + 1}
              </div>
              <h3 className="font-bold text-[var(--color-evergreen)] text-2xl mb-4 capitalize">{point.title}</h3>
              <p className="text-[var(--color-evergreen)]/70 text-lg leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Full Bleed Image Showcase */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full relative overflow-hidden"
      >
        <Image 
          src="/asset/section-image.png"
          alt="YEIB Office and Environment"
          width={1535}
          height={1024}
          sizes="100vw"
          unoptimized={true}
          className="w-full h-auto block"
        />
      </motion.div>
    </section>
  );
}
