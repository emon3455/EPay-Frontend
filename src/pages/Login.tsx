import LoginImage from "@/assets/images/login.png";
import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";
import { LoginForm } from "@/components/modules/Authentication/LoginForm";

export default function Login() {
  return (
    <div className="min-h-svh grid lg:grid-cols-2 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:bg-gradient-to-r dark:from-black dark:via-slate-900 dark:to-black">
      {/* Left: Form side */}
      <div className="relative flex flex-col p-6 md:p-10">
        {/* Top logo */}
        <div className="flex justify-center md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div>

        {/* Centered card */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-xl shadow-xl border border-white/30 dark:border-white/10 p-6 md:p-8">
              <LoginForm />
            </div>
            {/* Small footnote */}
            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing, you agree to E‑Pay’s Terms & Privacy.
            </p>
          </div>
        </div>

        {/* Ambient blobs */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-60 w-60 rounded-full bg-yellow-400/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-0 h-40 w-40 rounded-full bg-purple-400/20 blur-3xl" />
      </div>

      {/* Right: Visual side */}
      <div className="relative hidden lg:block w-full h-full">
        <img
          src={LoginImage}
          alt="E‑Pay — Payments made simple"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.55]"
        />
        {/* Overlay gradient + stats */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 h-full w-full p-10 flex flex-col justify-end gap-6 text-white">
          <div>
            <h3 className="text-3xl font-bold drop-shadow-sm">E‑Pay</h3>
            <p className="text-sm text-white/80 mt-1 max-w-sm">
              Fast, secure, and reliable digital wallet for Bangladesh — cash‑in, cash‑out, and instant transfers.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { k: "1M+", v: "Wallets" },
              { k: "100M+", v: "Transactions" },
              { k: "99.99%", v: "Uptime" },
            ].map((s) => (
              <div key={s.v} className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-4">
                <div className="text-xl font-extrabold">{s.k}</div>
                <div className="text-xs text-white/80">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
