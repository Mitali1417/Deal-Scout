"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Sparkles } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

const GOOGLE_ICON = (
  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export default function AuthModal({ isOpen, onClose }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpenChange = (open) => {
    if (!open) {
      setError(null);
      onClose();
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const { origin } = window.location;
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${origin}/auth/callback?next=/dashboard` },
      });

      if (oauthError) {
        const msg = oauthError.message || "";
        if (msg.toLowerCase().includes("not enabled") || msg.toLowerCase().includes("unsupported provider")) {
          setError("Google sign-in is not enabled for this project. Enable it in Supabase: Authentication → Providers → Google.");
        } else {
          setError(oauthError.message || "Could not start Google sign-in.");
        }
        return;
      }

      if (data?.url) {
        window.location.assign(data.url);
      }
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm">{APP_NAME}</span>
          </div>
          <DialogTitle className="text-lg">Sign in to continue</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Sign in with Google to save products and get price-drop email alerts.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-1">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-11 gap-3 font-medium"
            size="lg"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : GOOGLE_ICON}
            {loading ? "Redirecting to Google…" : "Continue with Google"}
          </Button>

          <p className="text-center text-xs text-muted-foreground leading-relaxed">
            A free account is created automatically on first sign-in. No password needed.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
