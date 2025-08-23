import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wallet,
  ReceiptText,
  Activity,
  Rocket,
  Users,
  ShieldCheck,
  LineChart,
} from "lucide-react";

/** Stats with icons */
const stats = [
  { k: "1M+", v: "Wallets Created", sub: "Trusted users & agents onboarded", icon: Wallet },
  { k: "100M+", v: "Transactions", sub: "Processed securely & instantly", icon: ReceiptText },
  { k: "99.99%", v: "Uptime", sub: "Reliable system availability", icon: Activity },
] as const;

/** Timeline with icons */
const timeline = [
  {
    year: "2023",
    title: "E‑Pay Launched",
    desc:
      "Introduced a secure wallet system for Bangladesh with initial top‑up, cash‑in, and cash‑out features.",
    icon: Rocket,
  },
  {
    year: "2024",
    title: "Agent Network Expanded",
    desc:
      "Rolled out agent support across the country to enable cash‑in and cash‑out services.",
    icon: Users,
  },
  {
    year: "2025",
    title: "Role‑Based Platform",
    desc:
      "Introduced role‑based dashboards for Admins, Agents, and Users with advanced security.",
    icon: ShieldCheck,
  },
  {
    year: "2026",
    title: "Smart Transactions",
    desc:
      "Added transaction tracking, fee management, and commission history for agents.",
    icon: LineChart,
  },
] as const;

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:bg-gradient-to-r dark:from-black dark:via-emerald-900 dark:to-black">
      <section className="container mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-3" variant="secondary">
            Our Story
          </Badge>
          <h1 className="text-4xl font-bold text-foreground">
            Bangladesh’s Wallet for Everyone
          </h1>
          <p className="mt-4 text-muted-foreground">
            We built E‑Pay to make payments fast, inclusive, and secure — whether
            you’re sending money to family, paying a merchant, or topping up your phone.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card
                key={s.k}
                className="bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-lg"
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400/30 dark:bg-yellow-400/20">
                    <Icon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="text-3xl font-extrabold">{s.k}</div>
                  <div className="mt-1 font-medium">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground text-center">
            Milestones
          </h2>
          <div className="mt-8 relative before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:-translate-x-1/2 before:bg-foreground/10">
            <div className="grid gap-8">
              {timeline.map((t, i) => {
                const Icon = t.icon;
                const leftSide = i % 2 === 0; // alternate sides on md+
                return (
                  <div
                    key={t.year}
                    className={`grid md:grid-cols-2 gap-6 ${
                      leftSide ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    {/* Card */}
                    <div className={leftSide ? "order-2" : "order-2 md:order-1"}>
                      <Card className="bg-white/70 dark:bg-white/10">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/15 dark:bg-emerald-400/15">
                              <Icon className="h-4 w-4 text-indigo-600 dark:text-emerald-400" />
                            </div>
                            <span className="font-medium">{t.year}</span>
                          </div>
                          <div className="mt-2 text-lg font-semibold">{t.title}</div>
                          <p className="text-sm text-muted-foreground mt-2">{t.desc}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Spacer to align with center line */}
                    <div className={leftSide ? "order-1" : "order-1 md:order-2"} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
