import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export function Card({ children, className = "", glow = false, hover = true }: CardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-[var(--color-obsidian-surface)] to-[var(--color-obsidian-elevated)]
        border border-[var(--color-border-subtle)]
        ${hover ? "transition-all duration-300 hover:border-[var(--color-border-default)] hover:shadow-lg hover:-translate-y-0.5" : ""}
        ${glow ? "shadow-[var(--shadow-glow-sm)]" : ""}
        ${className}
      `}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-purple)]/5 to-transparent pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
      
      {/* Glow effect on hover */}
      {hover && (
        <div className="absolute -inset-px bg-gradient-to-r from-[var(--color-accent-purple)]/20 via-transparent to-[var(--color-accent-cyan)]/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      )}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`p-6 border-b border-[var(--color-border-subtle)] ${className}`}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return (
    <h3 className={`font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--color-text-primary)] ${className}`}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className = "" }: CardDescriptionProps) {
  return (
    <p className={`text-sm text-[var(--color-text-secondary)] mt-1 ${className}`}>
      {children}
    </p>
  );
}
