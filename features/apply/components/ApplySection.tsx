"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitApplicationAction } from "@/lib/email/actions";

type ApplicantType = "founder" | "manager" | "eso";
type ViewState = "lead" | "form";

export function ApplySection() {
  const [activeTab, setActiveTab] = useState<ApplicantType>("founder");
  const [view, setView] = useState<ViewState>("lead");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const tabData = {
    founder: {
      label: "Entrepreneurs",
      tag: "For Entrepreneurs",
      title: "Apply for Funding.",
      desc: "We are looking for ambitious youth- and women-led MSMEs ready to scale. Review our process and ensure you meet the criteria before applying.",
      process: [
        { step: "01", title: "Check Eligibility", description: "Ensure your business meets the core criteria for YEIB funding, focusing on youth and women-led enterprises." },
        { step: "02", title: "Submit Intake Form", description: "Provide basic information about your business, sector, and capital requirements." },
        { step: "03", title: "Initial Evaluation", description: "Our team reviews your submission to determine the best funding mechanism." },
        { step: "04", title: "Due Diligence", description: "Shortlisted candidates will undergo a comprehensive financial and operational review." }
      ],
      eligibility: [
        "Under age 35 (or management team ≥50% under 35)",
        "Registered business operating in Nigeria",
        "Clear revenue generation model",
        "Priority given to Agriculture, Trade, Creative, and ICT sectors"
      ]
    },
    manager: {
      label: "Fund Managers",
      tag: "For Intermediaries",
      title: "Partner with Us.",
      desc: "We co-invest with established PE/VC firms and asset managers to amplify capital deployment to Nigerian MSMEs.",
      process: [
        { step: "01", title: "Portfolio Review", description: "Ensure your fund's investment mandate aligns with the YEIB focus sectors and demographic targets." },
        { step: "02", title: "Submit Application", description: "Provide your fund track record, AUM, and strategic mandate details." },
        { step: "03", title: "Institutional Assessment", description: "We evaluate your fund strategy, ESG compliance framework, and existing pipeline." },
        { step: "04", title: "Co-Investment Structuring", description: "Finalize capital commitment and deployment schedules." }
      ],
      eligibility: [
        "Registered asset management or PE/VC firm",
        "Proven track record of investing in MSMEs in Nigeria",
        "Aligned ESG and impact mandates",
        "Robust risk management framework"
      ]
    },
    eso: {
      label: "ESOs",
      tag: "For Ecosystem Partners",
      title: "Drive Ecosystem Capacity.",
      desc: "We support Enterprise Support Organizations (incubators, accelerators) to build a stronger pipeline of investment-ready businesses.",
      process: [
        { step: "01", title: "Capacity Assessment", description: "Review your existing incubator, accelerator, or capacity-building programs." },
        { step: "02", title: "Submit Proposal", description: "Detail your proposed curriculum, target demographic, and expected ecosystem impact." },
        { step: "03", title: "Partnership Evaluation", description: "Assessment of your operational reach, past success metrics, and infrastructure." },
        { step: "04", title: "Deployment", description: "Mobilization of grant/support funding for program execution." }
      ],
      eligibility: [
        "Proven experience running incubation or acceleration programs",
        "Existing network of early-stage startups/MSMEs",
        "Measurable past impact metrics",
        "Clear methodology for technical capacity building"
      ]
    }
  };

  const currentData = tabData[activeTab];

  return (
    <section className="bg-[var(--color-mint-cream)] text-[var(--color-evergreen)] min-h-screen pt-32 pb-24 overflow-hidden">
      <AnimatePresence mode="wait">
        {view === "form" ? (
          <motion.div 
            key="form-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="container mx-auto px-4 max-w-3xl"
          >
            <button 
              onClick={() => setView("lead")}
              className="flex items-center gap-2 text-[var(--color-evergreen)]/70 hover:text-[var(--color-tiger-orange)] font-bold text-sm mb-8 transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Overview
            </button>
            
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-[var(--color-evergreen)]/5">
              <div className="mb-10 text-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-mint-cream)] text-[var(--color-evergreen)] text-xs font-bold tracking-widest capitalize mb-4"
                >
                  {currentData.label} Application
                </motion.div>
                <h2 className="font-[var(--font-asul)] text-3xl md:text-4xl font-bold mb-4">Intake Form</h2>
                <p className="text-[var(--color-evergreen)]/70 font-medium">
                  Please provide accurate details so we can route your application to the correct evaluation track.
                </p>
              </div>
              
              {status === "success" ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-[var(--color-mint-cream)] text-[var(--color-mint-leaf)] rounded-full flex items-center justify-center mb-6 border border-[var(--color-mint-leaf)]/30">
                    <CheckCircle2 size={44} />
                  </div>
                  <h3 className="font-[var(--font-asul)] text-2xl md:text-3xl font-bold text-[var(--color-evergreen)] mb-3">
                    Application Submitted Successfully
                  </h3>
                  <p className="text-[var(--color-evergreen)]/70 max-w-md mx-auto mb-8 leading-relaxed">
                    Your {currentData.label} application has been received and logged into our evaluation pipeline. A confirmation email has been dispatched with next steps.
                  </p>
                  <Button
                    onClick={() => {
                      setStatus("idle");
                      setView("lead");
                    }}
                    className="bg-[var(--color-evergreen)] text-white hover:bg-[var(--color-evergreen)]/90"
                  >
                    Done & Return to Overview
                  </Button>
                </div>
              ) : (
                <form className="flex flex-col gap-8" onSubmit={async (e) => {
                  e.preventDefault();
                  setStatus("submitting");
                  setErrorMessage("");

                  const formData = new FormData(e.currentTarget);
                  const honeypot = (formData.get("honeypot") as string) || "";
                  const contactEmail = (formData.get("contactEmail") as string) || "";
                  const contactPhone = (formData.get("contactPhone") as string) || "";

                  let trackFields: Record<string, string> = {};

                  if (activeTab === "founder") {
                    trackFields = {
                      "Full Name": (formData.get("founderFullName") as string) || "",
                      "Age": (formData.get("founderAge") as string) || "",
                      "Business Name": (formData.get("founderBusinessName") as string) || "",
                      "Primary Sector": (formData.get("founderSector") as string) || "",
                      "Funding Amount Requested": (formData.get("founderAmount") as string) || "",
                      "Brief Description": (formData.get("founderPitch") as string) || "",
                    };
                  } else if (activeTab === "manager") {
                    trackFields = {
                      "Contact Name": (formData.get("managerContactName") as string) || "",
                      "Firm Name": (formData.get("managerFirmName") as string) || "",
                      "Current AUM": (formData.get("managerAum") as string) || "",
                      "Target Co-Investment": (formData.get("managerTarget") as string) || "",
                      "Investment Strategy": (formData.get("managerStrategy") as string) || "",
                    };
                  } else if (activeTab === "eso") {
                    trackFields = {
                      "Contact Person": (formData.get("esoContactPerson") as string) || "",
                      "Organization Name": (formData.get("esoOrgName") as string) || "",
                      "Program Focus": (formData.get("esoFocus") as string) || "",
                      "Annual Cohort Size": (formData.get("esoCohortSize") as string) || "",
                      "Program Details": (formData.get("esoProposal") as string) || "",
                    };
                  }

                  try {
                    const res = await submitApplicationAction({
                      track: activeTab,
                      contactEmail,
                      contactPhone,
                      trackFields,
                      honeypot,
                    });

                    if (res.success) {
                      setStatus("success");
                    } else {
                      setStatus("error");
                      setErrorMessage(res.message || "Failed to submit application.");
                    }
                  } catch (err) {
                    console.error(err);
                    setStatus("error");
                    setErrorMessage("Network error submitting application. Please try again.");
                  }
                }}>
                  {/* Anti-spam honeypot */}
                  <input
                    type="text"
                    name="honeypot"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
                      <AlertCircle size={20} className="flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-8"
                    >
                      {activeTab === "founder" && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="f-name" className="font-bold text-sm">Full Name</label>
                              <input type="text" id="f-name" name="founderFullName" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all" placeholder="Your full name" required />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="f-age" className="font-bold text-sm">Age</label>
                              <input type="number" id="f-age" name="founderAge" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all" placeholder="e.g. 28" required />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="f-bname" className="font-bold text-sm">Business Name</label>
                              <input type="text" id="f-bname" name="founderBusinessName" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all" placeholder="Registered business name" required />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="f-sector" className="font-bold text-sm">Primary Sector</label>
                              <select id="f-sector" name="founderSector" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all cursor-pointer" required>
                                <option value="">Select a sector</option>
                                <option value="agriculture">Agriculture</option>
                                <option value="trade">Trade</option>
                                <option value="creative">Creative</option>
                                <option value="ict">ICT</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="f-amount" className="font-bold text-sm">Funding Amount Requested (NGN)</label>
                            <select id="f-amount" name="founderAmount" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all cursor-pointer" required>
                              <option value="">Select range</option>
                              <option value="Under ₦5,000,000">Under ₦5,000,000</option>
                              <option value="₦5,000,000 - ₦20,000,000">₦5,000,000 - ₦20,000,000</option>
                              <option value="₦20,000,000 - ₦50,000,000">₦20,000,000 - ₦50,000,000</option>
                              <option value="Above ₦50,000,000">Above ₦50,000,000</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="f-pitch" className="font-bold text-sm">Brief Business Description</label>
                            <textarea id="f-pitch" name="founderPitch" rows={5} className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 resize-none text-base transition-all" placeholder="What does your business do, and what will the funding be used for?" required></textarea>
                          </div>
                        </>
                      )}

                      {activeTab === "manager" && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="m-name" className="font-bold text-sm">Contact Name</label>
                              <input type="text" id="m-name" name="managerContactName" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all" placeholder="Full name" required />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="m-firm" className="font-bold text-sm">Firm Name</label>
                              <input type="text" id="m-firm" name="managerFirmName" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all" placeholder="PE/VC Firm Name" required />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="m-aum" className="font-bold text-sm">Current AUM (NGN/USD)</label>
                              <input type="text" id="m-aum" name="managerAum" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all" placeholder="e.g. ₦10B / $20M" required />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="m-target" className="font-bold text-sm">Target Co-Investment (NGN)</label>
                              <input type="text" id="m-target" name="managerTarget" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all" placeholder="Amount seeking from YEIB" required />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="m-strategy" className="font-bold text-sm">Investment Strategy Summary</label>
                            <textarea id="m-strategy" name="managerStrategy" rows={5} className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 resize-none text-base transition-all" placeholder="Briefly describe your firm's investment mandate and alignment with YEIB goals." required></textarea>
                          </div>
                        </>
                      )}

                      {activeTab === "eso" && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="e-contact" className="font-bold text-sm">Contact Person</label>
                              <input type="text" id="e-contact" name="esoContactPerson" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all" placeholder="Full name" required />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="e-org" className="font-bold text-sm">Organization Name</label>
                              <input type="text" id="e-org" name="esoOrgName" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all" placeholder="Incubator / Accelerator Name" required />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="e-focus" className="font-bold text-sm">Program Focus</label>
                              <input type="text" id="e-focus" name="esoFocus" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all" placeholder="e.g. Agritech, General MSME" required />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="e-cohort" className="font-bold text-sm">Annual Cohort Size</label>
                              <input type="number" id="e-cohort" name="esoCohortSize" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all" placeholder="Number of startups supported per year" required />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="e-proposal" className="font-bold text-sm">Proposed Program Details</label>
                            <textarea id="e-proposal" name="esoProposal" rows={5} className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 resize-none text-base transition-all" placeholder="Describe the capacity building program you intend to run in partnership with YEIB." required></textarea>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="border-t border-gray-100 pt-6 mt-2">
                    <h3 className="font-bold text-lg mb-6">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="c-email" className="font-bold text-sm">Email Address</label>
                        <input type="email" id="c-email" name="contactEmail" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all" placeholder="name@domain.com" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="c-phone" className="font-bold text-sm">Phone Number</label>
                        <input type="tel" id="c-phone" name="contactPhone" className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all" placeholder="+234..." required />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={status === "submitting"}
                    className="w-full mt-4 bg-[var(--color-tiger-orange)] hover:bg-[var(--color-tiger-orange)]/90 text-white rounded-xl py-6 flex items-center justify-center gap-2 group text-base overflow-hidden relative disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        Submit Application <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="lead-view"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="container mx-auto px-4 max-w-5xl"
          >
            {/* Header Section */}
            <FadeIn direction="up">
              <div className="mb-12 text-center max-w-3xl mx-auto">
                <div className="inline-block px-4 py-1.5 rounded-full border border-[var(--color-tiger-orange)] text-[var(--color-tiger-orange)] text-xs font-bold tracking-widest capitalize mb-6">
                  {currentData.tag}
                </div>
                <h1 className="font-[var(--font-asul)] text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  {currentData.title}
                </h1>
                <p className="text-xl text-[var(--color-evergreen)]/80 font-medium leading-relaxed">
                  {currentData.desc}
                </p>
              </div>
            </FadeIn>

            {/* Tabs */}
            <FadeIn direction="up" delay={100}>
              <div className="flex flex-wrap justify-center gap-4 mb-16 relative z-10">
                {(Object.keys(tabData) as ApplicantType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="relative px-6 py-3 rounded-full font-bold text-sm transition-colors duration-300 overflow-hidden"
                  >
                    {activeTab === tab && (
                      <motion.div
                        layoutId="active-tab-bg"
                        className="absolute inset-0 bg-[var(--color-evergreen)] rounded-full z-[-1]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={activeTab === tab ? "text-white" : "text-[var(--color-evergreen)]/70 hover:text-[var(--color-evergreen)]"}>
                      {tabData[tab].label}
                    </span>
                  </button>
                ))}
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              
              {/* Process */}
              <FadeIn direction="up" delay={200} key={`process-${activeTab}`}>
                <div className="h-full">
                  <h2 className="font-[var(--font-asul)] text-3xl font-bold mb-8">The Process</h2>
                  <div className="flex flex-col gap-8">
                    <AnimatePresence mode="popLayout">
                      {currentData.process.map((item, i) => (
                        <motion.div 
                          key={item.step}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.4 }}
                          className="flex gap-5 group"
                        >
                          <div className="text-[var(--color-tiger-orange)] font-[var(--font-asul)] font-bold text-3xl mt-1 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 origin-left">
                            {item.step}
                          </div>
                          <div className="group-hover:translate-x-1 transition-transform duration-300">
                            <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                            <p className="text-[var(--color-evergreen)]/70 text-base leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </FadeIn>

              {/* Eligibility & Call to Action */}
              <div className="flex flex-col gap-8">
                <FadeIn direction="up" delay={300} key={`eligibility-${activeTab}`}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-[var(--color-evergreen)] text-white rounded-2xl p-8 md:p-10 shadow-xl transition-all duration-300"
                  >
                    <h2 className="font-[var(--font-asul)] text-2xl font-bold mb-8">Basic Eligibility</h2>
                    <ul className="flex flex-col gap-5">
                      <AnimatePresence mode="popLayout">
                        {currentData.eligibility.map((criterion, i) => (
                          <motion.li 
                            key={criterion}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            className="flex items-start gap-4 group"
                          >
                            <CheckCircle2 className="text-[var(--color-tiger-orange)] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={24} />
                            <span className="text-white/90 text-base font-medium leading-relaxed">{criterion}</span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  </motion.div>
                </FadeIn>

                <FadeIn direction="up" delay={400}>
                  <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-[var(--color-evergreen)]/5 text-center">
                    <h3 className="font-[var(--font-asul)] text-2xl font-bold mb-4">Ready to begin?</h3>
                    <p className="text-[var(--color-evergreen)]/70 text-base mb-8">
                      Click below to fill out the {currentData.label.toLowerCase()} intake form. It takes less than 5 minutes.
                    </p>
                    <Button 
                      size="lg" 
                      onClick={() => setView("form")}
                      className="w-full bg-[var(--color-tiger-orange)] hover:bg-[var(--color-tiger-orange)]/90 text-white rounded-xl py-6 flex items-center justify-center gap-2 group text-base relative overflow-hidden"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                      Start Application <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </FadeIn>
              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

