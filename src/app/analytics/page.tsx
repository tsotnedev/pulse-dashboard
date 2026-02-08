"use client";

import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell
} from "recharts";
import {
  cohortData, funnelData, churnReasons, churnTrend,
  nrrHistory, ltvDistribution
} from "@/lib/data";

export default function Analytics() {
  return (
    <div className="px-8 py-6 max-w-7xl 2xl:max-w-[1600px] mx-auto animate-slide-up">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-xl font-medium text-[var(--color-text)] mb-1">Analytics</h1>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            Retention, acquisition, and revenue health
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-1.5 text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-raised)] border border-[var(--color-border)] rounded-md appearance-none cursor-pointer">
            <option>Last 6 months</option>
            <option>Last 12 months</option>
            <option>All time</option>
          </select>
        </div>
      </header>

      {/* Cohort Retention Heatmap */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
            Cohort Retention
          </span>
          <span className="text-xs text-[var(--color-text-tertiary)]">
            % of users retained each month
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[var(--color-text-tertiary)]">
                <th className="py-2 pr-4 font-medium">Cohort</th>
                <th className="py-2 px-2 font-medium text-center w-12">Users</th>
                <th className="py-2 px-2 font-medium text-center w-14">M0</th>
                <th className="py-2 px-2 font-medium text-center w-14">M1</th>
                <th className="py-2 px-2 font-medium text-center w-14">M2</th>
                <th className="py-2 px-2 font-medium text-center w-14">M3</th>
                <th className="py-2 px-2 font-medium text-center w-14">M4</th>
                <th className="py-2 px-2 font-medium text-center w-14">M5</th>
              </tr>
            </thead>
            <tbody>
              {cohortData.map((row) => (
                <tr key={row.cohort} className="border-t border-[var(--color-border-subtle)]">
                  <td className="py-2 pr-4 text-[var(--color-text-secondary)]">{row.cohort}</td>
                  <td className="py-2 px-2 text-center tabular-nums text-[var(--color-text-tertiary)]">
                    {row.users}
                  </td>
                  <CohortCell value={row.month0} />
                  <CohortCell value={row.month1} />
                  <CohortCell value={row.month2} />
                  <CohortCell value={row.month3} />
                  <CohortCell value={row.month4} />
                  <CohortCell value={row.month5} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-4 mt-4 text-[10px] text-[var(--color-text-tertiary)]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded" style={{ background: "rgba(45, 212, 191, 0.7)" }}></span>
            High (&gt;70%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded" style={{ background: "rgba(45, 212, 191, 0.35)" }}></span>
            Medium (50-70%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded" style={{ background: "rgba(45, 212, 191, 0.15)" }}></span>
            Low (&lt;50%)
          </span>
        </div>
      </section>

      {/* Two-column: Funnel + Churn */}
      <section className="grid grid-cols-2 gap-10 mb-12">
        {/* Acquisition Funnel */}
        <div>
          <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-4">
            Acquisition Funnel
          </span>
          <div className="space-y-2">
            {funnelData.map((step, i) => {
              const prevCount = i > 0 ? funnelData[i - 1].count : step.count;
              const dropoff = i > 0 ? ((1 - step.count / prevCount) * 100).toFixed(0) : null;
              
              return (
                <div key={step.stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[var(--color-text)]">{step.stage}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm tabular-nums mono text-[var(--color-text-secondary)]">
                        {step.count.toLocaleString()}
                      </span>
                      {i > 0 && (
                        <span className="text-[10px] text-[var(--color-negative)] w-10 text-right">
                          -{dropoff}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="h-2 bg-[var(--color-bg-elevated)] rounded overflow-hidden">
                    <div
                      className="h-full rounded transition-all duration-500"
                      style={{
                        width: `${(step.count / funnelData[0].count) * 100}%`,
                        background: i === funnelData.length - 1
                          ? "var(--color-accent)"
                          : "var(--color-text-tertiary)"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--color-border-subtle)]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-tertiary)]">Visitor → Paid conversion</span>
              <span className="text-[var(--color-accent)] font-medium tabular-nums">
                {((funnelData[4].count / funnelData[0].count) * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Churn Analysis */}
        <div>
          <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-4">
            Churn Reasons
          </span>
          <div className="space-y-2.5">
            {churnReasons.map((item) => (
              <div key={item.reason} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[var(--color-text-secondary)]">{item.reason}</span>
                    <span className="text-xs tabular-nums text-[var(--color-text-tertiary)]">
                      {item.count} · {item.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[var(--color-bg-elevated)] rounded overflow-hidden">
                    <div
                      className="h-full rounded bg-[var(--color-negative)]"
                      style={{ width: `${item.pct}%`, opacity: 0.4 + (item.pct / 100) * 0.6 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--color-border-subtle)] grid grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-medium text-[var(--color-text)] tabular-nums">82</p>
              <p className="text-xs text-[var(--color-text-tertiary)]">Total churned (6mo)</p>
            </div>
            <div>
              <p className="text-lg font-medium text-[var(--color-negative)] tabular-nums">-$4,230</p>
              <p className="text-xs text-[var(--color-text-tertiary)]">Revenue lost</p>
            </div>
          </div>
        </div>
      </section>

      {/* Net Revenue Retention */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-1">
              Net Revenue Retention
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tabular-nums text-[var(--color-text)]">
                114%
              </span>
              <span className="text-xs text-[var(--color-positive)]">+6% vs 6mo ago</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-[var(--color-text-tertiary)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
              NRR
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-positive)]"></span>
              Expansion
            </span>
          </div>
        </div>
        <div className="h-48 -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={nrrHistory} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="nrrGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.2} />
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
                domain={[95, 120]}
                tickFormatter={(v) => `${v}%`}
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
                  `${value}%`,
                  name === "nrr" ? "NRR" : name === "expansion" ? "Expansion" : "Contraction"
                ]}
              />
              <ReferenceLine y={100} stroke="#333" strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="nrr"
                stroke="#2dd4bf"
                strokeWidth={2}
                fill="url(#nrrGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Two-column: Churn Trend + LTV Distribution */}
      <section className="grid grid-cols-5 gap-10">
        {/* Churn Trend - smaller */}
        <div className="col-span-2">
          <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-4">
            Churn Rate Trend
          </span>
          <div className="h-40 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={churnTrend} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="churnGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f87171" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#555", fontSize: 10 }}
                  dy={6}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#555", fontSize: 10 }}
                  domain={[0, 3]}
                  tickFormatter={(v) => `${v}%`}
                  width={32}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #222",
                    borderRadius: "6px",
                    fontSize: "11px",
                  }}
                  formatter={(value, name) => [
                    `${value}%`,
                    name === "rate" ? "Churn" : "Recovered"
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#f87171"
                  strokeWidth={1.5}
                  fill="url(#churnGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-2">
            Trending down <span className="text-[var(--color-positive)]">-0.6%</span> over 6 months
          </p>
        </div>

        {/* LTV Distribution */}
        <div className="col-span-3">
          <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-4">
            Customer Lifetime Value
          </span>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ltvDistribution} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis
                  dataKey="bucket"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#555", fontSize: 10 }}
                  dy={6}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#555", fontSize: 10 }}
                  width={32}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #222",
                    borderRadius: "6px",
                    fontSize: "11px",
                  }}
                  formatter={(value, name) => [
                    `${value} customers`,
                    "Count"
                  ]}
                  labelFormatter={(label) => `LTV: ${label}`}
                />
                <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                  {ltvDistribution.map((entry, index) => (
                    <Cell
                      key={entry.bucket}
                      fill={index >= 4 ? "#2dd4bf" : "#333"}
                      fillOpacity={index >= 4 ? 0.8 : 0.6}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-[var(--color-text-tertiary)]">
              Median LTV: <span className="text-[var(--color-text)]">$1,420</span>
            </span>
            <span className="text-[var(--color-text-tertiary)]">
              Top 10% contribute <span className="text-[var(--color-accent)]">38%</span> of revenue
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-6 border-t border-[var(--color-border-subtle)]">
        <p className="text-xs text-[var(--color-text-tertiary)]">
          Data from connected integrations · Updated hourly
        </p>
      </footer>
    </div>
  );
}

function CohortCell({ value }: { value: number | null }) {
  if (value === null) {
    return (
      <td className="py-2 px-2 text-center">
        <span className="text-[var(--color-text-tertiary)]">—</span>
      </td>
    );
  }

  // Calculate opacity based on retention percentage
  let opacity = 0.15;
  if (value >= 70) opacity = 0.7;
  else if (value >= 50) opacity = 0.35;

  return (
    <td className="py-2 px-2 text-center">
      <span
        className="inline-block w-full py-1 rounded text-[11px] tabular-nums font-medium"
        style={{
          background: `rgba(45, 212, 191, ${opacity})`,
          color: value >= 70 ? "#0c0c0c" : "var(--color-text)"
        }}
      >
        {value}%
      </span>
    </td>
  );
}
