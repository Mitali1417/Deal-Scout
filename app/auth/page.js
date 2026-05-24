import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Sparkles, TrendingDown, Bell, BarChart3 } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { APP_NAME, ROUTES } from "@/lib/constants";

export const metadata = {
  title: `Sign In — ${APP_NAME}`,
  description: "Sign in to Deal Scout to start tracking prices and receive alerts.",
};

const LEFT_PANEL_FEATURES = [
  {
    icon: TrendingDown,
    text: "Track prices across any online store",
  },
  {
    icon: Bell,
    text: "Get instant email alerts on price drops",
  },
  {
    icon: BarChart3,
    text: "View full price history with charts",
  },
];

export default async function AuthPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(ROUTES.DASHBOARD);
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel — brand / features ─────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] auth-panel-gradient flex-col justify-between p-10 xl:p-14 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/5 pointer-events-none" aria-hidden />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5 pointer-events-none" aria-hidden />

        {/* Logo */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg text-white">{APP_NAME}</span>
        </div>

        {/* Main copy */}
        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-3">
              Smart shopping starts here.
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              Join thousands of smart shoppers who use Deal Scout to track prices and never pay too much.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-3">
            {LEFT_PANEL_FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <Icon className="h-4 w-4 text-white" aria-hidden />
                </div>
                <span className="text-white/90 text-sm">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom note */}
        <p className="text-white/50 text-xs relative z-10">
          Free forever. No credit card required.
        </p>
      </div>

      {/* ── Right panel — auth form ────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="font-bold text-sm">{APP_NAME}</span>
          </div>

          <ThemeToggle />
        </div>

        {/* Centered form */}
        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <AuthCard />
        </div>

        {/* Footer note */}
        <div className="px-6 py-4 text-center border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <span className="underline underline-offset-2 cursor-pointer hover:text-foreground transition-colors">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline underline-offset-2 cursor-pointer hover:text-foreground transition-colors">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
