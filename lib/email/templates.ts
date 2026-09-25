export interface EmailTemplateData {
  title: string;
  badge: string;
  senderName: string;
  senderEmail: string;
  details: { label: string; value: string }[];
  message?: string;
}

export function buildInternalEmailHtml(data: EmailTemplateData): string {
  const detailRows = data.details
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 14px; font-weight: 600; color: #003124; background-color: #F2FBF6; width: 35%; border-bottom: 1px solid #E1C9B3; font-size: 14px;">
          ${escapeHtml(item.label)}
        </td>
        <td style="padding: 10px 14px; color: #333333; border-bottom: 1px solid #E1C9B3; font-size: 14px;">
          ${escapeHtml(item.value)}
        </td>
      </tr>
    `
    )
    .join("");

  const messageSection = data.message
    ? `
      <div style="margin-top: 24px;">
        <h3 style="color: #003124; font-size: 16px; margin-bottom: 8px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">Submission Message / Proposal:</h3>
        <div style="background-color: #FAFAFA; border-left: 4px solid #F88404; padding: 16px; font-size: 14px; line-height: 1.6; color: #222222; border-radius: 4px; white-space: pre-wrap;">${escapeHtml(
          data.message
        )}</div>
      </div>
    `
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(data.title)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F4F6F5; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 49, 36, 0.08);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #003124; padding: 28px 32px; text-align: left;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: #00BE93; color: #003124; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; border-radius: 20px; margin-bottom: 12px;">
                      ${escapeHtml(data.badge)}
                    </span>
                    <h1 style="color: #FFFFFF; font-size: 22px; margin: 0; font-weight: 700;">
                      ${escapeHtml(data.title)}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin-top: 0; margin-bottom: 20px; font-size: 15px; color: #444444; line-height: 1.5;">
                A new submission has been received from <strong>${escapeHtml(data.senderName)}</strong> (<a href="mailto:${escapeHtml(data.senderEmail)}" style="color: #00BE93; text-decoration: none;">${escapeHtml(data.senderEmail)}</a>).
              </p>

              <!-- Details Table -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #E1C9B3; border-radius: 8px; overflow: hidden; border-collapse: collapse;">
                ${detailRows}
              </table>

              ${messageSection}

              <!-- Action Button -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${escapeHtml(data.senderEmail)}" style="display: inline-block; background-color: #F88404; color: #FFFFFF; font-weight: 600; font-size: 15px; text-decoration: none; padding: 12px 28px; border-radius: 50px;">
                  Reply directly to ${escapeHtml(data.senderName)}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F2FBF6; border-top: 1px solid #E1C9B3; padding: 20px 32px; text-align: center; font-size: 12px; color: #666666;">
              <p style="margin: 0 0 6px 0;"><strong>YEIB Nigeria Investment Management Company Ltd.</strong></p>
              <p style="margin: 0; color: #888888;">Automated notification generated via updates.yeib-manco.com.ng</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function buildInternalEmailText(data: EmailTemplateData): string {
  const details = data.details.map((d) => `- ${d.label}: ${d.value}`).join("\n");
  const msg = data.message ? `\n\nMessage / Proposal:\n${data.message}` : "";
  return `[${data.badge.toUpperCase()}] ${data.title}\n\nFrom: ${data.senderName} (${data.senderEmail})\n\nDetails:\n${details}${msg}\n\n--\nYEIB Nigeria Investment Management Company Ltd.`;
}

export function buildConfirmationEmailHtml(recipientName: string, subjectTitle: string, introText: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Submission Received - YEIB</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F4F6F5; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 49, 36, 0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #003124; padding: 28px 32px; text-align: left;">
              <h1 style="color: #00BE93; font-size: 20px; margin: 0 0 6px 0; font-weight: 700;">
                N-YEIB Investment Funds
              </h1>
              <p style="color: #E1C9B3; margin: 0; font-size: 13px;">
                The institutional bridge between capital and ambition
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="color: #003124; font-size: 20px; margin-top: 0; margin-bottom: 16px;">
                Hello ${escapeHtml(recipientName)},
              </h2>
              
              <p style="font-size: 15px; color: #333333; line-height: 1.6; margin-bottom: 16px;">
                ${escapeHtml(introText)}
              </p>

              <div style="background-color: #F2FBF6; border-left: 4px solid #00BE93; padding: 16px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; color: #003124; font-weight: 600;">
                  What happens next?
                </p>
                <p style="margin: 8px 0 0 0; font-size: 13px; color: #444444; line-height: 1.5;">
                  Our evaluation team will review your submission in detail. You can expect a response or follow-up from our team within 2 to 3 business days.
                </p>
              </div>

              <p style="font-size: 14px; color: #555555; line-height: 1.5; margin-bottom: 0;">
                If you have additional files or urgent questions, you can reply directly to this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F2FBF6; border-top: 1px solid #E1C9B3; padding: 20px 32px; text-align: center; font-size: 12px; color: #666666;">
              <p style="margin: 0 0 4px 0;"><strong>Nigeria Youth Entrepreneurship Investment Bank (N-YEIB)</strong></p>
              <p style="margin: 0 0 4px 0; color: #888888;">Anchored by the African Development Bank (AfDB)</p>
              <p style="margin: 0; color: #999999;">Abuja, Nigeria</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function buildConfirmationEmailText(recipientName: string, introText: string): string {
  return `Hello ${recipientName},\n\n${introText}\n\nWhat happens next?\nOur evaluation team will review your submission in detail. You can expect a response from our team within 2 to 3 business days.\n\n--\nN-YEIB Investment Funds\nAnchored by AfDB\nAbuja, Nigeria`;
}

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
