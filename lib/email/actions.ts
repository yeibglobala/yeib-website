"use server";

import { processFormSubmission, EMAIL_CONFIG, type FormSubmissionResult } from "./resend";

// 1. General Inquiry Action (/form)
export async function submitGeneralInquiryAction(data: {
  firstName: string;
  lastName: string;
  email: string;
  inquiryType: string;
  message: string;
  honeypot?: string;
}): Promise<FormSubmissionResult> {
  // Anti-spam honeypot
  if (data.honeypot) {
    return { success: true, message: "Inquiry received.", backupSaved: false, emailSent: false };
  }

  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const inquiryLabels: Record<string, string> = {
    media: "Media & Press",
    general: "General Question",
    careers: "Careers",
    other: "Other",
  };
  const typeDisplay = inquiryLabels[data.inquiryType] || data.inquiryType || "General Question";

  return await processFormSubmission(
    {
      formType: "general_inquiry",
      recipientTo: EMAIL_CONFIG.defaultTo,
      senderName: fullName,
      senderEmail: data.email,
      subject: `[YEIB Inquiry] ${typeDisplay} from ${fullName}`,
      confirmationIntro: "Thank you for reaching out to the YEIB team. We have received your inquiry and our communications team will review it.",
      audienceData: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      templateData: {
        title: "New Website General Inquiry",
        badge: "General Inquiry",
        senderName: fullName,
        senderEmail: data.email,
        details: [
          { label: "Full Name", value: fullName },
          { label: "Email Address", value: data.email },
          { label: "Inquiry Type", value: typeDisplay },
        ],
        message: data.message,
      },
    },
    data
  );
}

// 2. Institutional Partnership Action (/contact)
export async function submitPartnershipAction(data: {
  fullName: string;
  organization: string;
  workEmail: string;
  partnerType: string;
  message: string;
  honeypot?: string;
}): Promise<FormSubmissionResult> {
  if (data.honeypot) {
    return { success: true, message: "Message received.", backupSaved: false, emailSent: false };
  }

  const partnerTypes: Record<string, string> = {
    dfi: "Development Finance Institution (DFI)",
    lender: "Commercial Lender / MFI",
    eso: "Enterprise Support Organization (ESO)",
    fund: "PE / VC Fund",
    other: "Other Institution",
  };
  const typeDisplay = partnerTypes[data.partnerType] || data.partnerType || "Institutional";

  return await processFormSubmission(
    {
      formType: "partnership",
      recipientTo: EMAIL_CONFIG.defaultTo,
      senderName: data.fullName,
      senderEmail: data.workEmail,
      subject: `[YEIB Partnership] ${data.organization} (${typeDisplay})`,
      confirmationIntro: `Thank you for your interest in partnering with YEIB. We have received your institutional inquiry from ${data.organization}.`,
      audienceData: {
        firstName: data.fullName,
      },
      templateData: {
        title: "New Institutional Partnership Inquiry",
        badge: "Partnership Lead",
        senderName: data.fullName,
        senderEmail: data.workEmail,
        details: [
          { label: "Partner Name", value: data.fullName },
          { label: "Organization", value: data.organization },
          { label: "Work Email", value: data.workEmail },
          { label: "Institution Type", value: typeDisplay },
        ],
        message: data.message,
      },
    },
    data
  );
}

// 3. Application Intake Action (/apply)
export async function submitApplicationAction(data: {
  track: "founder" | "manager" | "eso";
  contactEmail: string;
  contactPhone: string;
  trackFields: Record<string, string>;
  honeypot?: string;
}): Promise<FormSubmissionResult> {
  if (data.honeypot) {
    return { success: true, message: "Application received.", backupSaved: false, emailSent: false };
  }

  const trackLabels = {
    founder: "Youth & Women MSME Founder",
    manager: "Fund Manager / Intermediary",
    eso: "Enterprise Support Organization (ESO)",
  };
  const trackTitle = trackLabels[data.track] || data.track;

  const applicantName =
    data.trackFields["Full Name"] ||
    data.trackFields["Contact Name"] ||
    data.trackFields["Contact Person"] ||
    "Applicant";

  const detailsList = [
    { label: "Application Track", value: trackTitle },
    { label: "Contact Email", value: data.contactEmail },
    { label: "Phone Number", value: data.contactPhone },
    ...Object.entries(data.trackFields).map(([key, val]) => ({
      label: key,
      value: String(val),
    })),
  ];

  return await processFormSubmission(
    {
      formType: "application",
      recipientTo: EMAIL_CONFIG.applyTo,
      senderName: applicantName,
      senderEmail: data.contactEmail,
      subject: `[YEIB Application] ${trackTitle} - ${applicantName}`,
      confirmationIntro: `Thank you for submitting your ${trackTitle} application to N-YEIB. Your details have been registered into our pipeline evaluation queue.`,
      audienceData: {
        firstName: applicantName,
      },
      templateData: {
        title: `New ${trackTitle} Application`,
        badge: "Funding Application",
        senderName: applicantName,
        senderEmail: data.contactEmail,
        details: detailsList,
      },
    },
    data
  );
}

// 4. ESG Grievance Action (/esg)
export async function submitGrievanceAction(data: {
  fullName?: string;
  contactInfo: string;
  projectLocation: string;
  details: string;
  honeypot?: string;
}): Promise<FormSubmissionResult> {
  if (data.honeypot) {
    return { success: true, message: "Grievance received.", backupSaved: false, emailSent: false };
  }

  const reporter = data.fullName?.trim() || "Anonymous Grievance Reporter";
  const contactIsEmail = data.contactInfo.includes("@");

  return await processFormSubmission(
    {
      formType: "esg_grievance",
      recipientTo: EMAIL_CONFIG.esgTo,
      senderName: reporter,
      senderEmail: contactIsEmail ? data.contactInfo : EMAIL_CONFIG.esgTo,
      subject: `[ESG Grievance Alert] Incident reported for ${data.projectLocation}`,
      confirmationIntro: "Your grievance / incident report has been securely registered with the YEIB ESG Compliance Team.",
      templateData: {
        title: "Confidential ESG Incident Report",
        badge: "ESG Grievance",
        senderName: reporter,
        senderEmail: data.contactInfo,
        details: [
          { label: "Reporter", value: reporter },
          { label: "Contact Channel", value: data.contactInfo },
          { label: "Project / Location", value: data.projectLocation },
        ],
        message: data.details,
      },
    },
    data
  );
}
