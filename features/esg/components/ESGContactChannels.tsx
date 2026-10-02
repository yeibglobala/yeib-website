"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function ESGContactChannels() {
  const channels = [
    {
      num: "01",
      title: "GRIEVANCE REDRESS",
      desc: "For project-affected persons and communities to raise environmental, social, or project-related concerns. Raising a grievance will not result in retaliation or affect your access to YEIB financing.",
      actionText: "Submit a Grievance",
      href: "/form?type=grievance"
    },
    {
      num: "02",
      title: "WHISTLEBLOWING",
      desc: "A strictly confidential and anonymous channel for reporting suspected fraud, corruption, misconduct, unethical behaviour, or conflicts of interest. Protected by our non-retaliation policy.",
      actionText: "Report Misconduct",
      href: "/form?type=misconduct"
    },
    {
      num: "03",
      title: "GENERAL ENQUIRIES",
      desc: "For standard questions regarding the fund, application processes, partnership opportunities, or media requests that do not involve a grievance or whistleblowing.",
      actionText: "Contact Us",
      href: "/form"
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
              className="font-asul text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight capitalize"
            >
              Accountability In Action.
            </motion.h2>
          </div>
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
            }}
            className="mt-6 text-lg md:text-xl text-[var(--color-evergreen)]/70 max-w-2xl font-medium"
          >
            We maintain distinct, confidential channels to ensure all stakeholders can safely communicate concerns, report misconduct, or make general enquiries.
          </motion.p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl pb-24">
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
          {channels.map((channel, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className={`pt-12 flex flex-col h-full ${i !== channels.length - 1 ? 'md:border-r border-[var(--color-evergreen)]/20 md:pr-12 lg:pr-16 md:mr-12 lg:mr-16 pb-12 md:pb-0' : 'pb-12 md:pb-0'}`}
            >
              <div className="text-[var(--color-tiger-orange)] font-bold text-lg mb-8">
                {channel.num}.
              </div>
              
              <div className="mb-12 flex-grow">
                <h3 className="font-asul text-3xl font-bold mb-6 tracking-tight capitalize">{channel.title}</h3>
                <p className="text-lg text-[var(--color-evergreen)]/80 leading-relaxed font-medium">{channel.desc}</p>
              </div>

              <div className="mt-auto">
                <Link href={channel.href} className="block">
                  <Button 
                    variant="secondary" 
                    className="w-full justify-between bg-transparent border border-[var(--color-evergreen)]/30 hover:border-[var(--color-evergreen)] hover:bg-[var(--color-evergreen)] text-[var(--color-evergreen)] hover:text-white rounded-none py-6 transition-all duration-300 group"
                  >
                    {channel.actionText} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Data Privacy Note - Minimalist Version */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-[var(--color-evergreen)]/20 text-xs md:text-sm text-[var(--color-evergreen)]/50 capitalize tracking-widest font-bold flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <span>Data Protection Statement</span>
          <span className="text-right max-w-2xl lowercase normal-case tracking-normal font-medium opacity-80">
            Any personal or sensitive information collected through our Grievance or Whistleblowing channels is strictly confidential, stored securely, and protected in accordance with the Nigerian Data Protection Regulation (NDPR).
          </span>
        </motion.div>
      </div>
    </section>
  );
}
