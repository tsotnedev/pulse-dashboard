import { recentTransactions, formatCurrency } from "@/lib/data";

export function RecentTransactions() {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
      <div className="p-6 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Recent Transactions</h3>
            <p className="text-sm text-[var(--color-text-muted)]">Latest subscription payments</p>
          </div>
          <button className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium transition-colors">
            View all
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-[var(--color-border)]">
        {recentTransactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-[var(--color-surface-hover)] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center text-sm font-medium text-[var(--color-text-secondary)]">
                {tx.customer.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{tx.customer}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{tx.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="text-xs text-[var(--color-text-muted)] hidden sm:block">{tx.plan}</span>
              <span className="text-xs text-[var(--color-text-muted)] hidden md:block">{tx.date}</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  tx.status === "completed"
                    ? "bg-[var(--color-success-muted)] text-[var(--color-success)]"
                    : "bg-[var(--color-warning-muted)] text-[var(--color-warning)]"
                }`}
              >
                {tx.status}
              </span>
              <span className="text-sm font-semibold text-[var(--color-text-primary)] w-20 text-right">
                {formatCurrency(tx.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
