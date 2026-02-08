"use client";

import { useState, useMemo } from "react";
import { customers, getCustomerSegments, formatMoney, Customer, CustomerStatus, CustomerPlan } from "@/lib/data";

type SortKey = "name" | "plan" | "mrr" | "status" | "joined" | "lastActive";
type SortDir = "asc" | "desc";

const PLANS: CustomerPlan[] = ["Starter", "Pro", "Team", "Enterprise"];
const STATUSES: CustomerStatus[] = ["active", "at-risk", "churned"];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<CustomerPlan | "all">("all");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("mrr");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const segments = getCustomerSegments();

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      );
    }

    // Filters
    if (planFilter !== "all") {
      result = result.filter((c) => c.plan === planFilter);
    }
    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      let aVal: string | number = a[sortKey];
      let bVal: string | number = b[sortKey];

      if (sortKey === "joined" || sortKey === "lastActive") {
        aVal = new Date(aVal as string).getTime();
        bVal = new Date(bVal as string).getTime();
      }

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [search, planFilter, statusFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filteredCustomers.length / perPage);
  const paginatedCustomers = filteredCustomers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  return (
    <div className="px-8 py-6 max-w-7xl 2xl:max-w-[1600px] mx-auto animate-slide-up">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-xl font-medium text-[var(--color-text)] mb-1">
          Customers
        </h1>
        <p className="text-sm text-[var(--color-text-tertiary)]">
          {filteredCustomers.length} of {customers.length} customers
        </p>
      </header>

      {/* Segments */}
      <section className="grid grid-cols-3 gap-4 mb-8">
        <SegmentCard
          label="Active"
          count={segments.active}
          color="var(--color-positive)"
          onClick={() => {
            setStatusFilter("active");
            setPage(1);
          }}
          active={statusFilter === "active"}
        />
        <SegmentCard
          label="At Risk"
          count={segments.atRisk}
          color="var(--color-warning)"
          onClick={() => {
            setStatusFilter("at-risk");
            setPage(1);
          }}
          active={statusFilter === "at-risk"}
        />
        <SegmentCard
          label="Churned"
          count={segments.churned}
          color="var(--color-negative)"
          onClick={() => {
            setStatusFilter("churned");
            setPage(1);
          }}
          active={statusFilter === "churned"}
        />
      </section>

      {/* Filters row */}
      <section className="flex items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 bg-[var(--color-bg-raised)] border border-[var(--color-border)] rounded-md text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>

        {/* Plan filter */}
        <select
          value={planFilter}
          onChange={(e) => {
            setPlanFilter(e.target.value as CustomerPlan | "all");
            setPage(1);
          }}
          className="px-3 py-2 bg-[var(--color-bg-raised)] border border-[var(--color-border)] rounded-md text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
        >
          <option value="all">All Plans</option>
          {PLANS.map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as CustomerStatus | "all");
            setPage(1);
          }}
          className="px-3 py-2 bg-[var(--color-bg-raised)] border border-[var(--color-border)] rounded-md text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
        >
          <option value="all">All Status</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status === "at-risk" ? "At Risk" : status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>

        {/* Clear filters */}
        {(search || planFilter !== "all" || statusFilter !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setPlanFilter("all");
              setStatusFilter("all");
              setPage(1);
            }}
            className="px-3 py-2 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
          >
            Clear
          </button>
        )}
      </section>

      {/* Table */}
      <section className="border border-[var(--color-border)] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--color-bg-raised)]">
              <SortHeader
                label="Name"
                sortKey="name"
                currentKey={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              <SortHeader
                label="Plan"
                sortKey="plan"
                currentKey={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              <SortHeader
                label="MRR"
                sortKey="mrr"
                currentKey={sortKey}
                direction={sortDir}
                onSort={handleSort}
                align="right"
              />
              <SortHeader
                label="Status"
                sortKey="status"
                currentKey={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              <SortHeader
                label="Joined"
                sortKey="joined"
                currentKey={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              <SortHeader
                label="Last Active"
                sortKey="lastActive"
                currentKey={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                expanded={expandedId === customer.id}
                onToggle={() =>
                  setExpandedId(expandedId === customer.id ? null : customer.id)
                }
                formatDate={formatDate}
                getRelativeTime={getRelativeTime}
              />
            ))}
            {paginatedCustomers.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-sm text-[var(--color-text-tertiary)]"
                >
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="flex items-center justify-between mt-4">
          <p className="text-xs text-[var(--color-text-tertiary)]">
            Showing {(page - 1) * perPage + 1}–
            {Math.min(page * perPage, filteredCustomers.length)} of{" "}
            {filteredCustomers.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-2.5 py-1.5 text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-raised)] border border-[var(--color-border)] rounded-md hover:bg-[var(--color-bg-elevated)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 text-xs rounded-md transition-colors ${
                  p === page
                    ? "bg-[var(--color-accent)] text-black font-medium"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-2.5 py-1.5 text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-raised)] border border-[var(--color-border)] rounded-md hover:bg-[var(--color-bg-elevated)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

function SegmentCard({
  label,
  count,
  color,
  onClick,
  active,
}: {
  label: string;
  count: number;
  color: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border text-left transition-all ${
        active
          ? "bg-[var(--color-bg-elevated)] border-[var(--color-accent)]"
          : "bg-[var(--color-bg-raised)] border-[var(--color-border)] hover:border-[var(--color-text-tertiary)]"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        ></span>
        <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wide">
          {label}
        </span>
      </div>
      <span className="text-2xl font-semibold tabular-nums text-[var(--color-text)]">
        {count}
      </span>
    </button>
  );
}

function SortHeader({
  label,
  sortKey,
  currentKey,
  direction,
  onSort,
  align = "left",
}: {
  label: string;
  sortKey: SortKey;
  currentKey: SortKey;
  direction: SortDir;
  onSort: (key: SortKey) => void;
  align?: "left" | "right";
}) {
  const isActive = sortKey === currentKey;

  return (
    <th
      className={`px-4 py-3 text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wide cursor-pointer hover:text-[var(--color-text-secondary)] transition-colors select-none ${
        align === "right" ? "text-right" : "text-left"
      }`}
      onClick={() => onSort(sortKey)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {isActive && (
          <svg
            className={`w-3 h-3 transition-transform ${
              direction === "asc" ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </span>
    </th>
  );
}

function CustomerRow({
  customer,
  expanded,
  onToggle,
  formatDate,
  getRelativeTime,
}: {
  customer: Customer;
  expanded: boolean;
  onToggle: () => void;
  formatDate: (d: string) => string;
  getRelativeTime: (d: string) => string;
}) {
  const statusStyles = {
    active: {
      dot: "bg-[var(--color-positive)]",
      text: "text-[var(--color-positive)]",
      label: "Active",
    },
    "at-risk": {
      dot: "bg-[var(--color-warning)]",
      text: "text-[var(--color-warning)]",
      label: "At Risk",
    },
    churned: {
      dot: "bg-[var(--color-negative)]",
      text: "text-[var(--color-negative)]",
      label: "Churned",
    },
  };

  const planColors: Record<CustomerPlan, string> = {
    Starter: "bg-[var(--color-text-tertiary)]",
    Pro: "bg-blue-500",
    Team: "bg-violet-500",
    Enterprise: "bg-[var(--color-accent)]",
  };

  const { dot, label } = statusStyles[customer.status];

  return (
    <>
      <tr
        onClick={onToggle}
        className="border-t border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-raised)] cursor-pointer transition-colors group"
      >
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[var(--color-bg-elevated)] flex items-center justify-center text-xs font-medium text-[var(--color-text-secondary)]">
              {customer.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                {customer.name}
              </p>
              <p className="text-xs text-[var(--color-text-tertiary)]">
                {customer.email}
              </p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${planColors[customer.plan]} bg-opacity-15 text-[var(--color-text)]`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${planColors[customer.plan]}`}
            ></span>
            {customer.plan}
          </span>
        </td>
        <td className="px-4 py-3 text-right">
          <span className="text-sm font-medium tabular-nums mono text-[var(--color-text)]">
            {customer.mrr > 0 ? formatMoney(customer.mrr) : "—"}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="inline-flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
            <span className="text-xs text-[var(--color-text-secondary)]">
              {label}
            </span>
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="text-sm text-[var(--color-text-secondary)]">
            {formatDate(customer.joined)}
          </span>
        </td>
        <td className="px-4 py-3">
          <span
            className={`text-sm ${
              customer.status === "churned"
                ? "text-[var(--color-text-tertiary)]"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            {getRelativeTime(customer.lastActive)}
          </span>
        </td>
        <td className="px-4 py-3">
          <svg
            className={`w-4 h-4 text-[var(--color-text-tertiary)] transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-[var(--color-bg-raised)]">
          <td colSpan={7} className="px-4 py-4">
            <div className="grid grid-cols-4 gap-6 pl-11">
              <div>
                <p className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1">
                  Seats
                </p>
                <p className="text-sm font-medium text-[var(--color-text)] tabular-nums">
                  {customer.seats}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1">
                  Usage
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        customer.usage > 70
                          ? "bg-[var(--color-positive)]"
                          : customer.usage > 40
                          ? "bg-[var(--color-warning)]"
                          : "bg-[var(--color-negative)]"
                      }`}
                      style={{ width: `${customer.usage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs tabular-nums text-[var(--color-text-secondary)]">
                    {customer.usage}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1">
                  Annual Value
                </p>
                <p className="text-sm font-medium text-[var(--color-text)] tabular-nums mono">
                  {customer.mrr > 0 ? formatMoney(customer.mrr * 12) : "—"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1">
                  Customer Since
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {formatDate(customer.joined)}
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
