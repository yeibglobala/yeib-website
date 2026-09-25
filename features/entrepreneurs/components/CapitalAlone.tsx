"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function CapitalAlone() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const services = [
    {
      title: "Technical Capacity Building",
      desc: "In-depth operational training, financial literacy programs, and management structuring to ensure your business is built on a solid foundation."
    },
    {
      title: "Specialized Advisory Services",
      desc: "Access to industry experts who provide tactical guidance on scaling, market entry, regulatory compliance, and product development."
    },
    {
      title: "Investor Readiness Support",
      desc: "Strategic preparation to help you secure subsequent rounds of funding from institutional investors, DFIs, and commercial lenders."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white text-[var(--color-evergreen)] py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between mb-16 md:mb-24 gap-8">
          <div className="md:w-1/4">
            <h3 className="font-bold tracking-widest text-xs capitalize text-[var(--color-tiger-orange)] mb-4">
              Services
            </h3>
          </div>
          <div className="md:w-3/4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } }
              }}
              className="overflow-hidden"
            >
              <motion.h2 
                variants={{
                  hidden: { y: "100%", opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="font-[var(--font-asul)] text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight capitalize leading-[1.1]"
              >
                With Ecosystem Support <br className="hidden md:block" />
                And Overall Capacity <br className="hidden md:block" />
                In Focus
              </motion.h2>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-[var(--color-evergreen)]/20">
          {services.map((service, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              key={index} 
              className="border-b border-[var(--color-evergreen)]/20 overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full py-8 md:py-12 flex justify-between items-center text-left hover:bg-[var(--color-mint-cream)] transition-colors px-4 -mx-4 group"
              >
                <h3 className="font-[var(--font-asul)] text-2xl md:text-4xl lg:text-5xl font-bold capitalize transition-transform duration-300 group-hover:translate-x-2">
                  {service.title}
                </h3>
                <div className="flex-shrink-0 ml-8 text-[var(--color-evergreen)]">
                  <motion.div animate={{ rotate: openIndex === index ? 90 : 0 }}>
                    {openIndex === index ? (
                      <Minus className="w-8 h-8 font-light" strokeWidth={1} />
                    ) : (
                      <Plus className="w-8 h-8 font-light" strokeWidth={1} />
                    )}
                  </motion.div>
                </div>
              </button>
              
              <div 
                className={cn(
                  "grid transition-all duration-500 ease-in-out px-4 -mx-4",
                  openIndex === index ? "grid-rows-[1fr] pb-12 opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                      {/* Empty left column for alignment */}
                    </div>
                    <div className="md:w-3/4">
                      <p className="text-xl md:text-2xl text-[var(--color-evergreen)]/80 leading-relaxed font-medium max-w-3xl">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
