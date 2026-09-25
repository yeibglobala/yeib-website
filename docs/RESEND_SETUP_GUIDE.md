# 📧 YEIB — Resend Email Integration Setup Guide

> **For the YEIB development and operations team.**  
> This guide outlines the setup and architecture for all web forms on the YEIB platform, ensuring submissions are dispatched from **`YEIB Investment Fund <notifications@updates.yeib-manco.com.ng>`** and delivered directly to the designated department inboxes via [Resend](https://resend.com).

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Step 1 — Verify Domain (`updates.yeib-manco.com.ng`)](#step-1--verify-domain-updatesyeib-mancocomng)
4. [Step 2 — Generate Resend API Key](#step-2--generate-resend-api-key)
5. [Step 3 — Configure Environment Variables](#step-3--configure-environment-variables)
6. [Step 4 — Form Mappings & Destination Inboxes](#step-4--form-mappings--destination-inboxes)
7. [Step 5 — Local Data Preservation & Failover](#step-5--local-data-preservation--failover)

---

## Architecture Overview

All 4 forms on the YEIB website are wired to Next.js Server Actions with built-in:
1. **Honeypot Anti-Spam Trap**: Silently drops automated bots without consuming API quota or requiring CAPTCHAs.
2. **Local Data Preservation Layer (`lib/email/backup.ts`)**: Appends raw JSON records to `data/submissions/[form-type].log` before triggering remote API calls. Zero lead loss.
3. **Resend Email Dispatch (`lib/email/resend.ts`)**: Sends a branded HTML notification to the internal team inbox and an automatic confirmation email to the applicant/submitter.
4. **Resend Audience Sync (Optional)**: Can sync applicant emails into a Resend Audience list for newsletters or updates.

---

## Step 1 — Verify Domain (`updates.yeib-manco.com.ng`)

1. Log into your [Resend Dashboard](https://resend.com).
2. Navigate to **Domains** → click **Add Domain**.
3. Enter: `updates.yeib-manco.com.ng`.
4. Copy the generated DNS records into your DNS provider (e.g. Cloudflare, Namecheap, cPanel):
   - **DKIM** (TXT / CNAME)
   - **SPF** (TXT)
   - **MX** (Feedback / Bounce handling)
5. Click **Verify DNS Records** in Resend. Once verified, the status will show green.

---

## Step 2 — Generate Resend API Key

1. Go to **API Keys** in Resend.
2. Click **Create API Key**.
3. Name: `YEIB Production / Dev`.
4. Permission: **Full Access** (or Sending access + Audience access).
5. Copy the key (`re_...`).

---

## Step 3 — Configure Environment Variables

In your `.env.local` (or deployment platform like Vercel / Cloudflare / Coolify):

```bash
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=YEIB Investment Fund <notifications@updates.yeib-manco.com.ng>
RESEND_AUDIENCE_ID=

# Internal Destination Inboxes
EMAIL_INQUIRIES_TO=inquiries@yeib-manco.com.ng
EMAIL_PARTNERSHIPS_TO=partnerships@yeib-manco.com.ng
EMAIL_APPLY_TO=applications@yeib-manco.com.ng
EMAIL_ESG_TO=esg@yeib-manco.com.ng
```

---

## Step 4 — Form Mappings & Destination Inboxes

| Form | Route | Action | Destination Inbox |
|---|---|---|---|
| **General Inquiry** | `/form` | `submitGeneralInquiryAction` | `inquiries@yeib-manco.com.ng` |
| **Institutional Partnership** | `/contact` | `submitPartnershipAction` | `partnerships@yeib-manco.com.ng` |
| **Funding Application** | `/apply` | `submitApplicationAction` | `applications@yeib-manco.com.ng` |
| **ESG Grievance Redress** | `/esg` | `submitGrievanceAction` | `esg@yeib-manco.com.ng` |

---

## Step 5 — Local Data Preservation & Failover

If the `RESEND_API_KEY` is missing or Resend experiences an outage, submissions will:
- Automatically be saved locally to `data/submissions/{form_type}.log`
- Still present clean user feedback
- `data/` is ignored by Git in `.gitignore` to protect submitter privacy.
