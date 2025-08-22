import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

export default function Home() {
    const navigate = useNavigate()
  return (
    <div className="relative h-screen flex items-center justify-center  bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:bg-gradient-to-r dark:from-black dark:via-emerald-900 dark:to-black">
      {/* Overlay only for dark mode */}
      <div className="absolute inset-0 dark:bg-black/50"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg text-foreground">
          Welcome to <span className="text-yellow-500 dark:text-yellow-400">E-Pay</span>
        </h1>
        <p className="mt-6 text-lg lg:text-2xl font-medium text-muted-foreground max-w-2xl mx-auto">
          Your trusted digital wallet for fast, secure, and easy payments —
          anytime, anywhere in Bangladesh.
        </p>

        {/* Features */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/60 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:bg-white/70 dark:hover:bg-white/20 transition">
            <div className="text-4xl">💳</div>
            <h3 className="mt-4 text-xl font-semibold text-foreground">Instant Payments</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Send & receive money within seconds, without hassle.
            </p>
          </div>
          <div className="bg-white/60 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:bg-white/70 dark:hover:bg-white/20 transition">
            <div className="text-4xl">📱</div>
            <h3 className="mt-4 text-xl font-semibold text-foreground">Mobile Friendly</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Manage all your finances directly from your phone.
            </p>
          </div>
          <div className="bg-white/60 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:bg-white/70 dark:hover:bg-white/20 transition">
            <div className="text-4xl">🔒</div>
            <h3 className="mt-4 text-xl font-semibold text-foreground">Safe & Secure</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Bank-level security to protect your money & data.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <Button className="bg-yellow-400 text-black font-bold p-8 rounded-full text-lg shadow-xl hover:bg-yellow-300 transition cursor-pointer" onClick={() => {navigate('/register')}}>
            Get Started with E-Pay
          </Button>
        </div>
      </div>
    </div>
  )
}
