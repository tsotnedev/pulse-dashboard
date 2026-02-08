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
