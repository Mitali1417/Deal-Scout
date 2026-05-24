import Link from "next/link";
import { Sparkles } from "lucide-react";
import { APP_NAME, ROUTES, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <Link
              href={ROUTES.HOME}
              className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity w-fit"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="font-bold text-sm">{APP_NAME}</span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-52 leading-relaxed">
              Track prices. Save money. Never miss a deal.
            </p>
          </div>
        </div> */}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {APP_NAME}. Made with care by Mitali.</p>
          <p>All prices are pulled live from their source pages.</p>
        </div>
      </div>
    </footer>
  );
}
