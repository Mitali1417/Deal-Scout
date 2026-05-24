import Link from "next/link";
import { AlertTriangle, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { APP_NAME, ROUTES } from "@/lib/constants";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: `Something went wrong — ${APP_NAME}`,
};

export default async function ErrorPage({ searchParams }) {
  const params = await searchParams;
  const reason =
    typeof params?.reason === "string" ? params.reason.trim() : "";

  const isProviderIssue =
    /not enabled|unsupported provider|validation_failed/i.test(reason);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar user={null} />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg space-y-6">
          {/* Error card */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm space-y-5">
            {/* Icon + title */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Something went wrong
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  We couldn&rsquo;t complete your sign-in.
                </p>
              </div>
            </div>

            {/* Error reason */}
            {reason && (
              <Alert variant="destructive" className="text-sm">
                <AlertTitle className="text-sm font-semibold">Error details</AlertTitle>
                <AlertDescription className="mt-1 break-words text-sm">
                  {reason}
                </AlertDescription>
              </Alert>
            )}

            {/* Guidance */}
            {isProviderIssue ? (
              <div className="rounded-xl bg-muted/50 border border-border p-4 space-y-2 text-sm">
                <p className="font-semibold text-foreground">Fix the Google provider:</p>
                <ol className="space-y-1.5 text-muted-foreground list-decimal pl-4">
                  <li>
                    In Supabase: <strong className="text-foreground">Authentication</strong> →{" "}
                    <strong className="text-foreground">Providers</strong> → enable{" "}
                    <strong className="text-foreground">Google</strong>.
                  </li>
                  <li>
                    Add your Google OAuth <strong className="text-foreground">Client ID</strong> and{" "}
                    <strong className="text-foreground">Client Secret</strong> from Google Cloud Console.
                  </li>
                  <li>
                    In Google Cloud, set the authorized redirect URI to your Supabase callback
                    (ends with{" "}
                    <code className="text-xs bg-muted rounded px-1 py-0.5">/auth/v1/callback</code>).
                  </li>
                </ol>
                <a
                  href="https://supabase.com/docs/guides/auth/social-login/auth-google"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary text-xs hover:underline mt-1"
                >
                  View Supabase docs
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed">
                This may be a temporary issue. Try signing in again from the home page.
                If the problem persists, check that your Supabase URL and API keys are
                correctly set in{" "}
                <code className="text-xs bg-muted rounded px-1 py-0.5">.env.local</code>.
              </p>
            )}

            {/* CTA */}
            <Button asChild className="w-full font-semibold h-11" size="default">
              <Link href={ROUTES.AUTH}>
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Try signing in again
              </Link>
            </Button>

            <div className="text-center">
              <Link
                href={ROUTES.HOME}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
