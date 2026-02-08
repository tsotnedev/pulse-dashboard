"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { name: "Overview", href: "/", shortcut: "G O", icon: "grid" },
  { name: "Revenue", href: "/revenue", shortcut: "G R", icon: "chart" },
  { name: "Customers", href: "/customers", shortcut: "G C", icon: "users" },
  { name: "Analytics", href: "/analytics", shortcut: "G A", icon: "analytics" },
  { name: "Events", href: "/events", shortcut: "G E", icon: "activity" },
];

const icons: Record<string, React.ReactNode> = {
  grid: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  chart: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  ),
  users: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  activity: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  ),
  analytics: (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
  ),
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-[var(--color-bg)] border-r border-[var(--color-border-subtle)] flex flex-col items-center py-4 z-50">
      {/* Logo */}
      <Link href="/" className="mb-8 group">
        <div className="w-9 h-9 rounded-lg bg-[var(--color-accent)] flex items-center justify-center transition-transform group-hover:scale-105">
          <span className="text-black font-bold text-sm">P</span>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1">
        {nav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${
                isActive
                  ? "bg-[var(--color-bg-elevated)] text-[var(--color-text)]"
                  : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]"
              }`}
            >
              {icons[item.icon]}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[var(--color-accent)] rounded-r" />
              )}
              
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap flex items-center gap-3">
                <span className="text-xs text-[var(--color-text)]">{item.name}</span>
                <kbd className="text-[10px] text-[var(--color-text-tertiary)] font-mono">{item.shortcut}</kbd>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col gap-1">
        <Link
          href="/settings"
          className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${
            pathname === "/settings"
              ? "bg-[var(--color-bg-elevated)] text-[var(--color-text)]"
              : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]"
          }`}
        >
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {pathname === "/settings" && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[var(--color-accent)] rounded-r" />
          )}
          {/* Tooltip */}
          <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap flex items-center gap-3">
            <span className="text-xs text-[var(--color-text)]">Settings</span>
            <kbd className="text-[10px] text-[var(--color-text-tertiary)] font-mono">G S</kbd>
          </div>
        </Link>
        <Link href="/settings" className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-[10px] font-medium text-white cursor-pointer hover:ring-2 ring-[var(--color-border)] transition-all">
          JD
        </Link>
      </div>
    </aside>
  );
}
