import type { Metadata } from "next";
import { InquiryForm } from "@/features/form/components/InquiryForm";

export const metadata: Metadata = {
  title: "General Inquiry | YEIB Investment Fund",
  description: "Send an inquiry or question to the YEIB team regarding funding, partnerships, and ecosystem initiatives.",
};

export default function FormPage() {
  return (
    <div className="min-h-screen bg-[var(--color-mint-cream)]">
      <InquiryForm />
    </div>
  );
}
