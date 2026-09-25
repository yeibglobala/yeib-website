import { Resend } from "resend";
import { logSubmissionLocally, type SubmissionPayload } from "./backup";
import {
  buildInternalEmailHtml,
  buildInternalEmailText,
  buildConfirmationEmailHtml,
  buildConfirmationEmailText,
  type EmailTemplateData,
} from "./templates";

// Initialize Resend client (lazy/resilient if key not yet provided)
const apiKey = process.env.RESEND_API_KEY || "";
export const resend = apiKey ? new Resend(apiKey) : null;

export const EMAIL_CONFIG = {
  from: process.env.RESEND_FROM_EMAIL || "YEIB Investment Fund <notifications@updates.yeib-manco.com.ng>",
  defaultTo: process.env.CONTACT_RECIPIENT_EMAIL || "info@yeib-manco.com.ng",
  applyTo: process.env.APPLY_RECIPIENT_EMAIL || process.env.CONTACT_RECIPIENT_EMAIL || "info@yeib-manco.com.ng",
  esgTo: process.env.ESG_RECIPIENT_EMAIL || process.env.CONTACT_RECIPIENT_EMAIL || "info@yeib-manco.com.ng",
  audienceId: process.env.RESEND_AUDIENCE_ID || "",
};

export interface ProcessFormSubmissionOptions {
  formType: "general_inquiry" | "partnership" | "application" | "esg_grievance";
  recipientTo?: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  templateData: EmailTemplateData;
  confirmationIntro: string;
  audienceData?: {
    firstName?: string;
    lastName?: string;
  };
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  backupSaved: boolean;
  emailSent: boolean;
}

export async function processFormSubmission(
  options: ProcessFormSubmissionOptions,
  rawFormData: Record<string, unknown>
): Promise<FormSubmissionResult> {
  const timestamp = new Date().toISOString();

  // 1. Data Preservation Layer: Always log to local disk first
  const payload: SubmissionPayload = {
    formType: options.formType,
    submittedAt: timestamp,
    data: rawFormData,
  };
  await logSubmissionLocally(payload);

  let emailSent = false;

  // 2. Dispatch via Resend if API key is configured
  if (resend) {
    try {
      const toEmail = options.recipientTo || EMAIL_CONFIG.defaultTo;

      // Internal team alert
      await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: toEmail,
        replyTo: options.senderEmail,
        subject: options.subject,
        html: buildInternalEmailHtml(options.templateData),
        text: buildInternalEmailText(options.templateData),
      });
      emailSent = true;

      // Automated confirmation to sender (if valid email provided)
      if (options.senderEmail && options.senderEmail.includes("@")) {
        try {
          await resend.emails.send({
            from: EMAIL_CONFIG.from,
            to: options.senderEmail,
            subject: `Receipt: ${options.subject}`,
            html: buildConfirmationEmailHtml(
              options.senderName || "Valued Partner",
              options.subject,
              options.confirmationIntro
            ),
            text: buildConfirmationEmailText(
              options.senderName || "Valued Partner",
              options.confirmationIntro
            ),
          });
        } catch (confError) {
          console.warn("[Resend] User confirmation email warning:", confError);
        }
      }

      // Optional: Sync contact to Resend Audience
      if (EMAIL_CONFIG.audienceId && options.senderEmail) {
        try {
          await resend.contacts.create({
            email: options.senderEmail,
            firstName: options.audienceData?.firstName || options.senderName,
            lastName: options.audienceData?.lastName || "",
            audienceId: EMAIL_CONFIG.audienceId,
          });
        } catch (contactError) {
          console.warn("[Resend] Contact sync warning:", contactError);
        }
      }
    } catch (apiError) {
      console.error("[Resend API Error]:", apiError);
    }
  } else {
    console.info(
      "[Resend Mock/Notice] RESEND_API_KEY is not set. Submission was saved to local backup log (data/submissions/)."
    );
  }

  return {
    success: true,
    message: "Your submission has been successfully received!",
    backupSaved: true,
    emailSent,
  };
}
