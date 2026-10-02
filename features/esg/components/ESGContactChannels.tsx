"use client";

import { useState } from "react";
import { ArrowRight, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { submitGrievanceAction } from "@/lib/email/actions";

export function ESGContactChannels() {
  const [showGrievanceForm, setShowGrievanceForm] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleGrievanceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypot = (formData.get("website_url_hp") as string) || "";
    const fullName = (formData.get("fullName") as string) || "";
    const contactInfo = (formData.get("contactInfo") as string) || "";
    const projectLocation = (formData.get("projectLocation") as string) || "";
    const details = (formData.get("details") as string) || "";

    try {
      const result = await submitGrievanceAction({
        fullName,
        contactInfo,
        projectLocation,
        details,
        honeypot,
      });

      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Failed to submit grievance. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  const channels = [
    {
      num: "01",
      title: "GRIEVANCE REDRESS",
      desc: "For project-affected persons and communities to raise environmental, social, or project-related concerns. Raising a grievance will not result in retaliation or affect your access to YEIB financing.",
      actionText: "Submit a Grievance",
      action: () => {
        setStatus("idle");
        setShowGrievanceForm(true);
      }
    },
    {
      num: "02",
      title: "WHISTLEBLOWING",
      desc: "A strictly confidential and anonymous channel for reporting suspected fraud, corruption, misconduct, unethical behaviour, or conflicts of interest. Protected by our non-retaliation policy.",
      actionText: "Report Misconduct",
      action: () => alert("Redirecting to secure reporting portal...")
    },
    {
      num: "03",
      title: "GENERAL ENQUIRIES",
      desc: "For standard questions regarding the fund, application processes, partnership opportunities, or media requests that do not involve a grievance or whistleblowing.",
      actionText: "Contact Us",
      action: () => alert("Redirecting to contact page...")
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
                <Button 
                  variant="secondary" 
                  onClick={channel.action}
                  className="w-full justify-between bg-transparent border border-[var(--color-evergreen)]/30 hover:border-[var(--color-evergreen)] hover:bg-[var(--color-evergreen)] text-[var(--color-evergreen)] hover:text-white rounded-none py-6 transition-all duration-300 group"
                >
                  {channel.actionText} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
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

      {/* Modal for Grievance Form */}
      {showGrievanceForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-evergreen)]/95 backdrop-blur-md">
          <div className="bg-[var(--color-mint-cream)] rounded-none border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowGrievanceForm(false)}
              className="absolute top-6 right-6 p-2 rounded-none hover:bg-white/50 transition-colors"
            >
              <X className="w-8 h-8 text-[var(--color-evergreen)]" strokeWidth={1} />
            </button>
            
            <h2 className="font-asul text-4xl font-bold text-[var(--color-evergreen)] mb-2 capitalize">Submit a Grievance</h2>
            <p className="text-sm text-[var(--color-evergreen)]/70 mb-8 font-medium">This form is for environmental, social, or project-related concerns. You will not face retaliation for submitting a grievance.</p>
            
            {status === "success" ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[var(--color-evergreen)] mx-auto" />
                <h3 className="font-asul text-2xl font-bold text-[var(--color-evergreen)]">
                  Grievance Registered Securely
                </h3>
                <p className="text-sm text-[var(--color-evergreen)]/80 max-w-md mx-auto">
                  Thank you for speaking up. Your report has been dispatched to the YEIB ESG Compliance & Grievance Redress unit under strict NDPR confidentiality.
                </p>
                <div className="pt-4">
                  <Button
                    type="button"
                    className="bg-[var(--color-evergreen)] text-white hover:bg-[var(--color-evergreen)]/90 rounded-none py-4 px-6 text-xs uppercase tracking-widest"
                    onClick={() => {
                      setStatus("idle");
                      setShowGrievanceForm(false);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleGrievanceSubmit}>
                {/* Honeypot field */}
                <input
                  type="text"
                  name="website_url_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />

                {status === "error" && (
                  <div className="flex items-start gap-2 p-3 bg-red-100 text-red-800 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage || "Submission failed. Please try again."}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold tracking-widest capitalize text-[var(--color-evergreen)]/70 mb-2">Full Name (Optional)</label>
                    <input name="fullName" type="text" className="w-full bg-transparent border-b border-[var(--color-evergreen)]/30 focus:border-[var(--color-tiger-orange)] py-3 px-0 focus:outline-none transition-colors rounded-none" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest capitalize text-[var(--color-evergreen)]/70 mb-2">Email or Phone Number *</label>
                    <input name="contactInfo" type="text" className="w-full bg-transparent border-b border-[var(--color-evergreen)]/30 focus:border-[var(--color-tiger-orange)] py-3 px-0 focus:outline-none transition-colors rounded-none" placeholder="How can we reach you?" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold tracking-widest capitalize text-[var(--color-evergreen)]/70 mb-2">Project / Location *</label>
                  <input name="projectLocation" type="text" className="w-full bg-transparent border-b border-[var(--color-evergreen)]/30 focus:border-[var(--color-tiger-orange)] py-3 px-0 focus:outline-none transition-colors rounded-none" placeholder="Which project does this concern?" required />
                </div>
                
                <div>
                  <label className="block text-xs font-bold tracking-widest capitalize text-[var(--color-evergreen)]/70 mb-2">Details of the Grievance *</label>
                  <textarea name="details" rows={5} className="w-full bg-transparent border-b border-[var(--color-evergreen)]/30 focus:border-[var(--color-tiger-orange)] py-3 px-0 focus:outline-none transition-colors rounded-none resize-none" placeholder="Please provide as much detail as possible..." required></textarea>
                </div>
                
                <div className="pt-8 flex flex-col sm:flex-row justify-end gap-4">
                  <Button type="button" variant="secondary" className="bg-transparent border border-[var(--color-evergreen)]/30 rounded-none py-6 capitalize tracking-widest text-xs" onClick={() => setShowGrievanceForm(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={status === "submitting"}
                    className="bg-[var(--color-tiger-orange)] hover:bg-orange-600 text-white rounded-none py-6 capitalize tracking-widest text-xs flex items-center justify-center gap-2"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Securely...</span>
                      </>
                    ) : (
                      "Submit Securely"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
