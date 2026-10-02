export interface StakeholderGroup {
  id: number;
  formNumber: 1 | 2 | 3 | 4 | 5 | 6;
  name: string;
  tagline: string;
  introCopy: string;
}

export const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Federal Capital Territory (FCT)",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Outside Nigeria (please specify)",
];

export const STAKEHOLDER_GROUPS: StakeholderGroup[] = [
  {
    id: 1,
    formNumber: 1,
    name: "Entrepreneurs & Businesses",
    tagline: "An entrepreneur or business seeking investment or capacity-building support",
    introCopy:
      "This form is for youth-led businesses with a working product or service, paying customers and a plan to grow. We invest in businesses that are majority owned or led by young people aged 18 to 35, or whose employees or customers are predominantly young people. We are sector agnostic. Our priority is job creation, so we look for businesses with the potential to scale and to create formal employment, including businesses operating outside the most concentrated markets. We pay particular attention to women-led businesses and to businesses with a positive environmental or climate impact. Depending on your stage, you may be considered for investment, for a capacity-building grant that pays for business development services from a vetted provider, or both.",
  },
  {
    id: 2,
    formNumber: 2,
    name: "Fund Managers",
    tagline: "A venture capital or private equity fund manager",
    introCopy:
      "This form is for venture capital and private equity fund managers with a presence in Nigeria that invest, or intend to invest, in early and growth-stage youth companies. Through the indirect window of the Equity Investment Fund, we commit capital to funds alongside other investors. In assessing funds we consider, among other factors, the team’s track record and expertise, alignment with our youth mandate, gender diversity in leadership, reach into underserved regions, governance, and the quality of post-investment support offered to portfolio companies.",
  },
  {
    id: 3,
    formNumber: 3,
    name: "Banks & Licensed Lenders",
    tagline: "A bank, microfinance bank or other licensed lender",
    introCopy:
      "This form is for commercial banks, microfinance banks and finance companies licensed by the Central Bank of Nigeria that want to expand lending to youth-led businesses. The Credit Guarantee Facility is operated as a ring-fenced youth window by Impact Credit Guarantee Limited (ICGL), a subsidiary of the Development Bank of Nigeria. Guarantees share the risk on eligible loans to youth-led MSMEs, and participating institutions can access technical support to develop products for this segment. Submissions are reviewed jointly with ICGL.",
  },
  {
    id: 4,
    formNumber: 4,
    name: "BDS Providers & ESOs",
    tagline: "A business development service provider, incubator, accelerator or other ecosystem support organisation",
    introCopy:
      "This form is for business development service providers, incubators, accelerators, innovation hubs, training institutions and certification bodies that support MSMEs. Through the Ecosystem Development Fund, we work with vetted providers who deliver capacity-building services to the businesses we support, and we offer grants to help providers expand and improve their services. Providers are assessed on their experience and impact, the quality of their programmes, their organisational capability, and their geographic reach and networks.",
  },
  {
    id: 5,
    formNumber: 5,
    name: "Research, Policy & Public Institutions",
    tagline: "A research, policy or public institution working on entrepreneurship",
    introCopy:
      "This form is for universities, research institutes, think tanks, policy bodies, public agencies and other organisations working to improve the environment for entrepreneurship in Nigeria. The Ecosystem Development Fund can support convening and policy dialogue, the implementation of enabling policy, research on entrepreneurship across sectors and regions, and the development of better data on MSMEs. Use this form to share a proposal or an idea for collaboration.",
  },
  {
    id: 6,
    formNumber: 6,
    name: "Investors & Development Partners",
    tagline: "An investor or development partner interested in the Funds",
    introCopy:
      "This form is for development finance institutions, bilateral agencies, foundations, institutional investors, corporates and other partners interested in investing in, co-investing alongside, or partnering with the YEIB Investment Fund. Submitting this form registers your interest only. It is not an offer of, or invitation to subscribe for, any interest in the Funds.",
  },
];
