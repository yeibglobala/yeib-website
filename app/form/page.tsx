import type { Metadata } from "next";
import { InquiryForm } from "@/features/form/components/InquiryForm";

export const metadata: Metadata = {
  title: "General Inquiry | YEIB Investment Fund",
  description: "Send an inquiry or question to the YEIB team regarding funding, partnerships, and ecosystem initiatives.",
};

const INQUIRY_TYPES = ["media", "general", "careers", "misconduct", "grievance", "other"];

export default async function FormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { type } = await searchParams;
  const initialType = typeof type === "string" && INQUIRY_TYPES.includes(type) ? type : "";

  return (
    <div className="min-h-screen bg-[var(--color-mint-cream)]">
      <InquiryForm initialType={initialType} />
    </div>
  );
}
