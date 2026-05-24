import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { APP_NAME, ROUTES, NAV_LINKS } from "@/lib/constants";
import UserMenu from "./UserMenu";

export default function Navbar({ user, activePage }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link
          href={user ? ROUTES.DASHBOARD : ROUTES.HOME}
          className="flex items-center gap-2 font-semibold text-foreground hover:opacity-80 transition-opacity shrink-0"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-base font-bold">{APP_NAME}</span>
        </Link>

        {/* Landing nav links (shown only when no user) */}
        {!user && (
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* Dashboard breadcrumb */}
        {user && activePage && (
          <nav className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
            <Link href={ROUTES.DASHBOARD} className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </nav>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button asChild size="sm" className="font-medium">
              <Link href={ROUTES.AUTH}>Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
