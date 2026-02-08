// Mock data - realistic SaaS metrics

export const metrics = {
  mrr: 52847,
  mrrGrowth: 14.2,
  arr: 634164,
  customers: 1893,
  customersGrowth: 23,
  churn: 1.8,
  churnChange: -0.4,
  arpu: 27.92,
  ltv: 1862,
  trialConversion: 24.5,
};

export const revenueHistory = [
  { month: "Jan", mrr: 38200, target: 40000 },
  { month: "Feb", mrr: 39800, target: 42000 },
  { month: "Mar", mrr: 41500, target: 44000 },
  { month: "Apr", mrr: 43200, target: 46000 },
  { month: "May", mrr: 44100, target: 48000 },
  { month: "Jun", mrr: 46800, target: 50000 },
  { month: "Jul", mrr: 48200, target: 50000 },
  { month: "Aug", mrr: 47900, target: 50000 },
  { month: "Sep", mrr: 49500, target: 52000 },
  { month: "Oct", mrr: 50800, target: 52000 },
  { month: "Nov", mrr: 51200, target: 54000 },
  { month: "Dec", mrr: 52847, target: 54000 },
];

export const recentActivity = [
  {
    id: 1,
    type: "upgrade" as const,
    company: "Figma",
    plan: "Team → Enterprise",
    amount: 2400,
    time: "3m ago",
  },
  {
    id: 2,
    type: "new" as const,
    company: "Notion",
    plan: "Pro",
    amount: 144,
    time: "12m ago",
  },
  {
    id: 3,
    type: "churn" as const,
    company: "Webflow",
    plan: "Team",
    amount: -89,
    time: "1h ago",
  },
  {
    id: 4,
    type: "new" as const,
    company: "Linear",
    plan: "Enterprise",
    amount: 890,
    time: "2h ago",
  },
  {
    id: 5,
    type: "upgrade" as const,
    company: "Vercel",
    plan: "Pro → Team",
    amount: 540,
    time: "3h ago",
  },
];

export const topCustomers = [
  { name: "Stripe", mrr: 4200, seats: 85, since: "Mar 2023" },
  { name: "Shopify", mrr: 3800, seats: 72, since: "Jan 2023" },
  { name: "Atlassian", mrr: 3200, seats: 64, since: "Apr 2023" },
  { name: "Twilio", mrr: 2900, seats: 58, since: "Jun 2023" },
  { name: "MongoDB", mrr: 2400, seats: 48, since: "Feb 2024" },
];

export function formatMoney(n: number): string {
  if (Math.abs(n) >= 1000) {
    return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  }
  return `$${n.toLocaleString()}`;
}

export function formatMoneyFull(n: number): string {
  return `$${n.toLocaleString()}`;
}

// Customer data
export type CustomerStatus = "active" | "at-risk" | "churned";
export type CustomerPlan = "Starter" | "Pro" | "Team" | "Enterprise";

export interface Customer {
  id: string;
  name: string;
  email: string;
  plan: CustomerPlan;
  mrr: number;
  status: CustomerStatus;
  joined: string;
  lastActive: string;
  seats: number;
  usage: number; // percentage
}

export const customers: Customer[] = [
  {
    id: "1",
    name: "Stripe",
    email: "billing@stripe.com",
    plan: "Enterprise",
    mrr: 4200,
    status: "active",
    joined: "2023-03-15",
    lastActive: "2025-02-08",
    seats: 85,
    usage: 94,
  },
  {
    id: "2",
    name: "Notion",
    email: "team@notion.so",
    plan: "Team",
    mrr: 890,
    status: "active",
    joined: "2023-08-22",
    lastActive: "2025-02-08",
    seats: 24,
    usage: 88,
  },
  {
    id: "3",
    name: "Linear",
    email: "ops@linear.app",
    plan: "Enterprise",
    mrr: 2100,
    status: "active",
    joined: "2024-01-10",
    lastActive: "2025-02-07",
    seats: 42,
    usage: 91,
  },
  {
    id: "4",
    name: "Vercel",
    email: "finance@vercel.com",
    plan: "Team",
    mrr: 540,
    status: "active",
    joined: "2024-02-28",
    lastActive: "2025-02-08",
    seats: 15,
    usage: 76,
  },
  {
    id: "5",
    name: "Figma",
    email: "accounts@figma.com",
    plan: "Enterprise",
    mrr: 3800,
    status: "active",
    joined: "2023-05-01",
    lastActive: "2025-02-08",
    seats: 72,
    usage: 97,
  },
  {
    id: "6",
    name: "Shopify",
    email: "saas@shopify.com",
    plan: "Enterprise",
    mrr: 3200,
    status: "active",
    joined: "2023-01-18",
    lastActive: "2025-02-06",
    seats: 64,
    usage: 82,
  },
  {
    id: "7",
    name: "Webflow",
    email: "hello@webflow.com",
    plan: "Team",
    mrr: 0,
    status: "churned",
    joined: "2023-11-05",
    lastActive: "2025-01-02",
    seats: 8,
    usage: 0,
  },
  {
    id: "8",
    name: "Loom",
    email: "billing@loom.com",
    plan: "Pro",
    mrr: 144,
    status: "at-risk",
    joined: "2024-06-12",
    lastActive: "2025-01-15",
    seats: 3,
    usage: 23,
  },
  {
    id: "9",
    name: "Framer",
    email: "team@framer.com",
    plan: "Team",
    mrr: 420,
    status: "active",
    joined: "2024-04-20",
    lastActive: "2025-02-08",
    seats: 11,
    usage: 71,
  },
  {
    id: "10",
    name: "Supabase",
    email: "accounts@supabase.io",
    plan: "Pro",
    mrr: 288,
    status: "active",
    joined: "2024-03-08",
    lastActive: "2025-02-07",
    seats: 6,
    usage: 84,
  },
  {
    id: "11",
    name: "PlanetScale",
    email: "enterprise@planetscale.com",
    plan: "Enterprise",
    mrr: 1800,
    status: "active",
    joined: "2023-09-14",
    lastActive: "2025-02-08",
    seats: 38,
    usage: 89,
  },
  {
    id: "12",
    name: "Railway",
    email: "billing@railway.app",
    plan: "Pro",
    mrr: 96,
    status: "at-risk",
    joined: "2024-08-30",
    lastActive: "2025-01-28",
    seats: 2,
    usage: 31,
  },
  {
    id: "13",
    name: "Resend",
    email: "team@resend.com",
    plan: "Starter",
    mrr: 29,
    status: "active",
    joined: "2024-11-15",
    lastActive: "2025-02-06",
    seats: 1,
    usage: 45,
  },
  {
    id: "14",
    name: "Clerk",
    email: "finance@clerk.dev",
    plan: "Team",
    mrr: 680,
    status: "active",
    joined: "2024-01-25",
    lastActive: "2025-02-08",
    seats: 18,
    usage: 92,
  },
  {
    id: "15",
    name: "Prisma",
    email: "enterprise@prisma.io",
    plan: "Enterprise",
    mrr: 2400,
    status: "active",
    joined: "2023-07-11",
    lastActive: "2025-02-08",
    seats: 48,
    usage: 86,
  },
  {
    id: "16",
    name: "Retool",
    email: "accounts@retool.com",
    plan: "Team",
    mrr: 0,
    status: "churned",
    joined: "2023-12-01",
    lastActive: "2024-11-18",
    seats: 12,
    usage: 0,
  },
  {
    id: "17",
    name: "Datadog",
    email: "procurement@datadoghq.com",
    plan: "Enterprise",
    mrr: 5200,
    status: "active",
    joined: "2023-02-20",
    lastActive: "2025-02-08",
    seats: 104,
    usage: 98,
  },
  {
    id: "18",
    name: "Sentry",
    email: "billing@sentry.io",
    plan: "Team",
    mrr: 340,
    status: "at-risk",
    joined: "2024-05-18",
    lastActive: "2025-01-22",
    seats: 9,
    usage: 38,
  },
  {
    id: "19",
    name: "Algolia",
    email: "subscriptions@algolia.com",
    plan: "Pro",
    mrr: 192,
    status: "active",
    joined: "2024-07-03",
    lastActive: "2025-02-05",
    seats: 4,
    usage: 67,
  },
  {
    id: "20",
    name: "Twilio",
    email: "enterprise@twilio.com",
    plan: "Enterprise",
    mrr: 2900,
    status: "active",
    joined: "2023-06-28",
    lastActive: "2025-02-08",
    seats: 58,
    usage: 91,
  },
];

export function getCustomerSegments() {
  const active = customers.filter((c) => c.status === "active").length;
  const atRisk = customers.filter((c) => c.status === "at-risk").length;
  const churned = customers.filter((c) => c.status === "churned").length;
  return { active, atRisk, churned, total: customers.length };
}

// Analytics data

// Cohort retention - realistic SaaS retention curve
export const cohortData = [
  { cohort: "Jul 2024", month0: 100, month1: 82, month2: 71, month3: 64, month4: 58, month5: 54, users: 312 },
  { cohort: "Aug 2024", month0: 100, month1: 79, month2: 68, month3: 61, month4: 56, month5: null, users: 287 },
  { cohort: "Sep 2024", month0: 100, month1: 84, month2: 73, month3: 66, month4: null, month5: null, users: 341 },
  { cohort: "Oct 2024", month0: 100, month1: 81, month2: 69, month3: null, month4: null, month5: null, users: 298 },
  { cohort: "Nov 2024", month0: 100, month1: 85, month2: null, month3: null, month4: null, month5: null, users: 356 },
  { cohort: "Dec 2024", month0: 100, month1: null, month2: null, month3: null, month4: null, month5: null, users: 299 },
];

// Acquisition funnel - realistic conversion rates
export const funnelData = [
  { stage: "Website Visitors", count: 48200, rate: 100 },
  { stage: "Signups", count: 3856, rate: 8.0 },
  { stage: "Activated Trial", count: 1928, rate: 50.0 },
  { stage: "Trial Completed", count: 867, rate: 45.0 },
  { stage: "Paid Customers", count: 472, rate: 54.4 },
];

// Churn by reason
export const churnReasons = [
  { reason: "Price too high", count: 23, pct: 28 },
  { reason: "Missing features", count: 19, pct: 23 },
  { reason: "Switched competitor", count: 14, pct: 17 },
  { reason: "No longer needed", count: 12, pct: 15 },
  { reason: "Poor support experience", count: 8, pct: 10 },
  { reason: "Other / unknown", count: 6, pct: 7 },
];

// Monthly churn trend
export const churnTrend = [
  { month: "Jul", rate: 2.4, recovered: 0.3 },
  { month: "Aug", rate: 2.2, recovered: 0.4 },
  { month: "Sep", rate: 2.5, recovered: 0.2 },
  { month: "Oct", rate: 2.1, recovered: 0.5 },
  { month: "Nov", rate: 1.9, recovered: 0.4 },
  { month: "Dec", rate: 1.8, recovered: 0.3 },
];

// Net Revenue Retention over time
export const nrrHistory = [
  { month: "Jan", nrr: 104, expansion: 8, contraction: 4 },
  { month: "Feb", nrr: 106, expansion: 9, contraction: 3 },
  { month: "Mar", nrr: 103, expansion: 7, contraction: 4 },
  { month: "Apr", nrr: 108, expansion: 11, contraction: 3 },
  { month: "May", nrr: 105, expansion: 8, contraction: 3 },
  { month: "Jun", nrr: 109, expansion: 12, contraction: 3 },
  { month: "Jul", nrr: 107, expansion: 10, contraction: 3 },
  { month: "Aug", nrr: 104, expansion: 7, contraction: 3 },
  { month: "Sep", nrr: 111, expansion: 14, contraction: 3 },
  { month: "Oct", nrr: 108, expansion: 11, contraction: 3 },
  { month: "Nov", nrr: 112, expansion: 15, contraction: 3 },
  { month: "Dec", nrr: 114, expansion: 17, contraction: 3 },
];

// LTV distribution buckets
export const ltvDistribution = [
  { bucket: "$0-500", count: 412, pct: 22 },
  { bucket: "$500-1k", count: 523, pct: 28 },
  { bucket: "$1k-2k", count: 467, pct: 25 },
  { bucket: "$2k-5k", count: 298, pct: 16 },
  { bucket: "$5k-10k", count: 124, pct: 7 },
  { bucket: "$10k+", count: 69, pct: 4 },
];

// Revenue page data

export const revenueByPlan = {
  pro: { mrr: 18420, customers: 1284, percentOfTotal: 34.8 },
  team: { mrr: 22140, customers: 492, percentOfTotal: 41.9 },
  enterprise: { mrr: 12287, customers: 117, percentOfTotal: 23.3 },
};

export const billingCycles = {
  monthly: { mrr: 31708, percentage: 60 },
  annual: { mrr: 21139, percentage: 40 },
};

export const revenueMetrics = {
  nrr: 108.4, // Net Revenue Retention
  expansionMrr: 4820,
  contractionMrr: 1240,
  churnedMrr: 2180,
  newMrr: 3400,
};

export const mrrArrHistory = [
  { month: "Jan", mrr: 38200, arr: 458400 },
  { month: "Feb", mrr: 39800, arr: 477600 },
  { month: "Mar", mrr: 41500, arr: 498000 },
  { month: "Apr", mrr: 43200, arr: 518400 },
  { month: "May", mrr: 44100, arr: 529200 },
  { month: "Jun", mrr: 46800, arr: 561600 },
  { month: "Jul", mrr: 48200, arr: 578400 },
  { month: "Aug", mrr: 47900, arr: 574800 },
  { month: "Sep", mrr: 49500, arr: 594000 },
  { month: "Oct", mrr: 50800, arr: 609600 },
  { month: "Nov", mrr: 51200, arr: 614400 },
  { month: "Dec", mrr: 52847, arr: 634164 },
];

export const revenueChanges = [
  {
    id: 1,
    type: "expansion" as const,
    company: "Stripe",
    change: "Added 12 seats",
    delta: 504,
    previousMrr: 3696,
    newMrr: 4200,
    date: "Dec 18",
  },
  {
    id: 2,
    type: "upgrade" as const,
    company: "Figma",
    change: "Team → Enterprise",
    delta: 2400,
    previousMrr: 890,
    newMrr: 3290,
    date: "Dec 17",
  },
  {
    id: 3,
    type: "downgrade" as const,
    company: "Notion",
    change: "Enterprise → Team",
    delta: -1200,
    previousMrr: 2100,
    newMrr: 900,
    date: "Dec 16",
  },
  {
    id: 4,
    type: "churn" as const,
    company: "Webflow",
    change: "Cancelled subscription",
    delta: -890,
    previousMrr: 890,
    newMrr: 0,
    date: "Dec 15",
  },
  {
    id: 5,
    type: "expansion" as const,
    company: "Linear",
    change: "Added 8 seats",
    delta: 336,
    previousMrr: 1512,
    newMrr: 1848,
    date: "Dec 14",
  },
  {
    id: 6,
    type: "upgrade" as const,
    company: "Vercel",
    change: "Pro → Team",
    delta: 540,
    previousMrr: 144,
    newMrr: 684,
    date: "Dec 13",
  },
  {
    id: 7,
    type: "churn" as const,
    company: "Airtable",
    change: "Cancelled subscription",
    delta: -420,
    previousMrr: 420,
    newMrr: 0,
    date: "Dec 12",
  },
];

export const expansionBySource = [
  { source: "Seat additions", mrr: 2840, percentage: 59 },
  { source: "Plan upgrades", mrr: 1580, percentage: 33 },
  { source: "Add-ons", mrr: 400, percentage: 8 },
];
