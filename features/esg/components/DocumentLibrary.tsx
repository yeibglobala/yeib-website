"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Tag } from "@/components/ui/Tag";
import { FileText, Download, ChevronRight } from "lucide-react";

export function DocumentLibrary() {
  const [activeTab, setActiveTab] = useState<"reports" | "policies">("reports");

  const reports = [
    { title: "Annual Environmental and Social Report 2025", date: "Jan 2026", size: "2.4 MB" },
    { title: "Sustainability and Impact Report Q3", date: "Oct 2025", size: "1.8 MB" },
    { title: "Portfolio E&S Performance Report", date: "Aug 2025", size: "3.1 MB" },
    { title: "Stakeholder Engagement Summary", date: "Jun 2025", size: "1.2 MB" }
  ];

  const policies = [
    { title: "Environmental and Social Management System (ESMS)", type: "Public Framework", desc: "Core framework governing all environmental and social risk assessments." },
    { title: "Stakeholder Engagement Plan", type: "Public Framework", desc: "Guidelines for engaging beneficiaries and project-affected persons." },
    { title: "Grievance Redress Mechanism", type: "Public Policy", desc: "Standard operating procedures for logging and resolving concerns." },
    { title: "Internal Safeguards Framework", type: "Internal Document", desc: "Internal guidelines for protecting vulnerable persons across funded projects." }
  ];

  return (
    <section className="py-24 md:py-32 bg-white border-b border-[var(--color-pale-oak)]/20">
      <div className="container mx-auto px-4 max-w-5xl">
        <FadeIn direction="up" className="mb-12">
          <Tag variant="soft" className="mb-6">Disclosures</Tag>
          <h2 className="font-asul text-3xl md:text-5xl font-bold text-[var(--color-evergreen)] mb-6">
            Document Library
          </h2>
          <p className="text-lg text-[var(--color-evergreen)]/80 max-w-2xl">
            Access our public reports, ESG performance disclosures, and core sustainability policies.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={200}>
          {/* Tabs */}
          <div className="flex border-b border-[var(--color-pale-oak)]/30 mb-8">
            <button 
              onClick={() => setActiveTab("reports")}
              className={`pb-4 px-6 font-bold text-lg transition-colors border-b-2 ${activeTab === "reports" ? "border-[var(--color-tiger-orange)] text-[var(--color-tiger-orange)]" : "border-transparent text-[var(--color-evergreen)]/60 hover:text-[var(--color-evergreen)]"}`}
            >
              Reports & Disclosures
            </button>
            <button 
              onClick={() => setActiveTab("policies")}
              className={`pb-4 px-6 font-bold text-lg transition-colors border-b-2 ${activeTab === "policies" ? "border-[var(--color-tiger-orange)] text-[var(--color-tiger-orange)]" : "border-transparent text-[var(--color-evergreen)]/60 hover:text-[var(--color-evergreen)]"}`}
            >
              Policies & Procedures
            </button>
          </div>

          {/* List Content */}
          <div className="bg-[var(--color-pale-oak)]/5 rounded-2xl border border-[var(--color-pale-oak)]/20">
            
            {activeTab === "reports" && (
              <div className="flex flex-col divide-y divide-[var(--color-pale-oak)]/20">
                {reports.map((report, i) => (
                  <div key={i} className="flex items-center justify-between p-6 hover:bg-white transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-mint-cream)] flex items-center justify-center text-[var(--color-evergreen)] group-hover:bg-[var(--color-tiger-orange)] group-hover:text-white transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--color-evergreen)] text-lg group-hover:text-[var(--color-tiger-orange)] transition-colors">{report.title}</h4>
                        <p className="text-sm text-[var(--color-evergreen)]/60 mt-1">Published: {report.date} • PDF ({report.size})</p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-[var(--color-evergreen)] font-semibold group-hover:text-[var(--color-tiger-orange)] transition-colors">
                      Download <Download className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "policies" && (
              <div className="flex flex-col divide-y divide-[var(--color-pale-oak)]/20">
                {policies.map((policy, i) => (
                  <div key={i} className="flex items-center justify-between p-6 hover:bg-white transition-colors group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-mint-cream)] flex items-center justify-center text-[var(--color-evergreen)] mt-1 flex-shrink-0 group-hover:bg-[var(--color-tiger-orange)] group-hover:text-white transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--color-evergreen)] text-lg group-hover:text-[var(--color-tiger-orange)] transition-colors">{policy.title}</h4>
                        <p className="text-sm text-[var(--color-tiger-orange)] font-semibold mt-1 mb-2">{policy.type}</p>
                        <p className="text-sm text-[var(--color-evergreen)]/70">{policy.desc}</p>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <ChevronRight className="w-6 h-6 text-[var(--color-evergreen)]/30 group-hover:text-[var(--color-tiger-orange)] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
