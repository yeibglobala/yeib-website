"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { MapPin, Mail, Phone, ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { submitPartnershipAction } from "@/lib/email/actions";

export function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    workEmail: "",
    partnerType: "",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await submitPartnershipAction(formData);
      if (res.success) {
        setStatus("success");
        setFormData({
          fullName: "",
          organization: "",
          workEmail: "",
          partnerType: "",
          message: "",
          honeypot: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(res.message || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("A network error occurred. Please try again.");
    }
  };
  return (
    <section className="bg-[var(--color-mint-cream)] text-[var(--color-evergreen)] min-h-screen pt-40 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn direction="up">
          <div className="mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[var(--color-tiger-orange)] text-[var(--color-tiger-orange)] text-xs font-bold tracking-widest capitalize mb-6">
              Get in Touch
            </div>
            <h1 className="font-asul text-4xl md:text-6xl font-bold mb-6 capitalize tracking-tight">
              Contact <span className="text-[var(--color-tiger-orange)]">Us</span>.
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-evergreen)]/80 max-w-2xl font-medium">
              We are actively exploring partnerships with DFIs, commercial lenders, and enterprise support organizations.
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="w-full h-[250px] md:h-[300px] relative rounded-3xl overflow-hidden mb-12 shadow-sm border border-[var(--color-evergreen)]/10 bg-gray-100">
            <iframe 
              src="https://maps.google.com/maps?q=Garki,%20Abuja,%20Nigeria&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="YEIB Office Location in Garki, Abuja"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5 flex flex-col gap-10">
            <FadeIn direction="up" delay={0.2}>
              <div className="bg-white rounded-2xl p-8 border border-[var(--color-evergreen)]/10 shadow-sm h-full flex flex-col gap-8">
                <h2 className="font-asul text-3xl font-bold">Office & Contact</h2>
                
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-mint-cream)] flex items-center justify-center flex-shrink-0 text-[var(--color-evergreen)]">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Headquarters</h3>
                      <p className="text-[var(--color-evergreen)]/70">
                        12 Innovation Drive, <br />
                        Abuja, Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-mint-cream)] flex items-center justify-center flex-shrink-0 text-[var(--color-evergreen)]">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email</h3>
                      <p className="text-[var(--color-evergreen)]/70">
                        partners@yeib.gov.ng <br />
                        info@yeib.gov.ng
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-mint-cream)] flex items-center justify-center flex-shrink-0 text-[var(--color-evergreen)]">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Phone</h3>
                      <p className="text-[var(--color-evergreen)]/70">
                        +234 (0) 800 000 YEIB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn direction="up" delay={0.3}>
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-[var(--color-evergreen)]/10 shadow-sm">
                <h2 className="font-asul text-3xl font-bold mb-2">Partner with YEIB</h2>
                <p className="text-[var(--color-evergreen)]/70 mb-8 font-medium">
                  Use the form below to initiate a partnership discussion. 
                </p>
                
                {status === "success" ? (
                  <div className="py-12 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[var(--color-mint-cream)] text-[var(--color-mint-leaf)] rounded-full flex items-center justify-center mb-6 border border-[var(--color-mint-leaf)]/30">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="font-asul text-2xl font-bold text-[var(--color-evergreen)] mb-3">
                      Partnership Inquiry Received
                    </h3>
                    <p className="text-[var(--color-evergreen)]/70 max-w-sm mb-6 text-sm leading-relaxed">
                      Thank you for initiating a partnership discussion. Our institutional relations team has received your message and will be in touch shortly.
                    </p>
                    <Button
                      onClick={() => setStatus("idle")}
                      className="bg-[var(--color-evergreen)] text-white hover:bg-[var(--color-evergreen)]/90"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
                      <div className="flex flex-col gap-2">
                        <label htmlFor="partnerName" className="font-bold text-sm">Full Name</label>
                        <input 
                          type="text" 
                          id="partnerName" 
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-1 focus:ring-[var(--color-tiger-orange)] bg-gray-50"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="partnerOrg" className="font-bold text-sm">Organization</label>
                        <input 
                          type="text" 
                          id="partnerOrg" 
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-1 focus:ring-[var(--color-tiger-orange)] bg-gray-50"
                          placeholder="Company or Institution name"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="partnerEmail" className="font-bold text-sm">Work Email</label>
                      <input 
                        type="email" 
                        id="partnerEmail" 
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-1 focus:ring-[var(--color-tiger-orange)] bg-gray-50"
                        placeholder="name@organization.com"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="partnerType" className="font-bold text-sm">Institution Type</label>
                      <select 
                        id="partnerType" 
                        value={formData.partnerType}
                        onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                        className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-1 focus:ring-[var(--color-tiger-orange)] bg-gray-50 cursor-pointer"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="dfi">Development Finance Institution (DFI)</option>
                        <option value="lender">Commercial Lender / Microfinance Institution</option>
                        <option value="eso">Enterprise Support Organization (ESO)</option>
                        <option value="fund">PE / VC Fund</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="partnerMessage" className="font-bold text-sm">Partnership Proposal / Message</label>
                      <textarea 
                        id="partnerMessage" 
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-tiger-orange)] focus:ring-1 focus:ring-[var(--color-tiger-orange)] bg-gray-50 resize-none"
                        placeholder="How would you like to collaborate with YEIB?"
                        required
                      ></textarea>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={status === "submitting"}
                      className="w-full mt-2 bg-[var(--color-tiger-orange)] hover:bg-[var(--color-tiger-orange)]/90 text-white flex items-center justify-center gap-2 group disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
