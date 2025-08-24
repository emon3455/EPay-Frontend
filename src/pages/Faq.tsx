import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";

const faqs = [
  {
    q: "What is E-Pay?",
    a: "E-Pay is a secure digital wallet platform designed for Bangladesh. It allows users to send and receive money instantly, add funds through agents or bank transfers, and withdraw cash conveniently. Think of it as a complete financial ecosystem — you can transfer money to friends and family, pay merchants, recharge mobile balances, and keep track of every transaction securely in one place.",
  },
  {
    q: "How do agents work?",
    a: "Agents act as the bridge between digital money and physical cash. Through their authorized accounts, agents can help customers add money (cash-in) to their wallets or withdraw money (cash-out) when needed. For every transaction they facilitate, agents earn commissions which are automatically recorded in the system, giving them a transparent way to monitor their earnings. Admins can also approve, suspend, or review agent activities to ensure service quality.",
  },
  {
    q: "What can admins do?",
    a: "Admins are the backbone of the platform’s security and governance. They can view all registered users, agents, wallets, and transaction histories. Admins have the authority to approve or suspend agents, block or unblock wallets, and monitor suspicious transactions in real time. They also ensure compliance with policies and may configure system rules like transaction fees, commission rates, and usage limits.",
  },
  {
    q: "Is my money safe?",
    a: "Absolutely. E-Pay uses bank-grade encryption to secure data, along with multi-layered authentication such as device binding and session validation. Every transaction is logged and auditable, so you can track exactly where your money goes. Additionally, suspicious activity is flagged by automated monitoring, ensuring that your wallet remains protected against fraud or misuse.",
  },
  {
    q: "Do users get a wallet automatically?",
    a: "Yes. As soon as a user or agent completes registration, a personal wallet is automatically created for them with an initial balance (৳50 by default). This ensures that every account holder has immediate access to E-Pay’s core services. From there, users can add money, make transfers, withdraw funds, and view their complete transaction history — all without needing any manual setup.",
  },
];


export default function Faq() {
  return (
    <main className="min-h-screen p-10">
      <section className="container mx-auto px-6 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground text-center">
          Frequently Asked Questions
        </h1>
        <Card className="mt-10 bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-xl">
          <CardContent className="p-2 sm:p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm">
          Didn’t find your answer?{" "}
          <Link to="/contact" className="underline">
            Contact support
          </Link>
        </div>
      </section>
    </main>
  );
}
