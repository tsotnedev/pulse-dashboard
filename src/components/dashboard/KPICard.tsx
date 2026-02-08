interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  trendPositive?: boolean; // For churn, down is positive
}

export function KPICard({ title, value, change, trend, trendPositive = true }: KPICardProps) {
  const isPositive = trendPositive ? trend === "up" : trend === "down";
  
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-border-hover)] transition-colors">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-[var(--color-text-secondary)]">{title}</span>
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
            isPositive
              ? "bg-[var(--color-success-muted)] text-[var(--color-success)]"
              : "bg-[var(--color-danger-muted)] text-[var(--color-danger)]"
          }`}
        >
          {trend === "up" ? (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          )}
          {change}
        </span>
      </div>
      <p className="text-3xl font-semibold text-[var(--color-text-primary)] tracking-tight">{value}</p>
    </div>
  );
}
