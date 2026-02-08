import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  glow = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    font-medium rounded-xl
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-purple)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-obsidian-base)]
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-purple-dark)]
      text-white
      hover:from-[var(--color-accent-purple-light)] hover:to-[var(--color-accent-purple)]
      active:scale-[0.98]
      ${glow ? "shadow-[var(--shadow-glow-sm)] hover:shadow-[var(--shadow-glow-md)]" : "shadow-lg hover:shadow-xl"}
    `,
    secondary: `
      bg-[var(--color-obsidian-surface)]
      text-[var(--color-text-primary)]
      border border-[var(--color-border-default)]
      hover:bg-[var(--color-obsidian-elevated)]
      hover:border-[var(--color-border-strong)]
      active:scale-[0.98]
    `,
    ghost: `
      bg-transparent
      text-[var(--color-text-secondary)]
      hover:bg-[var(--color-obsidian-hover)]
      hover:text-[var(--color-text-primary)]
      active:scale-[0.98]
    `,
    outline: `
      bg-transparent
      text-[var(--color-accent-purple)]
      border border-[var(--color-accent-purple)]/50
      hover:bg-[var(--color-accent-purple)]/10
      hover:border-[var(--color-accent-purple)]
      active:scale-[0.98]
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600
      text-white
      hover:from-red-400 hover:to-red-500
      active:scale-[0.98]
      shadow-lg hover:shadow-xl
    `,
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 h-8",
    md: "text-sm px-4 py-2 h-10",
    lg: "text-base px-6 py-3 h-12",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {variant === "primary" && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
