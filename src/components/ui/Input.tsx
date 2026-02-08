import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightIcon, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full rounded-xl
              bg-[var(--color-obsidian-surface)]
              border border-[var(--color-border-subtle)]
              text-[var(--color-text-primary)]
              placeholder:text-[var(--color-text-muted)]
              transition-all duration-200
              focus:outline-none
              focus:border-[var(--color-accent-purple)]
              focus:shadow-[var(--shadow-glow-sm)]
              hover:border-[var(--color-border-default)]
              disabled:opacity-50 disabled:cursor-not-allowed
              ${icon ? "pl-11" : "pl-4"}
              ${rightIcon ? "pr-11" : "pr-4"}
              py-3 text-sm
              ${error ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]" : ""}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full rounded-xl
            bg-[var(--color-obsidian-surface)]
            border border-[var(--color-border-subtle)]
            text-[var(--color-text-primary)]
            placeholder:text-[var(--color-text-muted)]
            transition-all duration-200
            focus:outline-none
            focus:border-[var(--color-accent-purple)]
            focus:shadow-[var(--shadow-glow-sm)]
            hover:border-[var(--color-border-default)]
            disabled:opacity-50 disabled:cursor-not-allowed
            px-4 py-3 text-sm
            min-h-[120px] resize-y
            ${error ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]" : ""}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
