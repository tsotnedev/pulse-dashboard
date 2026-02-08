import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export function Input({ label, error, icon, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-[var(--color-surface)] border rounded-lg text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-colors ${
            icon ? "pl-10 pr-4" : "px-4"
          } py-2.5 ${
            error
              ? "border-[var(--color-danger)]"
              : "border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-[var(--color-danger)]">{error}</p>
      )}
    </div>
  );
}
