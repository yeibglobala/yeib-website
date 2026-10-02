"use client";

import { motion } from "framer-motion";

export function TwoSidedModel() {
  const sides = [
    {
      num: "01",
      title: "Supply Side",
      subtitle: "Institutional Capital",
      desc: "We aggregate capital from DFIs, commercial lenders and MFIs, PE/VC firms, and foundations, offering them a de-risked channel to deploy funds into the Nigerian youth and women-led MSME sector without the traditional friction of direct lending.",
      color: "var(--color-evergreen)",
      bg: "var(--color-mint-cream)"
    },
    {
      num: "02",
      title: "Demand Side",
      subtitle: "Youth-Led MSMEs",
      desc: "We serve youth- and women-led enterprises (under 35) by unlocking access to finance through our intermediary networks, backed by structural guarantees and ecosystem capacity building.",
      color: "var(--color-mint-cream)",
      bg: "var(--color-evergreen)"
    }
  ];

  return (
    <section className="bg-white overflow-hidden">
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
              className="font-asul text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight capitalize text-[var(--color-evergreen)]"
            >
              The Two-Sided <br /> Model.
            </motion.h2>
          </div>
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
            }}
            className="mt-6 text-lg md:text-xl text-[var(--color-evergreen)]/70 max-w-2xl font-medium"
          >
            We operate an intermediary mechanism designed to perfectly align institutional capital with vetted pipeline opportunities on the ground.
          </motion.p>
        </motion.div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {sides.map((side, i) => (
            <motion.div 
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.2 } }
              }}
              style={{ backgroundColor: side.bg, color: side.color }}
              className="p-12 md:p-24 flex flex-col justify-between min-h-[60vh]"
            >
              <div>
                <div className="font-bold text-lg mb-8 opacity-60 tracking-widest capitalize">
                  {side.num}. {side.subtitle}
                </div>
                <h3 className="font-asul text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tighter capitalize leading-[0.9]">
                  {side.title}
                </h3>
              </div>
              <p className="text-xl md:text-2xl leading-relaxed font-medium max-w-lg opacity-90 mt-12">
                {side.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
