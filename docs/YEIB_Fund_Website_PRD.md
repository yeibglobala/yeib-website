# Product Requirements Document
## YEIB Investment Fund — Public Website

| | |
|---|---|
| **Document owner** | Praise (Design Engineer) |
| **Status** | Draft — for internal review |
| **Confidentiality** | Strictly confidential until full Board approval |
| **Source material** | YEIB Investment Fund: Discovery Notes & Plain-English Guide |
| **Version** | 1.0 |

---

## 1. Background

The YEIB (Youth Entrepreneurship Investment Bank/Fund) is a multi-country African financial initiative designed to give capital and training to young business owners so they can succeed. It spans several African countries, including Côte d'Ivoire, Liberia, and Ethiopia, and sits inside a larger forum co-owned by the Nigeria Sovereign Investment Authority (NSIA) and the Development Bank of Nigeria (DBN), working alongside the African Development Bank (AfDB) and the Ministry of Finance.

All programme details are strictly confidential until the Board gives formal approval. The public website is the first surface through which YEIB will present itself to the world, so its content, language, and positioning carry real regulatory and reputational weight — not just marketing weight.

### Critical naming constraint
YEIB must always be referred to publicly as **"the YEIB Fund,"** never as a "bank." If YEIB is publicly described as a bank before the entity is officially licensed and ready, the Central Bank of Nigeria (CBN) can intervene with strict banking regulations. Calling it a fund keeps the initiative inside the correct regulatory guardrails. This is a **hard content constraint**, not a style preference — every instance of copy, metadata, alt text, and legal footer text on the website must comply.

---

## 2. Problem Statement

Young entrepreneurs across Africa (under age 35) face a compounding set of structural barriers that keep them from starting and scaling businesses:

- **Perceived high risk**: Traditional and commercial banks view youth-led businesses as too risky and routinely deny them loans, creating a loop where young entrepreneurs can never get started or scale.
- **Compounded disadvantage for women**: Youth-led *and* women-led businesses are viewed as an even higher risk by investors — a "double disadvantage" that YEIB explicitly wants to correct.
- **Missing enabling infrastructure**: Unstable electricity, poor internet access, weak policy environments, and limited digital systems make it structurally harder to grow a business, independent of the entrepreneur's ability.

**Cost of not solving this**: Without intervention, a large and growing segment of Africa's youth population remains locked out of formal capital markets — undermining job creation, economic growth, and the continent's demographic dividend. The website's job is to make the case, credibly and publicly, that this is solvable and that YEIB is solving it.

---

## 3. Website Purpose & Goals

The public website is not a transactional product — it is the credibility and trust-building front door for a regulated financial initiative that is still pre-launch/pre-Board-approval in parts of its structure. Its goals:

1. **Establish institutional credibility** with a "serious, trustworthy, yet modern financial institution" brand voice — sitting deliberately between a "boring government office" and a "hyperactive, flashy modern startup."
2. **Correctly and consistently position YEIB as a Fund, never a bank**, across every page, in a way that satisfies regulatory sensitivity (CBN).
3. **Clearly explain the two-sided model** (Financial Services + Non-Financial Services/Ecosystem support) so that intermediaries, ESOs, and potential partners understand how the money and support actually flow.
4. **Speak credibly to multiple audiences at once**: co-owners/DFIs and government stakeholders (NSIA, DBN, AfDB, Ministry of Finance), intermediary partners (PEs, VCs, Fintechs, commercial banks, MFBs), Entrepreneurship Support Organizations (ESOs), and — at the base of the pyramid — the youth entrepreneurs themselves.
5. **Support the fundraising narrative**: the Fund's ultimate goal is to raise a $300 million USD pool from global investors and to prove, with tracked impact numbers, that Nigerian and African youth are bankable, structured, and investable. The website should be built to eventually host or link to this impact evidence (job numbers, businesses supported, NPL performance) once the Board authorizes disclosure.

---

## 4. Non-Goals (v1)

| Non-Goal | Rationale |
|---|---|
| Direct loan/grant application portal for individual entrepreneurs | YEIB does not lend directly to entrepreneurs — capital flows through intermediaries (PE/VC/Fintech/banks/MFBs). A direct-application flow would misrepresent the model. |
| Public disclosure of confidential fund structuring, board decisions, or unapproved figures | All information is confidential until full Board approval; premature disclosure carries regulatory and reputational risk. |
| Any language, page, or metadata that describes YEIB as a "bank" | Regulatory constraint — would trigger CBN intervention before the entity is ready. |
| Investor-only data rooms / deal-flow tooling | Out of scope for a public-facing site; belongs in a separate, access-controlled investor relations tool if ever built. |
| Multi-language localization for all target countries (Côte d'Ivoire, Liberia, Ethiopia, etc.) | Phase 2 consideration — v1 ships in English to establish the core narrative and brand first. |

---

## 5. Target Audiences ("Who is this site for")

The Fund's own "sweet spot" definition should directly inform the site's messaging and proof points:

- **Age limit**: Under 35.
- **Youth-led definition** (site copy should reflect this precisely): a business qualifies if the person running it is under 35, **or** at least 50% of the management team is under 35, **or** the business employs mostly people under 35.
- **Women-led focus**: A clear, deliberate narrative around women leaders, with a hard target of full Gender Parity (50/50) by Year 5. This should be a visible content pillar, not a footnote.
- **Sector-agnostic with priority sectors**: Agriculture, Trade, the Creative Industry (music, art, fashion), and ICT (tech/software) should be featured/prioritized in imagery and case studies, while the Fund remains open to other sectors.

### Website audience segments (derived from the above + the delivery model)
1. **Institutional / co-owner audience** — NSIA, DBN, AfDB, Ministry of Finance, Board members, regulators (incl. CBN, indirectly). Needs: credibility, regulatory correctness, gravitas.
2. **Intermediary partners** — PE/VC firms, Fintech platforms, commercial banks, MFBs. Needs: clear understanding of the First Loss Guarantee mechanism and why partnering reduces their risk.
3. **Ecosystem partners / ESOs** — Entrepreneurship Support Organizations. Needs: clarity on non-financial services, grant sizes, and eligibility.
4. **Global investors / donors** — the $300M capital-raise audience. Needs: proof points, impact metrics, credibility, risk mitigation story.
5. **Youth entrepreneurs (indirect/aspirational audience)** — under-35, especially women-led businesses in priority sectors. They won't apply directly on-site, but they are the human face of the narrative and the proof of concept.

---

## 6. Brand Voice & Tone Requirements

Per Section 6 of the discovery notes, the Fund had an explicit internal brainstorm on brand feel. The website must:

- Avoid reading as a **"boring government office"** (overly bureaucratic, sterile, jargon-heavy).
- Avoid reading as a **"hyperactive, flashy modern startup"** (overly casual, gimmicky, hype-driven).
- Hit the **midpoint**: serious, trustworthy, and credible, while still feeling modern and current.

**Implication for copywriting and visual design**: confident and plain-spoken over corporate-jargon-heavy; data- and outcome-led rather than slogan-led; modern typography and layout without startup-style playfulness (no excessive gradients, emoji, or casual slang).

---

## 7. Core Content / Information Architecture

Recommended page/section structure, mapped directly to what the discovery notes establish as confirmed content:

1. **Home / Hero**
   - Positioning statement: YEIB Fund as the bridge between capital and youth-led businesses.
   - Must never use the word "bank" to describe YEIB itself.
2. **What is the YEIB Fund** (About)
   - Multi-country footprint (Côte d'Ivoire, Liberia, Ethiopia, and expanding).
   - Co-ownership: NSIA + DBN, in partnership with AfDB and the Ministry of Finance.
   - "Fund, not a bank" framing stated clearly and early.
3. **The Problem**
   - Structural barriers young entrepreneurs face (risk perception, the double disadvantage for young women, infrastructure/data gaps, exclusion from traditional bank lending).
4. **How It Works (The Bridge Model)**
   - **Financial Services (43% allocation)**: capital flows through intermediaries (PE, VC, Fintechs, commercial banks, MFBs), backed by a **First Loss Guarantee of up to 75%** — YEIB absorbs up to 75% of losses if a young entrepreneur's business fails, de-risking the loan for the intermediary.
   - **Non-Financial Services & Ecosystem Support (22% allocation)**: reimbursable, interest-free grants; smaller ticket grants; and grants of up to $50,000 for Entrepreneurship Support Organizations (ESOs) that build infrastructure and deliver training.
5. **Who We Serve (Target Audience / Eligibility)**
   - Under-35 definition and the three-part youth-led qualification test.
   - Gender parity commitment (50/50 by Year 5) and women-led narrative.
   - Priority sectors: Agriculture, Trade, Creative Industry, ICT — sector-agnostic overall.
6. **Impact & Vision**
   - The $300M capital-raise goal, framed as proof that African youth are investable.
   - Space reserved (pending Board approval) for tracked impact metrics: number of youth businesses supported, jobs created, and Non-Performing Loan (NPL) performance.
7. **Partners** (co-owners and institutional partners: NSIA, DBN, AfDB, Ministry of Finance) — logos/mentions pending approval of what can be publicly disclosed.
8. **Contact / Get Involved**
   - Segmented calls-to-action for intermediaries, ESOs, and investors — **not** a direct entrepreneur loan application, consistent with the delivery model.

---

## 8. Functional & Content Requirements

### P0 — Must-Have
| Requirement | Acceptance Criteria |
|---|---|
| "Fund not Bank" compliance across all copy | Given any page or metadata field, when the entity is referenced, then it is described only as "the YEIB Fund," never as "a bank." |
| Confidentiality gating on unapproved content | Given any figure, structure detail, or claim not yet Board-approved, when preparing site copy, then it is either omitted or explicitly marked "pending approval" internally before publish. |
| Explanation of the two-service model (Financial + Non-Financial) | Given a visitor lands on "How It Works," when they read the section, then they can articulate the 43%/22% split and the First Loss Guarantee mechanism. |
| Eligibility / target audience section | Given a visitor wants to know who qualifies, when they view "Who We Serve," then the under-35 and three-part youth-led test are stated accurately. |
| Brand voice consistency | Given any page, when reviewed, then tone reads as neither bureaucratic nor startup-hype (qualitative editorial check). |
| Responsive design | Site is fully usable on mobile, tablet, and desktop breakpoints. |

### P1 — Nice-to-Have
| Requirement | Rationale |
|---|---|
| Segmented CTAs by audience (intermediary / ESO / investor) | Improves conversion clarity without implying direct-to-entrepreneur lending. |
| Glossary/tooltip component for acronyms (MSME, DFI, CBN, DBN, NSIA, AfDB, ESO) | Discovery notes show this content was explicitly written to demystify jargon for a lay audience — worth preserving as an interactive glossary. |
| Downloadable one-pager / fact sheet (post Board-approval) | Supports investor and partner outreach. |

### P2 — Future Considerations
| Requirement | Rationale |
|---|---|
| Multi-language versions (French for Côte d'Ivoire, Amharic/English for Ethiopia, etc.) | Needed for genuine multi-country reach; deferred until core narrative is validated. |
| Live/updating impact dashboard (jobs created, businesses funded, NPL rate) | Depends on the Fund having approved, trackable data infrastructure in place. |
| Partner/ESO portal for grant applications | Would formalize the ESO relationship digitally; out of scope until the non-financial services program is operationalized. |

---

## 9. Design & Compliance Constraints

- **Naming**: "YEIB Fund" only — enforced in copy, page titles, meta descriptions, and image alt text.
- **Confidentiality**: No structural, financial, or board-decision detail beyond what's explicitly approved for public release goes live. Treat every content block as "hold until cleared" by default.
- **Tone**: Serious/trustworthy/modern — no stock-photo clichés of "hustle culture," no over-promising language ("guaranteed returns," etc., which would also carry legal risk for a financial fund).
- **Accuracy of figures**: Do not round, estimate, or invent numbers not present in approved source material (e.g., the 43%/22% split, 75% First Loss Guarantee, up to $50,000 ESO grants, $300M target) — these are the only figures currently confirmed.

---

## 10. Success Metrics

*(Framed as directional targets since no target values were provided in the discovery notes — to be confirmed with stakeholders.)*

**Leading indicators**
- Time-on-page for "How It Works" and "Who We Serve" (proxy for message comprehension).
- Click-through rate on segmented CTAs (intermediary / ESO / investor).
- Downloads of the fact sheet / one-pager (post-launch, P1).

**Lagging indicators**
- Qualified inbound partner/intermediary inquiries attributable to the site.
- Investor inquiries progressing toward the $300M capital-raise goal.
- Sentiment/perception tracking of "Fund vs. Bank" framing in press or public mentions (regulatory risk indicator).

---

## 11. Open Questions

| Question | Owner |
|---|---|
| What Board-approved figures (if any) can be published at v1 launch vs. held for a later phase? | Stakeholder / Legal |
| Which co-owner/partner logos (NSIA, DBN, AfDB, Ministry of Finance) are cleared for public display, and in what order/hierarchy? | Stakeholder / Legal |
| Should the glossary (MSME, DFI, CBN, etc.) be a dedicated page or inline tooltips? | Design |
| What is the launch timeline relative to Board approval — can a "coming soon" holding page precede full launch? | Stakeholder |
| Are there existing visual brand assets (logo, color palette, typography) or is brand identity being designed alongside this site? | Design |
| Should country-specific content (Côte d'Ivoire, Liberia, Ethiopia) be visible at v1, or introduced as the Fund formally launches in each market? | Stakeholder |

---

## 12. Timeline Considerations

- **Hard constraint**: Nothing beyond approved messaging can go live before full Board approval — this affects even a "coming soon" page's copy.
- **Dependency**: Final figures/claims (impact numbers, partner names, country rollout) depend on Board sign-off and are outside the website team's control.
- **Suggested phasing**:
  - **Phase 1**: Brand-safe "coming soon" / holding page (Fund positioning, no confidential detail).
  - **Phase 2**: Full narrative site per Section 7 information architecture, using only Board-approved content.
  - **Phase 3**: Impact dashboard, multi-language support, and partner/ESO tooling once operational data and confirmed processes exist.

---

## Appendix: Glossary (source: Discovery Notes, Section 1)

| Term | Meaning |
|---|---|
| **YEIB** | Youth Entrepreneurship Investment Bank/Fund — provides money and training to young business owners. |
| **MSME** | Micro, Small, and Medium Enterprises — ordinary small businesses. |
| **DFI** | Development Finance Institution — government-owned banks that support economic growth rather than pure profit. |
| **CBN** | Central Bank of Nigeria — sets nationwide banking/money rules. |
| **DBN** | Development Bank of Nigeria. |
| **NSIA** | Nigeria Sovereign Investment Authority. |
| **AfDB** | African Development Bank — supports major infrastructure and business projects across Africa. |
| **Intermediaries** | Local banks, Fintechs, and investment groups (VC/PE) through which YEIB channels capital to youth, rather than lending directly. |
| **Ecosystem** | The full business community: businesses themselves, academia, support networks (ESOs), and protective government policy. |
| **ESO** | Entrepreneurship Support Organization — builds infrastructure and delivers training to young business owners. |
| **NPL** | Non-Performing Loan — a loan that isn't being repaid; kept low as proof of youth "bankability." |
