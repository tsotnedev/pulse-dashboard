// Realistic SaaS mock data

export const kpiData = {
  mrr: {
    value: 48420,
    change: 12.5,
    trend: "up" as const,
  },
  arr: {
    value: 581040,
    change: 12.5,
    trend: "up" as const,
  },
  activeCustomers: {
    value: 1247,
    change: 8.3,
    trend: "up" as const,
  },
  churnRate: {
    value: 2.4,
    change: -0.3,
    trend: "down" as const, // down is good for churn
  },
};

export const revenueData = [
  { month: "Jan", revenue: 32400, customers: 890 },
  { month: "Feb", revenue: 34200, customers: 920 },
  { month: "Mar", revenue: 36100, customers: 965 },
  { month: "Apr", revenue: 35800, customers: 980 },
  { month: "May", revenue: 38500, customers: 1020 },
  { month: "Jun", revenue: 41200, customers: 1080 },
  { month: "Jul", revenue: 43800, customers: 1120 },
  { month: "Aug", revenue: 42600, customers: 1140 },
  { month: "Sep", revenue: 45200, customers: 1180 },
  { month: "Oct", revenue: 46800, customers: 1210 },
  { month: "Nov", revenue: 47500, customers: 1230 },
  { month: "Dec", revenue: 48420, customers: 1247 },
];

export const customerGrowthData = [
  { month: "Jan", newCustomers: 45, churned: 12 },
  { month: "Feb", newCustomers: 52, churned: 8 },
  { month: "Mar", newCustomers: 68, churned: 15 },
  { month: "Apr", newCustomers: 41, churned: 18 },
  { month: "May", newCustomers: 62, churned: 14 },
  { month: "Jun", newCustomers: 78, churned: 11 },
  { month: "Jul", newCustomers: 55, churned: 9 },
  { month: "Aug", newCustomers: 48, churned: 16 },
  { month: "Sep", newCustomers: 59, churned: 12 },
  { month: "Oct", newCustomers: 52, churned: 10 },
  { month: "Nov", newCustomers: 44, churned: 8 },
  { month: "Dec", newCustomers: 38, churned: 6 },
];

export const recentTransactions = [
  {
    id: "TXN-001",
    customer: "Dropbox",
    email: "billing@dropbox.com",
    amount: 2400,
    plan: "Enterprise",
    date: "2 min ago",
    status: "completed" as const,
  },
  {
    id: "TXN-002",
    customer: "Notion",
    email: "accounts@notion.so",
    amount: 1200,
    plan: "Team",
    date: "18 min ago",
    status: "completed" as const,
  },
  {
    id: "TXN-003",
    customer: "Linear",
    email: "finance@linear.app",
    amount: 800,
    plan: "Pro",
    date: "1 hour ago",
    status: "completed" as const,
  },
  {
    id: "TXN-004",
    customer: "Vercel",
    email: "billing@vercel.com",
    amount: 3600,
    plan: "Enterprise",
    date: "2 hours ago",
    status: "completed" as const,
  },
  {
    id: "TXN-005",
    customer: "Stripe",
    email: "accounts@stripe.com",
    amount: 2400,
    plan: "Enterprise",
    date: "3 hours ago",
    status: "pending" as const,
  },
];

export const planDistribution = [
  { name: "Free", value: 420, color: "#71717a" },
  { name: "Pro", value: 512, color: "#a78bfa" },
  { name: "Team", value: 215, color: "#22d3ee" },
  { name: "Enterprise", value: 100, color: "#22c55e" },
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}
