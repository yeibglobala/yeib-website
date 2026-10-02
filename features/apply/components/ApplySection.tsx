"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Loader2,
  AlertCircle,
  Copy,
  Check,
  ShieldCheck,
  Info,
  X,
  FileCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { submitApplicationAction } from "@/lib/email/actions";
import {
  STAKEHOLDER_GROUPS,
  NIGERIAN_STATES,
  StakeholderGroup,
} from "../data/stakeholderForms";
import { FORMS_BY_NUMBER, FormQuestion } from "../data/formQuestions";

// Curated Concept VC-style metadata for each stakeholder group
const STAKEHOLDER_META: Record<
  number,
  {
    trackPill: string;
    subheading: string;
    badges: string[];
  }
> = {
  1: {
    trackPill: "FORM 01 • DIRECT WINDOW",
    subheading:
      "Youth-led businesses with a working product, paying customers, and a plan to scale. Access equity, quasi-equity, and capacity grants.",
    badges: ["Ages 18–35", "Equity & Quasi-Equity", "BDS Grants"],
  },
  2: {
    trackPill: "FORM 02 • INDIRECT WINDOW",
    subheading:
      "Venture capital & private equity fund managers investing in early and growth-stage Nigerian youth enterprises.",
    badges: ["LP Commitments", "Co-Investment", "SEC Registered"],
  },
  3: {
    trackPill: "FORM 03 • CREDIT GUARANTEES",
    subheading:
      "CBN-licensed commercial, merchant, and microfinance banks expanding lending to youth-led MSMEs with ICGL risk-sharing.",
    badges: ["Individual & Portfolio", "CBN Licensed", "ICGL Partner Window"],
  },
  4: {
    trackPill: "FORM 04 • ECOSYSTEM FUND",
    subheading:
      "Incubators, accelerators, innovation hubs, and BDS providers delivering verified capacity-building and applying for grants.",
    badges: ["Vetted Provider Pool", "Capacity Grants", "Pan-Nigeria"],
  },
  5: {
    trackPill: "FORM 05 • POLICY & RESEARCH",
    subheading:
      "Universities, research institutes, think tanks, and public agencies proposing policy dialogue, entrepreneurship research, or MSME data.",
    badges: ["Convening & Policy", "MSME Data", "Thought Leadership"],
  },
  6: {
    trackPill: "FORM 06 • INSTITUTIONAL PARTNERS",
    subheading:
      "DFIs, bilateral agencies, foundations, and institutional investors exploring co-investment and capital partnerships with the Funds.",
    badges: ["DFIs & Bilaterals", "Co-Investment", "Strategic Capital"],
  },
};

export function ApplySection() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [selectedGroup, setSelectedGroup] = useState<StakeholderGroup | null>(null);

  // Section A - Contact Details
  const [contact, setContact] = useState({
    fullName: "",
    organizationName: "",
    role: "",
    email: "",
    phone: "",
    state: "",
    websiteOrLinkedIn: "",
    referralSource: "",
  });

  // Section B - Responses
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  // Special dual currency state for Form 2 Q2.6
  const [currencyForm2, setCurrencyForm2] = useState<"₦" | "US$">("₦");
  const [targetSizeForm2, setTargetSizeForm2] = useState("");
  const [committedForm2, setCommittedForm2] = useState("");

  // Special two-selects for Form 4 Q4.7
  const [youthLedShare, setYouthLedShare] = useState("");
  const [womenLedShare, setWomenLedShare] = useState("");

  // Section C - Declarations
  const [declarations, setDeclarations] = useState({
    accuracyConfirmed: false,
    nonBindingAcknowledged: false,
    privacyConsent: false,
    exclusionListConfirmed: false,
    shareWithPartnersConsent: false,
    receiveUpdatesConsent: false,
  });

  // Flow State
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [copiedRef, setCopiedRef] = useState(false);

  // Modals for NDPA Privacy & Exclusion List
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showExclusionModal, setShowExclusionModal] = useState(false);

  // Helpers
  const countWords = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const handleCopyReference = () => {
    if (referenceNumber) {
      navigator.clipboard.writeText(referenceNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  // Group selection
  const handleSelectGroup = (group: StakeholderGroup) => {
    setSelectedGroup(group);
    setResponses({});
    setStep(1); // Move to Section A
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Validation before advancing to Section B
  const canProceedFromSectionA = () => {
    return (
      contact.fullName.trim() !== "" &&
      contact.organizationName.trim() !== "" &&
      contact.role.trim() !== "" &&
      contact.email.trim().includes("@") &&
      contact.phone.trim().length >= 7 &&
      contact.state.trim() !== ""
    );
  };

  // Check whether Form 1 includes equity or quasi-equity (triggers Q1.10, Q1.11, and C.4)
  const isForm1Equity = () => {
    if (selectedGroup?.formNumber !== 1) return false;
    const support = responses["1.9"];
    if (!support) return false;
    const arr = Array.isArray(support) ? support : [support];
    return (
      arr.includes("Equity investment") ||
      arr.includes("Quasi-equity (for example, revenue-based or convertible finance)")
    );
  };

  // Validation before advancing to Section C
  const canProceedFromSectionB = () => {
    if (!selectedGroup) return false;
    const questions = FORMS_BY_NUMBER[selectedGroup.formNumber] || [];

    for (const q of questions) {
      if (q.condition && !q.condition(responses)) {
        continue;
      }
      if (!q.required) continue;

      if (q.type === "currency-dual") {
        if (!targetSizeForm2.trim() || !committedForm2.trim()) return false;
        continue;
      }

      if (q.type === "two-selects") {
        if (!youthLedShare || !womenLedShare) return false;
        continue;
      }

      const val = responses[q.id];
      if (!val || (Array.isArray(val) && val.length === 0) || String(val).trim() === "") {
        return false;
      }

      if (q.maxWords && countWords(String(val)) > q.maxWords) {
        return false;
      }
    }
    return true;
  };

  // Final submission
  const handleSubmitFinal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedGroup) return;

    if (!declarations.accuracyConfirmed || !declarations.nonBindingAcknowledged || !declarations.privacyConsent) {
      setErrorMessage("Please accept all mandatory legal declarations to proceed.");
      return;
    }

    if (isForm1Equity() && !declarations.exclusionListConfirmed) {
      setErrorMessage("Confirmation of compliance with the YEIB Exclusion List is required for equity applications.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const consolidatedResponses: Record<string, string | string[]> = { ...responses };

    // Format Form 2 Q2.6
    if (selectedGroup.formNumber === 2) {
      consolidatedResponses["2.6 Target fund size and capital committed to date"] =
        `Target: ${currencyForm2}${targetSizeForm2} | Committed: ${currencyForm2}${committedForm2}`;
    }

    // Format Form 4 Q4.7
    if (selectedGroup.formNumber === 4) {
      consolidatedResponses["4.7 Share of youth-led and women-led businesses"] =
        `Youth-led: ${youthLedShare} | Women-led: ${womenLedShare}`;
    }

    try {
      const res = await submitApplicationAction({
        formNumber: selectedGroup.formNumber,
        formTitle: selectedGroup.name,
        contact,
        responses: consolidatedResponses,
        declarations,
      });

      if (res.success) {
        setReferenceNumber(res.referenceNumber || "YEIB-CONFIRMED");
        setStatus("success");
        setStep(4);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setStatus("error");
        setErrorMessage(res.message || "Failed to submit application. Please check fields and try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("A network or transmission error occurred. Please try submitting again.");
    }
  };

  return (
    <section
      id="main-content"
      aria-label="Stakeholder Application Portal"
      className="bg-[var(--color-mint-cream)] text-[var(--color-evergreen)] min-h-screen pt-36 sm:pt-44 md:pt-48 lg:pt-52 pb-28 relative scroll-mt-28"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Step Indicator Header (When inside Steps 1 to 3) */}
        {step >= 1 && step <= 3 && selectedGroup && (
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <button
                type="button"
                aria-label="Return to previous application step"
                onClick={() => {
                  setStep((prev) => Math.max(0, prev - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-evergreen)]/70 hover:text-[var(--color-tiger-orange)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tiger-orange)] rounded-lg p-1.5 transition-colors group w-fit"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to {step === 1 ? "Stakeholder Selector" : "Previous Step"}</span>
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-evergreen)]/5 border border-[var(--color-evergreen)]/10 text-xs font-bold tracking-wider uppercase text-[var(--color-evergreen)]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-tiger-orange)]" />
                <span>Form 0{selectedGroup.formNumber}</span>
                <span className="text-[var(--color-evergreen)]/30">•</span>
                <span className="font-semibold text-[var(--color-evergreen)]/80">{selectedGroup.name}</span>
              </div>
            </div>

            {/* Concept VC Segmented Progress Pills */}
            <div
              role="tablist"
              aria-label="Application progress steps"
              className="grid grid-cols-3 gap-3 p-1.5 rounded-2xl bg-white/70 border border-[var(--color-evergreen)]/10 shadow-sm backdrop-blur-sm"
            >
              <div
                role="tab"
                aria-selected={step === 1}
                aria-label="Step 1: Contact Details"
                className={`py-3 px-4 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  step === 1
                    ? "bg-[var(--color-evergreen)] text-white shadow-md ring-2 ring-[var(--color-evergreen)]/20"
                    : step > 1
                    ? "bg-[var(--color-evergreen)]/10 text-[var(--color-evergreen)]"
                    : "text-[var(--color-evergreen)]/40"
                }`}
              >
                <span className="font-mono">01</span>
                <span className="hidden sm:inline">Contact</span>
              </div>

              <div
                role="tab"
                aria-selected={step === 2}
                aria-label="Step 2: Screening Questions"
                className={`py-3 px-4 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  step === 2
                    ? "bg-[var(--color-evergreen)] text-white shadow-md ring-2 ring-[var(--color-evergreen)]/20"
                    : step > 2
                    ? "bg-[var(--color-evergreen)]/10 text-[var(--color-evergreen)]"
                    : "text-[var(--color-evergreen)]/40"
                }`}
              >
                <span className="font-mono">02</span>
                <span className="hidden sm:inline">Screening</span>
              </div>

              <div
                role="tab"
                aria-selected={step === 3}
                aria-label="Step 3: Legal Declarations"
                className={`py-3 px-4 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  step === 3
                    ? "bg-[var(--color-evergreen)] text-white shadow-md ring-2 ring-[var(--color-evergreen)]/20"
                    : "text-[var(--color-evergreen)]/40"
                }`}
              >
                <span className="font-mono">03</span>
                <span className="hidden sm:inline">Declarations</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 0: CONCEPT VC INSPIRED STAKEHOLDER PORTAL HERO & CARDS               */}
        {/* ========================================================================= */}
        {step === 0 && (
          <FadeIn direction="up">
            {/* Bold Editorial Top Hero */}
            <div className="mb-20 sm:mb-24 md:mb-28 lg:mb-32 max-w-4xl">
              <h1 className="font-[var(--font-asul)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-evergreen)] leading-[1.08] mb-6">
                Work with the YEIB{" "}
                <span className="text-[var(--color-tiger-orange)] italic font-serif">Investment Fund</span>
              </h1>

              <p className="text-base sm:text-lg text-[var(--color-evergreen)]/80 leading-relaxed font-normal mb-8 max-w-3xl">
                Providing patient capital, risk-sharing, and capacity support to growth-oriented, youth-led businesses across Nigeria. Select the option that best describes you to start your initial screening.
              </p>

              {/* Accessible Trust & Process Indicators */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-evergreen)]/80">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[var(--color-evergreen)]/10 font-semibold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-mint-leaf)]" />
                  <span>Takes ~5 minutes</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[var(--color-evergreen)]/10 font-semibold shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-mint-leaf)]" />
                  <span>Zero application fees</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[var(--color-evergreen)]/10 font-semibold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-tiger-orange)]" />
                  <span>Direct submission • No intermediaries</span>
                </div>
              </div>
            </div>

            {/* Concept.vc High-Contrast Interactive Cards Grid */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-evergreen)]/15">
                <div>
                  <h2 className="font-[var(--font-asul)] text-2xl sm:text-3xl font-bold text-[var(--color-evergreen)]">
                    Select your stakeholder group
                  </h2>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-evergreen)]/50">
                  06 Target Windows Available
                </span>
              </div>

              {/* The 6 Concept.vc Style High-Contrast Cards (White Fill with Orange Hover) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {STAKEHOLDER_GROUPS.map((group) => {
                  const meta = STAKEHOLDER_META[group.formNumber];

                  return (
                    <motion.div
                      key={group.id}
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      onClick={() => handleSelectGroup(group)}
                      className="group relative rounded-3xl p-8 md:p-9 cursor-pointer flex flex-col justify-between min-h-[380px] transition-all duration-300 bg-white text-[var(--color-evergreen)] border border-[var(--color-evergreen)]/15 shadow-[0_15px_35px_-10px_rgba(0,49,36,0.06)] hover:bg-[var(--color-tiger-orange)] hover:border-[var(--color-tiger-orange)] hover:shadow-[0_22px_45px_-10px_rgba(248,132,4,0.35)]"
                    >
                      {/* Top Row: Track Pill & Diagonal Arrow */}
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-8">
                          <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-[var(--color-evergreen)]/5 text-[var(--color-tiger-orange)] group-hover:bg-white/20 group-hover:text-white transition-colors">
                            {meta.trackPill}
                          </span>

                          {/* Distinctive Top-Right Diagonal Arrow */}
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 bg-[var(--color-mint-cream)] text-[var(--color-evergreen)] group-hover:bg-white group-hover:text-[var(--color-tiger-orange)] shadow-xs">
                            <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-[var(--font-asul)] text-2xl sm:text-3xl font-bold tracking-tight mb-4 leading-snug text-[var(--color-evergreen)] group-hover:text-white transition-colors">
                          {group.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm leading-relaxed font-normal mb-8 text-[var(--color-evergreen)]/75 group-hover:text-white/95 transition-colors">
                          {meta.subheading}
                        </p>
                      </div>

                      {/* Bottom Footer: Feature Badges & Apply Trigger */}
                      <div className="pt-6 border-t border-[var(--color-evergreen)]/10 group-hover:border-white/20 transition-colors">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {meta.badges.map((badge) => (
                            <span
                              key={badge}
                              className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md bg-[var(--color-mint-cream)] text-[var(--color-evergreen)]/80 border border-[var(--color-evergreen)]/10 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/20 transition-colors"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--color-evergreen)] group-hover:text-white transition-colors">
                          <span>Start Screening</span>
                          <span className="font-mono text-sm transform group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        )}

        {/* ========================================================================= */}
        {/* STEP 1: SECTION A (CONTACT DETAILS)                                       */}
        {/* ========================================================================= */}
        {step === 1 && selectedGroup && (
          <FadeIn direction="up">
            <div className="bg-white rounded-3xl p-8 sm:p-14 shadow-[0_20px_50px_-15px_rgba(0,49,36,0.06)] border border-[var(--color-evergreen)]/10 max-w-4xl mx-auto">
              <div className="mb-10 pb-6 border-b border-[var(--color-evergreen)]/10">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-tiger-orange)] block mb-2">
                  Section A • Common Intake
                </span>
                <h2 className="font-[var(--font-asul)] text-3xl sm:text-4xl font-bold text-[var(--color-evergreen)]">
                  Contact & Organisation Details
                </h2>
                <p className="text-sm text-[var(--color-evergreen)]/70 mt-2">
                  This baseline information allows the YEIB screening team to authenticate and route your submission across the appropriate window.
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-evergreen)]/80 mb-2">
                      A.1 Full Name *
                    </label>
                    <input
                      type="text"
                      value={contact.fullName}
                      onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
                      placeholder="e.g. Amina Mohammed"
                      className="w-full bg-[var(--color-mint-cream)] border border-[var(--color-evergreen)]/15 focus:border-[var(--color-tiger-orange)] p-4 text-sm focus:outline-none transition-colors rounded-2xl"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-evergreen)]/80 mb-2">
                      A.2 Name of Business or Organisation *
                    </label>
                    <input
                      type="text"
                      value={contact.organizationName}
                      onChange={(e) => setContact({ ...contact, organizationName: e.target.value })}
                      placeholder="e.g. Sahel Ventures Ltd."
                      className="w-full bg-[var(--color-mint-cream)] border border-[var(--color-evergreen)]/15 focus:border-[var(--color-tiger-orange)] p-4 text-sm focus:outline-none transition-colors rounded-2xl"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-evergreen)]/80 mb-2">
                      A.3 Your Role or Title *
                    </label>
                    <input
                      type="text"
                      value={contact.role}
                      onChange={(e) => setContact({ ...contact, role: e.target.value })}
                      placeholder="e.g. Managing Director / Founder"
                      className="w-full bg-[var(--color-mint-cream)] border border-[var(--color-evergreen)]/15 focus:border-[var(--color-tiger-orange)] p-4 text-sm focus:outline-none transition-colors rounded-2xl"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-evergreen)]/80 mb-2">
                      A.4 Email Address *
                    </label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      placeholder="contact@organisation.com"
                      className="w-full bg-[var(--color-mint-cream)] border border-[var(--color-evergreen)]/15 focus:border-[var(--color-tiger-orange)] p-4 text-sm focus:outline-none transition-colors rounded-2xl"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-evergreen)]/80 mb-2">
                      A.5 Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      placeholder="+234 800 000 0000"
                      className="w-full bg-[var(--color-mint-cream)] border border-[var(--color-evergreen)]/15 focus:border-[var(--color-tiger-orange)] p-4 text-sm focus:outline-none transition-colors rounded-2xl"
                      required
                    />
                    <span className="text-[11px] text-[var(--color-evergreen)]/60 mt-1 block">
                      Include country code (e.g. +234).
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-evergreen)]/80 mb-2">
                      A.6 Headquartered State *
                    </label>
                    <select
                      value={contact.state}
                      onChange={(e) => setContact({ ...contact, state: e.target.value })}
                      className="w-full bg-[var(--color-mint-cream)] border border-[var(--color-evergreen)]/15 focus:border-[var(--color-tiger-orange)] p-4 text-sm focus:outline-none transition-colors rounded-2xl"
                      required
                    >
                      <option value="">Select state or jurisdiction...</option>
                      {NIGERIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-evergreen)]/80 mb-2">
                      A.7 Website or LinkedIn Page (Optional)
                    </label>
                    <input
                      type="url"
                      value={contact.websiteOrLinkedIn}
                      onChange={(e) => setContact({ ...contact, websiteOrLinkedIn: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-[var(--color-mint-cream)] border border-[var(--color-evergreen)]/15 focus:border-[var(--color-tiger-orange)] p-4 text-sm focus:outline-none transition-colors rounded-2xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-evergreen)]/80 mb-2">
                      A.8 How Did You Hear About Us? (Optional)
                    </label>
                    <select
                      value={contact.referralSource}
                      onChange={(e) => setContact({ ...contact, referralSource: e.target.value })}
                      className="w-full bg-[var(--color-mint-cream)] border border-[var(--color-evergreen)]/15 focus:border-[var(--color-tiger-orange)] p-4 text-sm focus:outline-none transition-colors rounded-2xl"
                    >
                      <option value="">Select channel...</option>
                      <option value="Referral">Referral</option>
                      <option value="Event or conference">Event or conference</option>
                      <option value="Social media">Social media</option>
                      <option value="News or press">News or press</option>
                      <option value="Partner organisation (please specify)">Partner organisation (please specify)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="pt-8 border-t border-[var(--color-evergreen)]/10 flex justify-end">
                  <Button
                    type="button"
                    disabled={!canProceedFromSectionA()}
                    onClick={() => {
                      setStep(2);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-[var(--color-evergreen)] hover:bg-[var(--color-evergreen)]/90 text-white rounded-2xl py-4 px-8 text-xs font-bold uppercase tracking-widest flex items-center gap-2 disabled:opacity-40"
                  >
                    <span>Proceed to Screening Questions</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: SECTION B (FORM SCREENING QUESTIONS)                              */}
        {/* ========================================================================= */}
        {step === 2 && selectedGroup && (
          <FadeIn direction="up">
            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Concept VC Styled Group Briefing Banner */}
              <div className="bg-[var(--color-evergreen)] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-white/10 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[var(--color-mint-leaf)] text-xs font-mono font-bold uppercase tracking-wider mb-4">
                    <span>Focus Overview • Form 0{selectedGroup.formNumber}</span>
                  </div>
                  <h3 className="font-[var(--font-asul)] text-2xl sm:text-3xl font-bold mb-3">
                    {selectedGroup.name}
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed font-normal">
                    {selectedGroup.introCopy}
                  </p>
                </div>
              </div>

              {/* Dynamic Questions Form Card */}
              <div className="bg-white rounded-3xl p-8 sm:p-14 shadow-[0_20px_50px_-15px_rgba(0,49,36,0.06)] border border-[var(--color-evergreen)]/10 space-y-10">
                {FORMS_BY_NUMBER[selectedGroup.formNumber]?.map((q: FormQuestion) => {
                  // Check conditional display
                  if (q.condition && !q.condition(responses)) {
                    return null;
                  }

                  const currentVal = responses[q.id];

                  return (
                    <div
                      key={q.id}
                      className="border-b border-[var(--color-evergreen)]/10 pb-8 last:border-b-0 last:pb-0"
                    >
                      <div className="mb-3">
                        <label className="block text-base font-bold text-[var(--color-evergreen)] leading-snug">
                          <span className="text-[var(--color-tiger-orange)] font-mono mr-2">{q.ref}</span>
                          {q.label} {q.required && <span className="text-[var(--color-tiger-orange)]">*</span>}
                        </label>
                        {q.helpText && (
                          <span className="text-xs text-[var(--color-evergreen)]/60 italic mt-1 block">
                            {q.helpText}
                          </span>
                        )}
                      </div>

                      {/* 1. Single Select Options */}
                      {q.type === "select" && q.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                          {q.options.map((opt) => {
                            const isSelected = currentVal === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setResponses({ ...responses, [q.id]: opt })}
                                className={`text-left p-4 rounded-2xl border text-sm font-medium transition-all ${
                                  isSelected
                                    ? "bg-[var(--color-evergreen)] text-white border-[var(--color-evergreen)] shadow-md"
                                    : "bg-[var(--color-mint-cream)] text-[var(--color-evergreen)] border-[var(--color-evergreen)]/15 hover:border-[var(--color-tiger-orange)]"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* 2. Multi-Select Options */}
                      {q.type === "multi-select" && q.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                          {q.options.map((opt) => {
                            const selectedList = Array.isArray(currentVal) ? currentVal : [];
                            const isSelected = selectedList.includes(opt);

                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  let updated: string[];
                                  if (isSelected) {
                                    updated = selectedList.filter((item) => item !== opt);
                                  } else {
                                    if (q.maxSelect && selectedList.length >= q.maxSelect) {
                                      return; // Enforce max select
                                    }
                                    updated = [...selectedList, opt];
                                  }
                                  setResponses({ ...responses, [q.id]: updated });
                                }}
                                className={`text-left p-4 rounded-2xl border text-sm font-medium transition-all flex items-start justify-between gap-3 ${
                                  isSelected
                                    ? "bg-[var(--color-evergreen)] text-white border-[var(--color-evergreen)] shadow-md"
                                    : "bg-[var(--color-mint-cream)] text-[var(--color-evergreen)] border-[var(--color-evergreen)]/15 hover:border-[var(--color-tiger-orange)]"
                                }`}
                              >
                                <span>{opt}</span>
                                {isSelected && <Check className="w-4 h-4 shrink-0 text-[var(--color-mint-leaf)] mt-0.5" />}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* 3. Text & Year Inputs */}
                      {(q.type === "text" || q.type === "year") && (
                        <input
                          type={q.type === "year" ? "number" : "text"}
                          value={(currentVal as string) || ""}
                          placeholder={q.placeholder || "Enter response..."}
                          onChange={(e) => setResponses({ ...responses, [q.id]: e.target.value })}
                          className="w-full bg-[var(--color-mint-cream)] border border-[var(--color-evergreen)]/15 focus:border-[var(--color-tiger-orange)] p-4 text-sm focus:outline-none transition-colors rounded-2xl mt-3"
                        />
                      )}

                      {/* 4. Dropdown Input */}
                      {q.type === "dropdown" && q.options && (
                        <select
                          value={(currentVal as string) || ""}
                          onChange={(e) => setResponses({ ...responses, [q.id]: e.target.value })}
                          className="w-full bg-[var(--color-mint-cream)] border border-[var(--color-evergreen)]/15 focus:border-[var(--color-tiger-orange)] p-4 text-sm focus:outline-none transition-colors rounded-2xl mt-3"
                        >
                          <option value="">Select option...</option>
                          {q.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* 5. Textarea with live Word Counter */}
                      {q.type === "textarea" && (
                        <div className="mt-3">
                          <textarea
                            rows={4}
                            value={(currentVal as string) || ""}
                            placeholder={q.placeholder || "Provide concise details..."}
                            onChange={(e) => setResponses({ ...responses, [q.id]: e.target.value })}
                            className="w-full bg-[var(--color-mint-cream)] border border-[var(--color-evergreen)]/15 focus:border-[var(--color-tiger-orange)] p-4 text-sm focus:outline-none transition-colors rounded-2xl resize-none"
                          />
                          {q.maxWords && (
                            <div className="flex justify-between items-center text-xs mt-2 px-1">
                              <span
                                className={`font-mono ${
                                  countWords((currentVal as string) || "") > q.maxWords
                                    ? "text-red-600 font-bold"
                                    : "text-[var(--color-evergreen)]/60"
                                }`}
                              >
                                {countWords((currentVal as string) || "")} / {q.maxWords} words max
                              </span>
                              {countWords((currentVal as string) || "") > q.maxWords && (
                                <span className="text-red-600 text-xs font-bold">Word limit exceeded</span>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* 6. Form 2 Dual Currency Component (2.6) */}
                      {q.type === "currency-dual" && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3 bg-[var(--color-mint-cream)] p-5 rounded-2xl border border-[var(--color-evergreen)]/15">
                          <div>
                            <label className="block text-xs font-bold uppercase text-[var(--color-evergreen)]/70 mb-1.5">
                              Currency
                            </label>
                            <select
                              value={currencyForm2}
                              onChange={(e) => setCurrencyForm2(e.target.value as "₦" | "US$")}
                              className="w-full bg-white border border-[var(--color-evergreen)]/20 p-3.5 text-sm rounded-xl font-medium"
                            >
                              <option value="₦">Naira (₦)</option>
                              <option value="US$">US Dollar (US$)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-[var(--color-evergreen)]/70 mb-1.5">
                              Target Fund Size *
                            </label>
                            <input
                              type="text"
                              value={targetSizeForm2}
                              onChange={(e) => setTargetSizeForm2(e.target.value)}
                              placeholder="e.g. 10,000,000,000"
                              className="w-full bg-white border border-[var(--color-evergreen)]/20 p-3.5 text-sm rounded-xl"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-[var(--color-evergreen)]/70 mb-1.5">
                              Committed to Date *
                            </label>
                            <input
                              type="text"
                              value={committedForm2}
                              onChange={(e) => setCommittedForm2(e.target.value)}
                              placeholder="e.g. 3,500,000,000"
                              className="w-full bg-white border border-[var(--color-evergreen)]/20 p-3.5 text-sm rounded-xl"
                            />
                          </div>
                        </div>
                      )}

                      {/* 7. Form 4 Two-Selects Component (4.7) */}
                      {q.type === "two-selects" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 bg-[var(--color-mint-cream)] p-5 rounded-2xl border border-[var(--color-evergreen)]/15">
                          <div>
                            <label className="block text-xs font-bold uppercase text-[var(--color-evergreen)]/70 mb-1.5">
                              Youth-Led Share *
                            </label>
                            <select
                              value={youthLedShare}
                              onChange={(e) => setYouthLedShare(e.target.value)}
                              className="w-full bg-white border border-[var(--color-evergreen)]/20 p-3.5 text-sm rounded-xl font-medium"
                            >
                              <option value="">Select range...</option>
                              <option value="Below 25%">Below 25%</option>
                              <option value="25% to 50%">25% to 50%</option>
                              <option value="Above 50%">Above 50%</option>
                              <option value="Not tracked">Not tracked</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-[var(--color-evergreen)]/70 mb-1.5">
                              Women-Led Share *
                            </label>
                            <select
                              value={womenLedShare}
                              onChange={(e) => setWomenLedShare(e.target.value)}
                              className="w-full bg-white border border-[var(--color-evergreen)]/20 p-3.5 text-sm rounded-xl font-medium"
                            >
                              <option value="">Select range...</option>
                              <option value="Below 25%">Below 25%</option>
                              <option value="25% to 50%">25% to 50%</option>
                              <option value="Above 50%">Above 50%</option>
                              <option value="Not tracked">Not tracked</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* 8. PDF File Upload */}
                      {q.type === "file" && (
                        <div className="mt-3 p-6 border-2 border-dashed border-[var(--color-evergreen)]/20 rounded-2xl bg-[var(--color-mint-cream)] text-center">
                          <FileCheck className="w-8 h-8 text-[var(--color-evergreen)]/40 mx-auto mb-2" />
                          <label className="inline-block cursor-pointer bg-white px-5 py-2.5 rounded-xl border border-[var(--color-evergreen)]/20 text-xs font-bold uppercase tracking-wider text-[var(--color-evergreen)] hover:border-[var(--color-tiger-orange)] transition-colors shadow-sm">
                            <span>Select PDF File</span>
                            <input
                              type="file"
                              accept="application/pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (file.size > 10 * 1024 * 1024) {
                                    alert("File exceeds maximum limit of 10 MB.");
                                    return;
                                  }
                                  setResponses({
                                    ...responses,
                                    [q.id]: `Attached: ${file.name} (${Math.round(file.size / 1024)} KB)`,
                                  });
                                }
                              }}
                            />
                          </label>
                          <span className="block text-xs text-[var(--color-evergreen)]/60 mt-2 font-mono">
                            {(currentVal as string) || "PDF only • 10 MB limit • Optional"}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="pt-8 border-t border-[var(--color-evergreen)]/10 flex justify-between items-center">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setStep(1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-transparent border border-[var(--color-evergreen)]/20 text-[var(--color-evergreen)] rounded-2xl py-3 px-6 text-xs font-bold uppercase tracking-widest"
                  >
                    Back to Section A
                  </Button>

                  <Button
                    type="button"
                    disabled={!canProceedFromSectionB()}
                    onClick={() => {
                      setStep(3);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-[var(--color-evergreen)] hover:bg-[var(--color-evergreen)]/90 text-white rounded-2xl py-4 px-8 text-xs font-bold uppercase tracking-widest flex items-center gap-2 disabled:opacity-40"
                  >
                    <span>Proceed to Declarations</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: SECTION C (DECLARATIONS & CONSENT)                                 */}
        {/* ========================================================================= */}
        {step === 3 && selectedGroup && (
          <FadeIn direction="up">
            <form onSubmit={handleSubmitFinal} className="max-w-4xl mx-auto">
              {/* Anti-spam honeypot */}
              <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="bg-white rounded-3xl p-8 sm:p-14 shadow-[0_20px_50px_-15px_rgba(0,49,36,0.06)] border border-[var(--color-evergreen)]/10">
                <div className="mb-10 pb-6 border-b border-[var(--color-evergreen)]/10">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-tiger-orange)] block mb-2">
                    Section C • Final Consent
                  </span>
                  <h2 className="font-[var(--font-asul)] text-3xl sm:text-4xl font-bold text-[var(--color-evergreen)]">
                    Declarations & Legal Acknowledgements
                  </h2>
                  <p className="text-sm text-[var(--color-evergreen)]/70 mt-2">
                    Please confirm the statutory declarations under the Nigeria Data Protection Act (NDPA 2023) to finalize your submission.
                  </p>
                </div>

                {status === "error" && (
                  <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-xs sm:text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{errorMessage || "Submission error. Please ensure all declarations are checked."}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* C.1 */}
                  <label className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-mint-cream)] border border-[var(--color-evergreen)]/10 cursor-pointer hover:border-[var(--color-evergreen)]/30 transition-colors">
                    <input
                      type="checkbox"
                      checked={declarations.accuracyConfirmed}
                      onChange={(e) =>
                        setDeclarations({ ...declarations, accuracyConfirmed: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 accent-[var(--color-evergreen)] rounded"
                      required
                    />
                    <div className="text-xs sm:text-sm text-[var(--color-evergreen)] leading-relaxed">
                      <strong className="font-bold block mb-1">C.1 Accuracy Declaration *</strong>
                      I confirm that the information I have provided is accurate and complete to the best of my knowledge.
                    </div>
                  </label>

                  {/* C.2 */}
                  <label className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-mint-cream)] border border-[var(--color-evergreen)]/10 cursor-pointer hover:border-[var(--color-evergreen)]/30 transition-colors">
                    <input
                      type="checkbox"
                      checked={declarations.nonBindingAcknowledged}
                      onChange={(e) =>
                        setDeclarations({ ...declarations, nonBindingAcknowledged: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 accent-[var(--color-evergreen)] rounded"
                      required
                    />
                    <div className="text-xs sm:text-sm text-[var(--color-evergreen)] leading-relaxed">
                      <strong className="font-bold block mb-1">C.2 Non-Binding Submission *</strong>
                      I understand that this submission is not an application for, or an offer of, financing, and that the YEIB Investment Fund is under no obligation to proceed.
                    </div>
                  </label>

                  {/* C.3 */}
                  <label className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-mint-cream)] border border-[var(--color-evergreen)]/10 cursor-pointer hover:border-[var(--color-evergreen)]/30 transition-colors">
                    <input
                      type="checkbox"
                      checked={declarations.privacyConsent}
                      onChange={(e) =>
                        setDeclarations({ ...declarations, privacyConsent: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 accent-[var(--color-evergreen)] rounded"
                      required
                    />
                    <div className="text-xs sm:text-sm text-[var(--color-evergreen)] leading-relaxed">
                      <strong className="font-bold block mb-1">C.3 NDPA 2023 Data Protection Consent *</strong>
                      I consent to the YEIB Investment Fund processing the personal data in this form in accordance with the Nigeria Data Protection Act 2023 and its{" "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPrivacyModal(true);
                        }}
                        className="text-[var(--color-tiger-orange)] underline font-bold"
                      >
                        privacy notice
                      </button>
                      .
                    </div>
                  </label>

                  {/* C.4 Conditional on Form 1 Equity */}
                  {isForm1Equity() && (
                    <label className="flex items-start gap-4 p-5 rounded-2xl bg-orange-50/60 border border-[var(--color-tiger-orange)]/30 cursor-pointer hover:border-[var(--color-tiger-orange)] transition-colors">
                      <input
                        type="checkbox"
                        checked={declarations.exclusionListConfirmed}
                        onChange={(e) =>
                          setDeclarations({ ...declarations, exclusionListConfirmed: e.target.checked })
                        }
                        className="mt-1 w-4 h-4 accent-[var(--color-tiger-orange)] rounded"
                        required
                      />
                      <div className="text-xs sm:text-sm text-[var(--color-evergreen)] leading-relaxed">
                        <strong className="font-bold block mb-1 text-[var(--color-tiger-orange)]">
                          C.4 YEIB Exclusion List Compliance *
                        </strong>
                        I confirm that my business is not engaged in any activity on the{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowExclusionModal(true);
                          }}
                          className="text-[var(--color-tiger-orange)] underline font-bold"
                        >
                          YEIB Exclusion List
                        </button>
                        .
                      </div>
                    </label>
                  )}

                  {/* C.5 Optional */}
                  <label className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[var(--color-evergreen)]/10 cursor-pointer hover:border-[var(--color-evergreen)]/20 transition-colors">
                    <input
                      type="checkbox"
                      checked={declarations.shareWithPartnersConsent}
                      onChange={(e) =>
                        setDeclarations({ ...declarations, shareWithPartnersConsent: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 accent-[var(--color-evergreen)] rounded"
                    />
                    <div className="text-xs sm:text-sm text-[var(--color-evergreen)]/80 leading-relaxed">
                      <strong className="font-bold block mb-1 text-[var(--color-evergreen)]">
                        C.5 Partner Sharing (Optional)
                      </strong>
                      I agree that my submission may be shared, where relevant, with partner fund managers, participating lenders, Impact Credit Guarantee Limited or vetted service providers, so that I can be considered for their support.
                    </div>
                  </label>

                  {/* C.6 Optional */}
                  <label className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[var(--color-evergreen)]/10 cursor-pointer hover:border-[var(--color-evergreen)]/20 transition-colors">
                    <input
                      type="checkbox"
                      checked={declarations.receiveUpdatesConsent}
                      onChange={(e) =>
                        setDeclarations({ ...declarations, receiveUpdatesConsent: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 accent-[var(--color-evergreen)] rounded"
                    />
                    <div className="text-xs sm:text-sm text-[var(--color-evergreen)]/80 leading-relaxed">
                      <strong className="font-bold block mb-1 text-[var(--color-evergreen)]">
                        C.6 Communications (Optional)
                      </strong>
                      I would like to receive programmatic updates and notifications from the YEIB Investment Fund.
                    </div>
                  </label>
                </div>

                <div className="pt-10 border-t border-[var(--color-evergreen)]/10 flex justify-between items-center mt-10">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setStep(2);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-transparent border border-[var(--color-evergreen)]/20 text-[var(--color-evergreen)] rounded-2xl py-3 px-6 text-xs font-bold uppercase tracking-widest"
                  >
                    Back to Questions
                  </Button>

                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="bg-[var(--color-tiger-orange)] hover:bg-orange-600 text-white rounded-2xl py-4 px-9 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Intake...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </FadeIn>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: CONFIRMATION & REFERENCE NUMBER CARD                              */}
        {/* ========================================================================= */}
        {step === 4 && (
          <FadeIn direction="up">
            <div className="bg-white rounded-3xl p-8 sm:p-14 shadow-[0_20px_50px_-15px_rgba(0,49,36,0.08)] border border-[var(--color-evergreen)]/10 max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--color-mint-cream)] border-2 border-[var(--color-mint-leaf)] flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[var(--color-mint-leaf)]" />
              </div>

              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-mint-leaf)] block mb-2">
                Submission Successfully Registered
              </span>
              <h2 className="font-[var(--font-asul)] text-3xl sm:text-4xl font-bold text-[var(--color-evergreen)] mb-4">
                Thank you for applying.
              </h2>
              <p className="text-sm text-[var(--color-evergreen)]/80 leading-relaxed max-w-lg mx-auto mb-8">
                Your initial screening response has been logged into the YEIB Investment Fund evaluation pipeline.
              </p>

              {/* High-Impact Fintech Reference Code Card */}
              <div className="bg-[var(--color-evergreen)] text-white p-7 rounded-3xl mb-8 relative border border-white/10 shadow-xl">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--color-mint-leaf)] block mb-2">
                  Official Application Reference Code
                </span>
                <div className="flex items-center justify-center gap-3 my-2">
                  <span className="font-mono text-2xl sm:text-3xl font-bold tracking-wider text-white">
                    {referenceNumber}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyReference}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                    title="Copy Reference Number"
                  >
                    {copiedRef ? <Check size={18} className="text-[var(--color-mint-leaf)]" /> : <Copy size={18} />}
                  </button>
                </div>
                <p className="text-xs text-[#E1C9B3] mt-2">
                  Please quote this reference in any future correspondence with the Fund.
                </p>
              </div>

              {/* Next Steps & Anti-Fraud Notice */}
              <div className="text-left bg-[var(--color-mint-cream)] p-6 rounded-2xl border border-[var(--color-evergreen)]/10 text-xs sm:text-sm text-[var(--color-evergreen)] space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[var(--color-evergreen)] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Submissions are appraised on a rolling basis. Our investment and capacity team aims to respond within <strong>5 to 10 working days</strong>. If your submission proceeds past initial screening, we will request formal documentation.
                  </p>
                </div>

                <div className="border-t border-[var(--color-evergreen)]/10 pt-4">
                  <p className="text-xs text-[var(--color-tiger-orange)] font-semibold leading-relaxed">
                    <strong>Notice:</strong> The YEIB Investment Fund never charges a fee to apply and does not work through agents who charge for access. Report any payment solicitation to <strong>fraud-report@yeib-manco.com.ng</strong>.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setStep(0);
                    setSelectedGroup(null);
                    setResponses({});
                    setDeclarations({
                      accuracyConfirmed: false,
                      nonBindingAcknowledged: false,
                      privacyConsent: false,
                      exclusionListConfirmed: false,
                      shareWithPartnersConsent: false,
                      receiveUpdatesConsent: false,
                    });
                    setStatus("idle");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto bg-transparent border border-[var(--color-evergreen)]/20 text-[var(--color-evergreen)] rounded-2xl py-4 px-8 text-xs font-bold uppercase tracking-widest"
                >
                  Submit Another Inquiry
                </Button>
                <Button
                  type="button"
                  onClick={() => router.push("/")}
                  className="w-full sm:w-auto bg-[var(--color-evergreen)] hover:bg-[var(--color-evergreen)]/90 text-white rounded-2xl py-4 px-8 text-xs font-bold uppercase tracking-widest"
                >
                  Return to Home
                </Button>
              </div>
            </div>
          </FadeIn>
        )}
      </div>

      {/* Modal: NDPA 2023 Privacy Notice */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-evergreen)]/90 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 max-h-[85vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="font-[var(--font-asul)] text-2xl font-bold text-[var(--color-evergreen)] mb-3">
              Data Protection & Privacy Notice
            </h3>
            <div className="text-xs sm:text-sm text-[var(--color-evergreen)]/80 space-y-3 leading-relaxed">
              <p>
                In compliance with the <strong>Nigeria Data Protection Act (NDPA) 2023</strong>, the YEIB Investment Fund collects and processes personal information solely for assessing eligibility, initial screening, and administering investment and capacity-building programs.
              </p>
              <p>
                Your personal and corporate data is secured using enterprise-grade encryption. Data is retained for the evaluation period and will not be disclosed to unauthorised third parties without your prior written consent, except where sharing is explicitly authorised with our co-investment partners, Impact Credit Guarantee Limited (ICGL), and vetted business development service providers.
              </p>
              <p>
                You retain statutory rights to request access, rectification, or deletion of your personal records by contacting <strong>privacy@yeib-manco.com.ng</strong>.
              </p>
            </div>
            <div className="mt-6 text-right">
              <Button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="bg-[var(--color-evergreen)] text-white text-xs uppercase tracking-wider py-3 px-6 rounded-xl"
              >
                Understood
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: YEIB Exclusion List */}
      {showExclusionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-evergreen)]/90 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 max-h-[85vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setShowExclusionModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="font-[var(--font-asul)] text-2xl font-bold text-[var(--color-evergreen)] mb-3">
              YEIB Environmental & Social Exclusion List
            </h3>
            <p className="text-xs text-[var(--color-evergreen)]/70 mb-4">
              In accordance with our statutory ESG and impact covenants, the YEIB Investment Fund does not finance or commit capital to entities engaged in:
            </p>
            <ul className="text-xs sm:text-sm text-[var(--color-evergreen)]/80 space-y-2 list-disc pl-5 leading-relaxed">
              <li>Production or trade in any product or activity deemed illegal under Nigerian law or international conventions.</li>
              <li>Production or trade in weapons, munitions, and military armaments.</li>
              <li>Production or trade in tobacco and unbonded distilled spirits.</li>
              <li>Gambling, casinos, and equivalent wagering operations.</li>
              <li>Production or trade in radioactive materials, unbounded asbestos fibers, or hazardous chemicals.</li>
              <li>Commercial logging operations or purchase of logging equipment for use in primary tropical moist forest.</li>
              <li>Activities involving any form of forced labor, harmful child labor, or human rights infringements.</li>
            </ul>
            <div className="mt-6 text-right">
              <Button
                type="button"
                onClick={() => setShowExclusionModal(false)}
                className="bg-[var(--color-evergreen)] text-white text-xs uppercase tracking-wider py-3 px-6 rounded-xl"
              >
                Close Notice
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
