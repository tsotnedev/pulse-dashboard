import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pulse — SaaS Analytics",
  description: "Track your SaaS metrics in real-time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-60 p-8 bg-[var(--color-bg-primary)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
