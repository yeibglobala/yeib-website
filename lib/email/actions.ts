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
    misconduct: "Misconduct",
    grievance: "Grievance",
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

// 3. Application Intake Action (/apply) - Supporting all 6 Stakeholder Groups
export interface StakeholderApplicationPayload {
  formNumber: 1 | 2 | 3 | 4 | 5 | 6;
  formTitle: string;
  contact: {
    fullName: string;
    organizationName: string;
    role: string;
    email: string;
    phone: string;
    state: string;
    websiteOrLinkedIn?: string;
    referralSource?: string;
  };
  responses: Record<string, string | string[]>;
  declarations: {
    accuracyConfirmed: boolean;
    nonBindingAcknowledged: boolean;
    privacyConsent: boolean;
    exclusionListConfirmed?: boolean;
    shareWithPartnersConsent?: boolean;
    receiveUpdatesConsent?: boolean;
  };
  honeypot?: string;
}

export interface LegacyApplicationPayload {
  track: "founder" | "manager" | "eso";
  contactEmail: string;
  contactPhone: string;
  trackFields: Record<string, string>;
  honeypot?: string;
}

export type ApplicationInput = StakeholderApplicationPayload | LegacyApplicationPayload;

export async function submitApplicationAction(data: ApplicationInput): Promise<FormSubmissionResult> {
  if (data.honeypot) {
    return { success: true, message: "Application received.", backupSaved: false, emailSent: false, referenceNumber: "YEIB-0-2026-0000" };
  }

  // Handle New 6-Stakeholder schema
  if ("formNumber" in data) {
    const year = new Date().getFullYear();
    const sequenceNum = Math.floor(1 + Math.random() * 9999);
    const sequence = String(sequenceNum).padStart(4, "0");
    const referenceNumber = `YEIB-${data.formNumber}-${year}-${sequence}`;

    const detailsList: { label: string; value: string }[] = [
      { label: "Reference Number", value: referenceNumber },
      { label: "Stakeholder Category", value: `Form ${data.formNumber}: ${data.formTitle}` },
      { label: "Full Name", value: data.contact.fullName },
      { label: "Organisation / Business", value: data.contact.organizationName },
      { label: "Role / Title", value: data.contact.role },
      { label: "Email Address", value: data.contact.email },
      { label: "Phone Number", value: data.contact.phone },
      { label: "Headquarters State", value: data.contact.state },
      ...(data.contact.websiteOrLinkedIn ? [{ label: "Website / LinkedIn", value: data.contact.websiteOrLinkedIn }] : []),
      ...(data.contact.referralSource ? [{ label: "Referral Source", value: data.contact.referralSource }] : []),
      ...Object.entries(data.responses).map(([question, answer]) => ({
        label: question,
        value: Array.isArray(answer) ? answer.join("; ") : String(answer),
      })),
      { label: "NDPA 2023 Consent", value: data.declarations.privacyConsent ? "Agreed" : "No" },
      { label: "Accuracy Confirmed", value: data.declarations.accuracyConfirmed ? "Agreed" : "No" },
      { label: "Non-Binding Terms", value: data.declarations.nonBindingAcknowledged ? "Agreed" : "No" },
      ...(data.declarations.exclusionListConfirmed !== undefined
        ? [{ label: "Exclusion List Confirmation", value: data.declarations.exclusionListConfirmed ? "Confirmed Not Engaged" : "No" }]
        : []),
      { label: "Consent to Share with Partners (ICGL/ESOs)", value: data.declarations.shareWithPartnersConsent ? "Agreed" : "Declined" },
      { label: "Consent for Updates", value: data.declarations.receiveUpdatesConsent ? "Subscribed" : "Declined" },
    ];

    const result = await processFormSubmission(
      {
        formType: "application",
        recipientTo: EMAIL_CONFIG.applyTo,
        senderName: data.contact.fullName,
        senderEmail: data.contact.email,
        subject: `[YEIB Form ${data.formNumber}] ${data.formTitle} - ${data.contact.organizationName}`,
        referenceNumber,
        confirmationIntro: `Thank you. We have received your submission under Form ${data.formNumber} (${data.formTitle}).`,
        audienceData: {
          firstName: data.contact.fullName,
        },
        templateData: {
          title: `New Form ${data.formNumber} Submission: ${data.formTitle}`,
          badge: `YEIB Intake [Form ${data.formNumber}]`,
          senderName: data.contact.fullName,
          senderEmail: data.contact.email,
          details: detailsList,
        },
      },
      data as unknown as Record<string, unknown>
    );

    return {
      ...result,
      referenceNumber,
    };
  }

  // Legacy fallback
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

  const year = new Date().getFullYear();
  const sequence = Math.floor(1000 + Math.random() * 9000);
  const referenceNumber = `YEIB-LEGACY-${year}-${sequence}`;

  const detailsList = [
    { label: "Reference Number", value: referenceNumber },
    { label: "Application Track", value: trackTitle },
    { label: "Contact Email", value: data.contactEmail },
    { label: "Phone Number", value: data.contactPhone },
    ...Object.entries(data.trackFields).map(([key, val]) => ({
      label: key,
      value: String(val),
    })),
  ];

  const result = await processFormSubmission(
    {
      formType: "application",
      recipientTo: EMAIL_CONFIG.applyTo,
      senderName: applicantName,
      senderEmail: data.contactEmail,
      referenceNumber,
      subject: `[YEIB Application] ${trackTitle} - ${applicantName}`,
      confirmationIntro: `Thank you for submitting your ${trackTitle} application to the YEIB Investment Fund. Your details have been registered into our pipeline evaluation queue.`,
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
    data as unknown as Record<string, unknown>
  );

  return {
    ...result,
    referenceNumber,
  };
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

// 5. ESG Whistleblowing Action (/esg)
export async function submitWhistleblowingAction(data: {
  fullName?: string;
  contactInfo?: string;
  concernType: string;
  personsInvolved?: string;
  details: string;
  honeypot?: string;
}): Promise<FormSubmissionResult> {
  if (data.honeypot) {
    return { success: true, message: "Report received.", backupSaved: false, emailSent: false };
  }

  const reporter = data.fullName?.trim() || "Anonymous Whistleblower";
  const contactInfo = data.contactInfo?.trim() || "";
  const concernLabels: Record<string, string> = {
    fraud: "Fraud",
    corruption: "Corruption or Bribery",
    misconduct: "Misconduct",
    unethical: "Unethical Behaviour",
    conflict: "Conflict of Interest",
    other: "Other",
  };
  const concern = concernLabels[data.concernType] || "Other";

  return await processFormSubmission(
    {
      formType: "esg_whistleblowing",
      recipientTo: EMAIL_CONFIG.esgTo,
      senderName: reporter,
      senderEmail: contactInfo.includes("@") ? contactInfo : "",
      subject: `[Confidential Whistleblowing Report] ${concern}`,
      confirmationIntro: "Your report has been securely registered with the YEIB Investment Fund. It will be handled in strict confidence under our non-retaliation policy.",
      syncToAudience: false,
      templateData: {
        title: "Confidential Whistleblowing Report",
        badge: "Whistleblowing",
        senderName: reporter,
        senderEmail: contactInfo || "Not provided",
        details: [
          { label: "Reporter", value: reporter },
          { label: "Contact Channel", value: contactInfo || "Not provided (anonymous)" },
          { label: "Nature of Concern", value: concern },
          { label: "Persons / Entities Involved", value: data.personsInvolved?.trim() || "Not provided" },
        ],
        message: data.details,
      },
    },
    data
  );
}
