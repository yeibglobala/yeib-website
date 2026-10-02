"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function InvestorsHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={ref}
      className="relative w-full min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[var(--color-evergreen)]"
    >
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/asset/generated/institutional_capital_abstract.jpg"
          alt="Institutional Capital Structure"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-evergreen)] via-[var(--color-evergreen)]/60 to-transparent" />
      </motion.div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10 pb-16 md:pb-24 pt-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="max-w-6xl"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            className="inline-block px-4 py-1.5 rounded-full border border-[var(--color-tiger-orange)] text-[var(--color-tiger-orange)] text-xs font-bold tracking-widest capitalize mb-12"
          >
            For Investors & Partners
          </motion.div>

          <div className="overflow-hidden mb-8">
            <motion.h1 
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-asul text-5xl sm:text-6xl md:text-7xl lg:text-[100px] leading-[0.95] font-bold text-white tracking-tighter"
            >
              A $300M Thesis-Driven <br />
              <span className="text-[var(--color-tiger-orange)]">Capital Fund.</span>
            </motion.h1>
          </div>
          
          <div className="overflow-hidden max-w-3xl">
            <motion.p 
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
              }}
              className="text-xl md:text-3xl text-white/80 leading-snug font-medium mb-12"
            >
              Deploying capital to de-risk and scale Nigerian youth- and women-led MSMEs. We bridge the gap between global institutional capital and high-potential local markets.
            </motion.p>
            
            <motion.div 
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut", delay: 0.4 } }
              }}
              className="flex flex-col sm:flex-row justify-start items-center gap-4"
            >
              <Link href="/apply" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-[var(--color-tiger-orange)] text-white hover:bg-[var(--color-tiger-orange)]/90 hover:opacity-100 border border-[var(--color-tiger-orange)]">
                  Apply for funding
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10">
                  Learn more
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
