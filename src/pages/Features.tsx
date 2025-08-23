/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  Banknote,
  Send,
  ShieldCheck,
  Users,
  FileText,
} from "lucide-react";

const consumer = [
  {
    icon: Wallet,
    title: "Wallet Management",
    desc: "Every user and agent gets a secure wallet automatically on registration.",
  },
  {
    icon: Send,
    title: "Instant Money Transfer",
    desc: "Send, receive, and request money instantly within the E-Pay network.",
  },
  {
    icon: Banknote,
    title: "Cash-in & Cash-out",
    desc: "Top up your wallet or withdraw cash easily via authorized agents.",
  },
];

const business = [
  {
    icon: ShieldCheck,
    title: "Role-Based Security",
    desc: "Admins, Agents, and Users have protected dashboards with tailored permissions.",
  },
  {
    icon: Users,
    title: "Agent Commission Tracking",
    desc: "Agents earn commission for cash-in and cash-out transactions with full visibility.",
  },
  {
    icon: FileText,
    title: "Complete Transaction History",
    desc: "Every transaction is logged and trackable for full transparency.",
  },
];

function FeatureGrid({
  items,
}: {
  items: { icon: any; title: string; desc: string }[];
}) {
  return (
    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((f) => (
        <Card
          key={f.title}
          className="bg-white/70 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/15 transition shadow-lg"
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <f.icon className="h-5 w-5" />
              <div className="font-semibold">{f.title}</div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function Features() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:bg-gradient-to-r dark:from-black dark:via-emerald-900 dark:to-black">
      <section className="container mx-auto px-6 py-16">
        <div className="text-center">
          <Badge variant="secondary">Features</Badge>
          <h1 className="mt-2 text-4xl font-bold text-foreground">
            Designed for Everyday Payments
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Whether you’re a user or a business, E‑Pay makes money movement
            effortless, secure, and rewarding.
          </p>
        </div>

        <Tabs defaultValue="consumer" className="mt-10">
          <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="consumer">For Consumers</TabsTrigger>
            <TabsTrigger value="business">For Business</TabsTrigger>
          </TabsList>
          <TabsContent value="consumer">
            <FeatureGrid items={consumer} />
          </TabsContent>
          <TabsContent value="business">
            <FeatureGrid items={business} />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
