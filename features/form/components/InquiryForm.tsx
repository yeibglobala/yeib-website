"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { motion, Variants } from "framer-motion";
import { ArrowRight, MessageSquareText, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { submitGeneralInquiryAction } from "@/lib/email/actions";

export function InquiryForm({ initialType = "" }: { initialType?: string }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    inquiryType: initialType,
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await submitGeneralInquiryAction(formData);
      if (res.success) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          inquiryType: "",
          message: "",
          honeypot: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(res.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("A network error occurred. Please try again later.");
    }
  };

  return (
    <section className="bg-[var(--color-mint-cream)] text-[var(--color-evergreen)] min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-[var(--color-tiger-orange)]/5 rounded-bl-full -z-10 blur-3xl"></div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
              className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-[var(--color-evergreen)]/10 flex items-center justify-center mx-auto mb-6 text-[var(--color-tiger-orange)]"
            >
              <MessageSquareText size={28} />
            </motion.div>
            <h1 className="font-asul text-4xl md:text-5xl font-bold mb-6">
              General Inquiry
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-evergreen)]/80 max-w-2xl mx-auto">
              Have a question about YEIB Investment Fund? Send us a message and our dedicated team will get back to you promptly.
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={200}>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-[var(--color-evergreen)]/5">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-[var(--color-mint-cream)] text-[var(--color-mint-leaf)] rounded-full flex items-center justify-center mb-6 border border-[var(--color-mint-leaf)]/30">
                  <CheckCircle2 size={44} />
                </div>
                <h3 className="font-asul text-2xl md:text-3xl font-bold text-[var(--color-evergreen)] mb-3">
                  Inquiry Submitted Successfully
                </h3>
                <p className="text-[var(--color-evergreen)]/70 max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you for contacting us. A confirmation email has been dispatched to your address, and our team will follow up shortly.
                </p>
                <Button
                  onClick={() => setStatus("idle")}
                  className="bg-[var(--color-evergreen)] text-white hover:bg-[var(--color-evergreen)]/90"
                >
                  Send Another Inquiry
                </Button>
              </motion.div>
            ) : (
              <motion.form
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-8"
                onSubmit={handleSubmit}
              >
                {/* Anti-spam honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                />

                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
                    <AlertCircle size={20} className="flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants} className="flex flex-col gap-2 group">
                    <label htmlFor="firstName" className="font-semibold text-sm group-focus-within:text-[var(--color-tiger-orange)] transition-colors">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all"
                      placeholder="Enter your first name"
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex flex-col gap-2 group">
                    <label htmlFor="lastName" className="font-semibold text-sm group-focus-within:text-[var(--color-tiger-orange)] transition-colors">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all"
                      placeholder="Enter your last name"
                      required
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="flex flex-col gap-2 group">
                  <label htmlFor="email" className="font-semibold text-sm group-focus-within:text-[var(--color-tiger-orange)] transition-colors">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all"
                    placeholder="name@example.com"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col gap-2 group">
                  <label htmlFor="inquiryType" className="font-semibold text-sm group-focus-within:text-[var(--color-tiger-orange)] transition-colors">Inquiry Type</label>
                  <select
                    id="inquiryType"
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 text-base transition-all cursor-pointer"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="media">Media & Press</option>
                    <option value="general">General Question</option>
                    <option value="careers">Careers</option>
                    <option value="misconduct">Misconduct</option>
                    <option value="grievance">Grievance</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col gap-2 group">
                  <label htmlFor="message" className="font-semibold text-sm group-focus-within:text-[var(--color-tiger-orange)] transition-colors">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-2 focus:ring-[var(--color-tiger-orange)]/20 bg-gray-50 resize-none text-base transition-all"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "submitting"}
                    className="w-full mt-2 bg-[var(--color-evergreen)] hover:bg-[var(--color-evergreen)]/90 text-white rounded-xl py-6 flex items-center justify-center gap-2 group text-base overflow-hidden relative disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting Inquiry...
                      </>
                    ) : (
                      <>
                        Submit Inquiry <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
