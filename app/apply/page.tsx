import type { Metadata } from "next";
import { ApplySection } from "@/features/apply/components/ApplySection";

export const metadata: Metadata = {
  title: "Apply for Funding | YEIB Investment Fund",
  description: "Apply for youth and women-led MSME financing, equity, and ecosystem support through the YEIB Investment Fund.",
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-mint-cream)]">
      <ApplySection />
    </div>
  );
}
