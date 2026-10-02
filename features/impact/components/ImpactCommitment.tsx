"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ImpactCommitment() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="py-32 md:py-48 bg-[var(--color-evergreen)] text-white overflow-hidden relative"
    >
      <motion.div 
        style={{ y }}
        className="absolute inset-0 bg-[url('/asset/logo-icon-section-background-pattern1.png')] bg-cover bg-center opacity-5 mix-blend-overlay"
      />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col md:flex-row justify-between items-start gap-16">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="md:w-3/4"
        >
          <div className="overflow-hidden mb-12">
            <motion.h2 
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-asul text-4xl sm:text-5xl md:text-7xl lg:text-[80px] leading-[1.05] font-bold text-white tracking-tighter"
            >
              As We Deploy Capital, We&apos;ll Publish What We Find Here - Not Just What Looks Good.
            </motion.h2>
          </div>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4 } }
          }}
          className="md:w-1/4 pt-4 md:border-l border-white/20 md:pl-12"
        >
          <div className="text-[var(--color-tiger-orange)] font-bold text-xs tracking-widest capitalize mb-6">
            Accountability
          </div>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium">
            We are committed to transparent accountability. Raw targets are easy to set, but execution requires active tracking. Every learning, programmatic adjustment, and hard target met will live in this open framework.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
