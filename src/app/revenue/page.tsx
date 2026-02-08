"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  metrics,
  revenueByPlan,
  billingCycles,
  revenueMetrics,
  mrrArrHistory,
  revenueChanges,
  expansionBySource,
  formatMoney,
  formatMoneyFull,
} from "@/lib/data";

type ChartMode = "mrr" | "arr";

export default function RevenuePage() {
  const [chartMode, setChartMode] = useState<ChartMode>("mrr");

  return (
    <div className="px-8 py-6 max-w-7xl 2xl:max-w-[1600px] mx-auto animate-slide-up">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-xl font-medium text-[var(--color-text)] mb-1">
            Revenue
          </h1>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            Breakdown and movement analysis
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[var(--color-text-tertiary)]">Period:</span>
          <select className="bg-[var(--color-bg-raised)] border border-[var(--color-border)] rounded-md px-2 py-1.5 text-[var(--color-text-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]">
            <option>Last 12 months</option>
            <option>Last 6 months</option>
            <option>Last 30 days</option>
          </select>
        </div>
      </header>

      {/* Hero metrics row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div>
          <div className="flex items-end gap-3 mb-1">
            <span className="text-3xl font-semibold tracking-tight tabular-nums text-[var(--color-text)]">
              {formatMoneyFull(metrics.mrr)}
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-tertiary)]">
            MRR{" "}
            <span className="text-[var(--color-positive)]">
              +{metrics.mrrGrowth}%
            </span>
          </p>
        </div>
        <div>
          <div className="flex items-end gap-3 mb-1">
            <span className="text-3xl font-semibold tracking-tight tabular-nums text-[var(--color-text)]">
              {formatMoney(metrics.arr)}
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-tertiary)]">
            ARR · Annualized
          </p>
        </div>
        <div>
          <div className="flex items-end gap-3 mb-1">
            <span className="text-3xl font-semibold tracking-tight tabular-nums text-[var(--color-text)]">
              {revenueMetrics.nrr}%
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-tertiary)]">
            Net Revenue Retention
            <span
              className={
                revenueMetrics.nrr >= 100
                  ? "text-[var(--color-positive)] ml-1"
                  : "text-[var(--color-negative)] ml-1"
              }
            >
              {revenueMetrics.nrr >= 100 ? "Healthy" : "At risk"}
            </span>
          </p>
        </div>
        <div>
          <div className="flex items-end gap-3 mb-1">
            <span className="text-3xl font-semibold tracking-tight tabular-nums text-[var(--color-text)]">
              ${metrics.arpu}
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-tertiary)]">
            ARPU · Per user/mo
          </p>
        </div>
      </section>

      {/* Main chart with MRR/ARR toggle */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
            Revenue Growth
          </span>
          <div className="flex items-center gap-1 bg-[var(--color-bg-raised)] rounded-md p-0.5 border border-[var(--color-border-subtle)]">
            <button
              onClick={() => setChartMode("mrr")}
              className={`px-3 py-1 text-xs rounded transition-all ${
                chartMode === "mrr"
                  ? "bg-[var(--color-bg-elevated)] text-[var(--color-text)]"
                  : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
              }`}
            >
              MRR
            </button>
            <button
              onClick={() => setChartMode("arr")}
              className={`px-3 py-1 text-xs rounded transition-all ${
                chartMode === "arr"
                  ? "bg-[var(--color-bg-elevated)] text-[var(--color-text)]"
                  : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
              }`}
            >
              ARR
            </button>
          </div>
        </div>
        <div className="h-56 2xl:h-72 -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mrrArrHistory}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
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
                tickFormatter={(v) =>
                  chartMode === "mrr" ? `${v / 1000}k` : `${v / 1000}k`
                }
                width={50}
                domain={chartMode === "arr" ? [400000, "auto"] : ["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #222",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#888", marginBottom: 4 }}
                formatter={(value) => [
                  `$${(value as number).toLocaleString()}`,
                  chartMode === "mrr" ? "MRR" : "ARR",
                ]}
              />
              <Area
                type="monotone"
                dataKey={chartMode}
                stroke="#2dd4bf"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Left: Plan breakdown + Billing cycles */}
        <div className="lg:col-span-1 space-y-8">
          {/* Revenue by Plan */}
          <div>
            <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-4">
              By Plan
            </span>
            <div className="space-y-4">
              <PlanRow
                name="Pro"
                mrr={revenueByPlan.pro.mrr}
                customers={revenueByPlan.pro.customers}
                percentage={revenueByPlan.pro.percentOfTotal}
                color="var(--color-text-tertiary)"
              />
              <PlanRow
                name="Team"
                mrr={revenueByPlan.team.mrr}
                customers={revenueByPlan.team.customers}
                percentage={revenueByPlan.team.percentOfTotal}
                color="var(--color-accent)"
              />
              <PlanRow
                name="Enterprise"
                mrr={revenueByPlan.enterprise.mrr}
                customers={revenueByPlan.enterprise.customers}
                percentage={revenueByPlan.enterprise.percentOfTotal}
                color="var(--color-positive)"
              />
            </div>
          </div>

          {/* Monthly vs Annual */}
          <div>
            <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-4">
              Billing Cycle
            </span>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-text)]">Monthly</span>
                <span className="text-sm tabular-nums mono text-[var(--color-text-secondary)]">
                  {formatMoney(billingCycles.monthly.mrr)}{" "}
                  <span className="text-[var(--color-text-tertiary)]">
                    ({billingCycles.monthly.percentage}%)
                  </span>
                </span>
              </div>
              <div className="h-2 bg-[var(--color-bg-elevated)] rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[var(--color-text-tertiary)]"
                  style={{ width: `${billingCycles.monthly.percentage}%` }}
                />
                <div
                  className="h-full bg-[var(--color-accent)]"
                  style={{ width: `${billingCycles.annual.percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-text)]">Annual</span>
                <span className="text-sm tabular-nums mono text-[var(--color-text-secondary)]">
                  {formatMoney(billingCycles.annual.mrr)}{" "}
                  <span className="text-[var(--color-text-tertiary)]">
                    ({billingCycles.annual.percentage}%)
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Expansion Revenue */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
                Expansion MRR
              </span>
              <span className="text-sm font-medium tabular-nums text-[var(--color-positive)]">
                +{formatMoney(revenueMetrics.expansionMrr)}
              </span>
            </div>
            <div className="space-y-2.5">
              {expansionBySource.map((item) => (
                <div key={item.source}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[var(--color-text-secondary)]">
                      {item.source}
                    </span>
                    <span className="tabular-nums mono text-[var(--color-text-tertiary)]">
                      {formatMoney(item.mrr)}
                    </span>
                  </div>
                  <div className="h-1 bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-positive)] opacity-70"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Revenue changes */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
              Revenue Movements
            </span>
            <div className="flex items-center gap-4 text-[10px] text-[var(--color-text-tertiary)]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-positive)]" />
                Expansion
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                Upgrade
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-warning)]" />
                Downgrade
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-negative)]" />
                Churn
              </span>
            </div>
          </div>
          <div className="space-y-1">
            {revenueChanges.map((item) => (
              <RevenueChangeRow key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Movement summary */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[var(--color-bg-raised)] rounded-lg border border-[var(--color-border-subtle)]">
        <MovementMetric
          label="New MRR"
          value={revenueMetrics.newMrr}
          positive
        />
        <MovementMetric
          label="Expansion"
          value={revenueMetrics.expansionMrr}
          positive
        />
        <MovementMetric
          label="Contraction"
          value={-revenueMetrics.contractionMrr}
          positive={false}
        />
        <MovementMetric
          label="Churned"
          value={-revenueMetrics.churnedMrr}
          positive={false}
        />
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-6 border-t border-[var(--color-border-subtle)]">
        <p className="text-xs text-[var(--color-text-tertiary)]">
          Data syncs hourly from Stripe.{" "}
          <button className="text-[var(--color-accent)] hover:underline">
            View methodology →
          </button>
        </p>
      </footer>
    </div>
  );
}

function PlanRow({
  name,
  mrr,
  customers,
  percentage,
  color,
}: {
  name: string;
  mrr: number;
  customers: number;
  percentage: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-sm"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm text-[var(--color-text)]">{name}</span>
        </div>
        <span className="text-sm font-medium tabular-nums mono text-[var(--color-text)]">
          {formatMoney(mrr)}
        </span>
      </div>
      <div className="flex items-center justify-between text-[10px] text-[var(--color-text-tertiary)] ml-4">
        <span>{customers.toLocaleString()} customers</span>
        <span>{percentage}%</span>
      </div>
    </div>
  );
}

function RevenueChangeRow({
  type,
  company,
  change,
  delta,
  previousMrr,
  newMrr,
  date,
}: {
  type: "expansion" | "upgrade" | "downgrade" | "churn";
  company: string;
  change: string;
  delta: number;
  previousMrr: number;
  newMrr: number;
  date: string;
}) {
  const colors = {
    expansion: "bg-[var(--color-positive)]",
    upgrade: "bg-[var(--color-accent)]",
    downgrade: "bg-[var(--color-warning)]",
    churn: "bg-[var(--color-negative)]",
  };

  return (
    <div className="flex items-center gap-4 py-3 px-3 -mx-3 rounded-lg hover:bg-[var(--color-bg-raised)] transition-colors group cursor-pointer">
      <span className={`w-1.5 h-1.5 rounded-full ${colors[type]}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
            {company}
          </span>
        </div>
        <p className="text-xs text-[var(--color-text-tertiary)]">{change}</p>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
        <span className="tabular-nums mono">{formatMoney(previousMrr)}</span>
        <svg
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        <span className="tabular-nums mono">{formatMoney(newMrr)}</span>
      </div>
      <div className="text-right min-w-[70px]">
        <span
          className={`text-sm font-medium tabular-nums mono ${
            delta >= 0 ? "text-[var(--color-positive)]" : "text-[var(--color-negative)]"
          }`}
        >
          {delta >= 0 ? "+" : ""}
          {formatMoney(delta)}
        </span>
        <p className="text-[10px] text-[var(--color-text-tertiary)]">{date}</p>
      </div>
    </div>
  );
}

function MovementMetric({
  label,
  value,
  positive,
}: {
  label: string;
  value: number;
  positive: boolean;
}) {
  return (
    <div className="text-center">
      <span
        className={`text-lg font-medium tabular-nums mono ${
          positive ? "text-[var(--color-positive)]" : "text-[var(--color-negative)]"
        }`}
      >
        {value >= 0 ? "+" : ""}
        {formatMoney(value)}
      </span>
      <p className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">{label}</p>
    </div>
  );
}
