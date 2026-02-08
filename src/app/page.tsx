import { KPICard } from "@/components/dashboard/KPICard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { CustomerGrowthChart } from "@/components/dashboard/CustomerGrowthChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { kpiData, formatCurrency, formatNumber, formatPercent } from "@/lib/data";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Overview</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Track your SaaS metrics and performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-accent)]">
            <option>Last 12 months</option>
            <option>Last 6 months</option>
            <option>Last 30 days</option>
          </select>
          <button className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Monthly Recurring Revenue"
          value={formatCurrency(kpiData.mrr.value)}
          change={formatPercent(kpiData.mrr.change)}
          trend={kpiData.mrr.trend}
        />
        <KPICard
          title="Annual Recurring Revenue"
          value={formatCurrency(kpiData.arr.value)}
          change={formatPercent(kpiData.arr.change)}
          trend={kpiData.arr.trend}
        />
        <KPICard
          title="Active Customers"
          value={formatNumber(kpiData.activeCustomers.value)}
          change={formatPercent(kpiData.activeCustomers.change)}
          trend={kpiData.activeCustomers.trend}
        />
        <KPICard
          title="Churn Rate"
          value={`${kpiData.churnRate.value}%`}
          change={`${kpiData.churnRate.change}%`}
          trend={kpiData.churnRate.trend}
          trendPositive={false}
        />
      </div>

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomerGrowthChart />
        <RecentTransactions />
      </div>
    </div>
  );
}
