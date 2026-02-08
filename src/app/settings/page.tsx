"use client";

import { useState } from "react";

const teamMembers = [
  { name: "John Doe", email: "john@pulse.io", role: "Owner", avatar: "JD", status: "active" },
  { name: "Sarah Chen", email: "sarah@pulse.io", role: "Admin", avatar: "SC", status: "active" },
  { name: "Mike Torres", email: "mike@pulse.io", role: "Member", avatar: "MT", status: "pending" },
];

const apiKeys = [
  { name: "Production", key: "pk_live_51NxKQr2eZvKYlo2C7v9Xs...", created: "Nov 12, 2024", lastUsed: "2 hours ago" },
  { name: "Development", key: "pk_test_51NxKQr2eZvKYlo2C9f3Xs...", created: "Dec 3, 2024", lastUsed: "Just now" },
];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    newCustomer: true,
    churn: true,
    weeklyDigest: false,
    milestones: true,
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (key: string, name: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(name);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="px-8 py-6 max-w-4xl mx-auto animate-slide-up">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-xl font-medium text-[var(--color-text)] mb-1">Settings</h1>
        <p className="text-sm text-[var(--color-text-tertiary)]">
          Manage your account, team, and preferences
        </p>
      </header>

      {/* Profile Section */}
      <section className="mb-10">
        <SectionHeader title="Profile" />
        <div className="bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] rounded-lg p-5">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xl font-medium text-white shrink-0">
              JD
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Name" defaultValue="John Doe" />
                <InputField label="Email" defaultValue="john@pulse.io" type="email" />
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-tertiary)] block mb-1.5">Company</label>
                <input
                  type="text"
                  defaultValue="Pulse Analytics"
                  className="w-full px-3 py-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-[var(--color-border-subtle)] flex justify-end">
            <button className="px-4 py-2 text-xs font-medium text-black bg-[var(--color-accent)] rounded-md hover:opacity-90 transition-opacity">
              Save changes
            </button>
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="mb-10">
        <SectionHeader title="Notifications" />
        <div className="bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] rounded-lg divide-y divide-[var(--color-border-subtle)]">
          <ToggleRow
            title="New customers"
            description="Get notified when a new customer signs up"
            checked={notifications.newCustomer}
            onChange={() => setNotifications(n => ({ ...n, newCustomer: !n.newCustomer }))}
          />
          <ToggleRow
            title="Churn alerts"
            description="Immediate notification when a customer cancels"
            checked={notifications.churn}
            onChange={() => setNotifications(n => ({ ...n, churn: !n.churn }))}
          />
          <ToggleRow
            title="Weekly digest"
            description="Summary of key metrics every Monday"
            checked={notifications.weeklyDigest}
            onChange={() => setNotifications(n => ({ ...n, weeklyDigest: !n.weeklyDigest }))}
          />
          <ToggleRow
            title="Milestone alerts"
            description="Celebrate when you hit MRR milestones"
            checked={notifications.milestones}
            onChange={() => setNotifications(n => ({ ...n, milestones: !n.milestones }))}
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-10">
        <SectionHeader title="Team" action={{ label: "Invite member", onClick: () => {} }} />
        <div className="bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] rounded-lg divide-y divide-[var(--color-border-subtle)]">
          {teamMembers.map((member) => (
            <div key={member.email} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center text-xs font-medium text-[var(--color-text-secondary)]">
                  {member.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--color-text)]">{member.name}</span>
                    {member.status === "pending" && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-warning)]/10 text-[var(--color-warning)]">
                        Pending
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[var(--color-text-tertiary)]">{member.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-elevated)] px-2 py-1 rounded">
                  {member.role}
                </span>
                <button className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-negative)] transition-colors">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Billing Section */}
      <section className="mb-10">
        <SectionHeader title="Plan & Billing" />
        <div className="bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] rounded-lg p-5">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-medium text-[var(--color-text)]">Pro Plan</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium">
                  Current
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-tertiary)]">$49/month · Billed monthly</p>
            </div>
            <button className="px-3 py-1.5 text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md hover:bg-[var(--color-bg-hover)] transition-colors">
              Change plan
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-[var(--color-border-subtle)]">
            <div>
              <span className="text-xs text-[var(--color-text-tertiary)] block mb-1">Seats used</span>
              <span className="text-sm text-[var(--color-text)]">3 / 10</span>
            </div>
            <div>
              <span className="text-xs text-[var(--color-text-tertiary)] block mb-1">Next billing</span>
              <span className="text-sm text-[var(--color-text)]">Jan 15, 2025</span>
            </div>
            <div>
              <span className="text-xs text-[var(--color-text-tertiary)] block mb-1">Payment method</span>
              <span className="text-sm text-[var(--color-text)]">•••• 4242</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs">
            <button className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
              View invoices →
            </button>
            <button className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
              Update payment method →
            </button>
          </div>
        </div>
      </section>

      {/* API Keys Section */}
      <section className="mb-10">
        <SectionHeader title="API Keys" action={{ label: "Create key", onClick: () => {} }} />
        <div className="bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] rounded-lg divide-y divide-[var(--color-border-subtle)]">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.name} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--color-text)]">{apiKey.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(apiKey.key, apiKey.name)}
                    className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"
                  >
                    {copiedKey === apiKey.name ? (
                      <>
                        <CheckIcon />
                        Copied
                      </>
                    ) : (
                      <>
                        <CopyIcon />
                        Copy
                      </>
                    )}
                  </button>
                  <button className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-negative)] transition-colors">
                    Revoke
                  </button>
                </div>
              </div>
              <code className="text-xs font-mono text-[var(--color-text-secondary)] bg-[var(--color-bg-elevated)] px-2 py-1 rounded block mb-2">
                {apiKey.key}
              </code>
              <div className="flex items-center gap-4 text-[10px] text-[var(--color-text-tertiary)]">
                <span>Created {apiKey.created}</span>
                <span>Last used {apiKey.lastUsed}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data Export Section */}
      <section className="mb-10">
        <SectionHeader title="Data Export" />
        <div className="bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] rounded-lg p-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Export all your data including customers, revenue history, and events.
          </p>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md hover:bg-[var(--color-bg-hover)] transition-colors flex items-center gap-2">
              <DownloadIcon />
              Export as CSV
            </button>
            <button className="px-3 py-2 text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md hover:bg-[var(--color-bg-hover)] transition-colors flex items-center gap-2">
              <DownloadIcon />
              Export as JSON
            </button>
          </div>
          <p className="text-[10px] text-[var(--color-text-tertiary)] mt-3">
            Exports typically complete within a few minutes. You'll receive an email when ready.
          </p>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="mb-10">
        <SectionHeader title="Danger Zone" />
        <div className="border border-[var(--color-negative)]/20 rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-[var(--color-text)] block mb-1">Delete account</span>
              <span className="text-xs text-[var(--color-text-tertiary)]">
                Permanently delete your account and all associated data
              </span>
            </div>
            <button className="px-3 py-1.5 text-xs text-[var(--color-negative)] border border-[var(--color-negative)]/30 rounded-md hover:bg-[var(--color-negative)]/10 transition-colors">
              Delete account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-6 border-t border-[var(--color-border-subtle)]">
        <p className="text-xs text-[var(--color-text-tertiary)]">
          Press <kbd className="px-1.5 py-0.5 bg-[var(--color-bg-elevated)] rounded text-[10px] font-mono mx-1">⌘ K</kbd> to open command palette
        </p>
      </footer>
    </div>
  );
}

function SectionHeader({ title, action }: { title: string; action?: { label: string; onClick: () => void } }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
        {title}
      </span>
      {action && (
        <button
          onClick={action.onClick}
          className="text-xs text-[var(--color-accent)] hover:opacity-80 transition-opacity"
        >
          + {action.label}
        </button>
      )}
    </div>
  );
}

function InputField({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) {
  return (
    <div>
      <label className="text-xs text-[var(--color-text-tertiary)] block mb-1.5">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full px-3 py-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
      />
    </div>
  );
}

function ToggleRow({ title, description, checked, onChange }: {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <span className="text-sm text-[var(--color-text)] block">{title}</span>
        <span className="text-xs text-[var(--color-text-tertiary)]">{description}</span>
      </div>
      <button
        onClick={onChange}
        className={`relative w-10 h-5 rounded-full transition-colors ${
          checked ? "bg-[var(--color-accent)]" : "bg-[var(--color-bg-elevated)]"
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}
