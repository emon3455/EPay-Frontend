import RegisterImage from "@/assets/images/register.png";
import { Link } from "react-router-dom";
import Logo from "@/assets/icons/Logo";
import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-svh  grid lg:grid-cols-2 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:bg-gradient-to-r dark:from-black dark:via-slate-900 dark:to-black">
      {/* Visual side */}
      <div className="relative hidden lg:block">
        <img
          src={RegisterImage}
          alt="Create your E-Pay account"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Form side */}
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
              <RegisterForm />
            </div>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              By creating an account, you agree to E-Pay's Terms & Privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
