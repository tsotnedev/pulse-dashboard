"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { customerGrowthData } from "@/lib/data";

export function CustomerGrowthChart() {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Customer Growth</h3>
          <p className="text-sm text-[var(--color-text-muted)]">New vs churned customers</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--color-success)]"></div>
            <span className="text-[var(--color-text-secondary)]">New</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--color-danger)]"></div>
            <span className="text-[var(--color-text-secondary)]">Churned</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={customerGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#71717a", fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#71717a", fontSize: 12 }}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
              }}
              labelStyle={{ color: "#fafafa", fontWeight: 600, marginBottom: 4 }}
              cursor={{ fill: "rgba(167, 139, 250, 0.1)" }}
            />
            <Bar 
              dataKey="newCustomers" 
              fill="#22c55e" 
              radius={[4, 4, 0, 0]} 
              name="New Customers"
            />
            <Bar 
              dataKey="churned" 
              fill="#ef4444" 
              radius={[4, 4, 0, 0]} 
              name="Churned"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
