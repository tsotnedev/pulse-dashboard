"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { metrics, revenueHistory, recentActivity, topCustomers, formatMoney, formatMoneyFull } from "@/lib/data";

export default function Dashboard() {
  return (
    <div className="px-8 py-6 max-w-6xl animate-slide-up">
      {/* Header - minimal, not generic */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-medium text-[var(--color-text)]">December 2024</h1>
            <span className="text-xs text-[var(--color-text-tertiary)] bg-[var(--color-bg-elevated)] px-2 py-0.5 rounded">
              Live
            </span>
          </div>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            Last synced 2 minutes ago
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-raised)] border border-[var(--color-border)] rounded-md hover:bg-[var(--color-bg-elevated)] transition-colors">
            Export
          </button>
          <button className="px-3 py-1.5 text-xs text-black bg-[var(--color-accent)] rounded-md hover:opacity-90 transition-opacity font-medium">
            Share report
          </button>
        </div>
      </header>

      {/* Hero metric - MRR */}
      <section className="mb-10">
        <div className="flex items-end gap-4 mb-2">
          <span className="text-5xl font-semibold tracking-tight tabular-nums text-[var(--color-text)]">
            {formatMoneyFull(metrics.mrr)}
          </span>
          <span className="text-sm font-medium text-[var(--color-positive)] mb-2 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            {metrics.mrrGrowth}%
          </span>
        </div>
        <p className="text-sm text-[var(--color-text-tertiary)]">Monthly Recurring Revenue</p>
      </section>

      {/* Supporting metrics - asymmetric layout */}
      <section className="grid grid-cols-5 gap-6 mb-10">
        <MetricBlock 
          label="ARR" 
          value={formatMoney(metrics.arr)} 
          sub="Annual"
        />
        <MetricBlock 
          label="Customers" 
          value={metrics.customers.toLocaleString()} 
          change={`+${metrics.customersGrowth}`}
          positive
        />
        <MetricBlock 
          label="Churn" 
          value={`${metrics.churn}%`} 
          change={`${metrics.churnChange}%`}
          positive
        />
        <MetricBlock 
          label="ARPU" 
          value={`$${metrics.arpu}`} 
          sub="Per user"
        />
        <MetricBlock 
          label="LTV" 
          value={formatMoney(metrics.ltv)} 
          sub="Lifetime"
        />
      </section>

      {/* Chart - full width, minimal chrome */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
            MRR Growth
          </span>
          <div className="flex items-center gap-4 text-xs text-[var(--color-text-tertiary)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
              Actual
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-text-tertiary)] opacity-50"></span>
              Target
            </span>
          </div>
        </div>
        <div className="h-56 -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueHistory} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#555", fontSize: 11 }}
                dy={8}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#555", fontSize: 11 }}
                tickFormatter={(v) => `${v/1000}k`}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #222",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#888", marginBottom: 4 }}
                formatter={(value, name) => [
                  `$${(value as number).toLocaleString()}`,
                  name === "mrr" ? "MRR" : "Target"
                ]}
              />
              <ReferenceLine 
                y={50000} 
                stroke="#333" 
                strokeDasharray="4 4" 
                label={{ value: "Goal", position: "right", fill: "#555", fontSize: 10 }}
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="#333"
                strokeWidth={1}
                strokeDasharray="4 4"
                fill="none"
              />
              <Area
                type="monotone"
                dataKey="mrr"
                stroke="#2dd4bf"
                strokeWidth={2}
                fill="url(#mrrGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Two-column layout - activity + top customers */}
      <section className="grid grid-cols-3 gap-8">
        {/* Activity feed - 2 cols */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
              Recent Activity
            </span>
            <button className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]">
              View all →
            </button>
          </div>
          <div className="space-y-1">
            {recentActivity.map((item) => (
              <ActivityRow key={item.id} {...item} />
            ))}
          </div>
        </div>

        {/* Top customers - 1 col */}
        <div>
          <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-4">
            Top Accounts
          </span>
          <div className="space-y-3">
            {topCustomers.map((customer) => (
              <div key={customer.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-[var(--color-bg-elevated)] flex items-center justify-center text-[10px] font-medium text-[var(--color-text-secondary)]">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors cursor-pointer">
                      {customer.name}
                    </p>
                    <p className="text-[10px] text-[var(--color-text-tertiary)]">
                      {customer.seats} seats · Since {customer.since}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium tabular-nums mono text-[var(--color-text-secondary)]">
                  ${customer.mrr.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer hint */}
      <footer className="mt-16 pt-6 border-t border-[var(--color-border-subtle)]">
        <p className="text-xs text-[var(--color-text-tertiary)]">
          Press <kbd className="px-1.5 py-0.5 bg-[var(--color-bg-elevated)] rounded text-[10px] font-mono mx-1">⌘ K</kbd> to open command palette
        </p>
      </footer>
    </div>
  );
}

function MetricBlock({ label, value, sub, change, positive }: {
  label: string;
  value: string;
  sub?: string;
  change?: string;
  positive?: boolean;
}) {
  return (
    <div className="group">
      <div className="flex items-baseline gap-2 mb-0.5">
        <span className="text-lg font-medium tabular-nums text-[var(--color-text)]">{value}</span>
        {change && (
          <span className={`text-xs ${positive ? "text-[var(--color-positive)]" : "text-[var(--color-negative)]"}`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-xs text-[var(--color-text-tertiary)]">
        {label}
        {sub && <span className="opacity-60"> · {sub}</span>}
      </p>
    </div>
  );
}

function ActivityRow({ type, company, plan, amount, time }: {
  type: "upgrade" | "new" | "churn";
  company: string;
  plan: string;
  amount: number;
  time: string;
}) {
  const typeStyles = {
    upgrade: { dot: "bg-[var(--color-accent)]", label: "Upgraded" },
    new: { dot: "bg-[var(--color-positive)]", label: "New" },
    churn: { dot: "bg-[var(--color-negative)]", label: "Churned" },
  };
  
  const { dot, label } = typeStyles[type];
  
  return (
    <div className="flex items-center gap-4 py-2.5 px-3 -mx-3 rounded-lg hover:bg-[var(--color-bg-raised)] transition-colors group cursor-pointer">
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
            {company}
          </span>
          <span className="text-xs text-[var(--color-text-tertiary)]">{label}</span>
        </div>
        <p className="text-xs text-[var(--color-text-tertiary)] truncate">{plan}</p>
      </div>
      <div className="text-right">
        <span className={`text-sm font-medium tabular-nums mono ${amount >= 0 ? "text-[var(--color-text)]" : "text-[var(--color-negative)]"}`}>
          {amount >= 0 ? "+" : ""}{formatMoney(amount)}
        </span>
        <p className="text-[10px] text-[var(--color-text-tertiary)]">{time}</p>
      </div>
    </div>
  );
}
