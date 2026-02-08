"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

type Action = {
  id: string;
  name: string;
  shortcut?: string;
  icon: React.ReactNode;
  href?: string;
  action?: () => void;
};

const navActions: Action[] = [
  {
    id: "dashboard",
    name: "Go to Dashboard",
    shortcut: "G O",
    href: "/",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    id: "revenue",
    name: "Go to Revenue",
    shortcut: "G R",
    href: "/revenue",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    id: "customers",
    name: "Go to Customers",
    shortcut: "G C",
    href: "/customers",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: "analytics",
    name: "Go to Analytics",
    shortcut: "G A",
    href: "/events",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    id: "settings",
    name: "Go to Settings",
    shortcut: "G S",
    href: "/settings",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const quickActions: Action[] = [
  {
    id: "export",
    name: "Export data",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    action: () => alert("Export started"),
  },
  {
    id: "share",
    name: "Share report",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
    action: () => alert("Share dialog"),
  },
];

const RECENT_SEARCHES_KEY = "pulse-recent-searches";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Filter actions based on search
  const filteredNav = navActions.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredQuick = quickActions.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );
  const allActions = [...filteredNav, ...filteredQuick];

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Save search to recent
  const saveSearch = useCallback((term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  }, [recentSearches]);

  // Execute action
  const executeAction = useCallback((action: Action) => {
    if (search) saveSearch(search);
    setIsOpen(false);
    setSearch("");
    if (action.href) {
      router.push(action.href);
    } else if (action.action) {
      action.action();
    }
  }, [router, search, saveSearch]);

  // Keyboard handler for opening palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, allActions.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (allActions[selectedIndex]) {
          executeAction(allActions[selectedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setSearch("");
        break;
    }
  }, [allActions, selectedIndex, executeAction]);

  if (!mounted) return null;
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      onClick={() => {
        setIsOpen(false);
        setSearch("");
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Dialog */}
      <div
        className="relative w-full max-w-lg bg-[var(--color-bg-raised)] border border-[var(--color-border)] rounded-xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border-subtle)]">
          <svg className="w-4 h-4 text-[var(--color-text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--color-text-tertiary)] bg-[var(--color-bg-elevated)] rounded">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {/* Recent searches */}
          {!search && recentSearches.length > 0 && (
            <div className="px-3 pb-2">
              <span className="text-[10px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider px-1">
                Recent
              </span>
              <div className="mt-1 space-y-0.5">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearch(term)}
                    className="w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] transition-colors text-left"
                  >
                    <svg className="w-3.5 h-3.5 text-[var(--color-text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          {filteredNav.length > 0 && (
            <div className="px-3 py-2">
              <span className="text-[10px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider px-1">
                Navigation
              </span>
              <div className="mt-1 space-y-0.5">
                {filteredNav.map((action, i) => (
                  <ActionItem
                    key={action.id}
                    action={action}
                    isSelected={selectedIndex === i}
                    onSelect={() => executeAction(action)}
                    onHover={() => setSelectedIndex(i)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {filteredQuick.length > 0 && (
            <div className="px-3 py-2">
              <span className="text-[10px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider px-1">
                Actions
              </span>
              <div className="mt-1 space-y-0.5">
                {filteredQuick.map((action, i) => (
                  <ActionItem
                    key={action.id}
                    action={action}
                    isSelected={selectedIndex === filteredNav.length + i}
                    onSelect={() => executeAction(action)}
                    onHover={() => setSelectedIndex(filteredNav.length + i)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {search && allActions.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-[var(--color-text-tertiary)]">No results found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-[10px] text-[var(--color-text-tertiary)]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-[var(--color-bg-elevated)] rounded font-mono">↑</kbd>
              <kbd className="px-1 py-0.5 bg-[var(--color-bg-elevated)] rounded font-mono">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-[var(--color-bg-elevated)] rounded font-mono">↵</kbd>
              to select
            </span>
          </div>
          <span className="text-[var(--color-accent)]">Pulse</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.96) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.15s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>,
    document.body
  );
}

function ActionItem({ action, isSelected, onSelect, onHover }: {
  action: Action;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      onMouseEnter={onHover}
      className={`w-full flex items-center justify-between px-2 py-2 rounded-md text-left transition-colors ${
        isSelected
          ? "bg-[var(--color-accent)]/10 text-[var(--color-text)]"
          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={isSelected ? "text-[var(--color-accent)]" : "text-[var(--color-text-tertiary)]"}>
          {action.icon}
        </span>
        <span className="text-sm">{action.name}</span>
      </div>
      {action.shortcut && (
        <kbd className="text-[10px] font-mono text-[var(--color-text-tertiary)]">
          {action.shortcut}
        </kbd>
      )}
    </button>
  );
}
