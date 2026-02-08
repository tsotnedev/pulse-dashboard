import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180",
    changeType: "positive" as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Conversion Rate",
    value: "12.5%",
    change: "-2.4%",
    changeType: "negative" as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: "Avg. Session",
    value: "4m 32s",
    change: "+45s",
    changeType: "positive" as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const recentActivity = [
  { user: "Sarah Chen", action: "upgraded to Pro", time: "2 min ago", avatar: "SC" },
  { user: "Mike Johnson", action: "completed onboarding", time: "15 min ago", avatar: "MJ" },
  { user: "Emily Davis", action: "invited 3 team members", time: "1 hour ago", avatar: "ED" },
  { user: "Alex Kim", action: "created new workspace", time: "2 hours ago", avatar: "AK" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--color-text-primary)]">
            Dashboard
          </h1>
          <p className="mt-1 text-[var(--color-text-secondary)]">
            Welcome back, here&apos;s what&apos;s happening with your business today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export
          </Button>
          <Button variant="primary" glow>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} glow={index === 0}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-[var(--color-accent-purple)]/10 text-[var(--color-accent-purple)]">
                  {stat.icon}
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.changeType === "positive"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-[var(--color-text-secondary)]">{stat.title}</p>
                <p className="mt-1 text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-text-primary)]">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the past year</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">Week</Button>
                <Button variant="secondary" size="sm">Month</Button>
                <Button variant="ghost" size="sm">Year</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Chart placeholder */}
            <div className="h-64 flex items-center justify-center">
              <div className="flex items-end gap-3 h-48">
                {[40, 65, 45, 80, 55, 90, 75, 85, 60, 95, 70, 88].map((height, i) => (
                  <div
                    key={i}
                    className="w-8 rounded-t-lg bg-gradient-to-t from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user actions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-[var(--color-obsidian-hover)]/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent-purple)]/80 to-[var(--color-accent-cyan)]/80 flex items-center justify-center text-white font-medium text-xs">
                    {activity.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--color-text-primary)]">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-[var(--color-text-secondary)]">{activity.action}</span>
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Components Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Design System Components</CardTitle>
          <CardDescription>A preview of the Obsidian design system in action</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buttons */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Buttons</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="primary" glow>With Glow</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Inputs</h4>
              <Input placeholder="Default input field" />
              <Input 
                placeholder="With icon"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                }
              />
              <Input label="With Label" placeholder="Enter your email" />
              <Input error="This field is required" placeholder="Error state" />
            </div>
          </div>

          {/* Color Palette */}
          <div className="mt-8 pt-8 border-t border-[var(--color-border-subtle)]">
            <h4 className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">Color Palette</h4>
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-[var(--color-obsidian-deep)] border border-[var(--color-border-subtle)]"></div>
                <span className="text-xs text-[var(--color-text-muted)]">Deep</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-[var(--color-obsidian-base)] border border-[var(--color-border-subtle)]"></div>
                <span className="text-xs text-[var(--color-text-muted)]">Base</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-[var(--color-obsidian-surface)] border border-[var(--color-border-subtle)]"></div>
                <span className="text-xs text-[var(--color-text-muted)]">Surface</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-[var(--color-obsidian-elevated)] border border-[var(--color-border-subtle)]"></div>
                <span className="text-xs text-[var(--color-text-muted)]">Elevated</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-[var(--color-accent-purple)] shadow-[var(--shadow-glow-sm)]"></div>
                <span className="text-xs text-[var(--color-text-muted)]">Purple</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-[var(--color-accent-cyan)] shadow-[var(--shadow-glow-cyan)]"></div>
                <span className="text-xs text-[var(--color-text-muted)]">Cyan</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
