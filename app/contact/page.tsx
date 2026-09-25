import type { Metadata } from "next";
import { ContactSection } from "@/features/contact/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | N-YEIB",
  description: "Get in touch with N-YEIB for institutional partnerships, DFI engagement, and general questions.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-mint-cream)]">
      <ContactSection />
    </div>
  );
}
