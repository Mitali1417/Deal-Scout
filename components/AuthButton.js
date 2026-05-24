"use client";

/**
 * Legacy compatibility shim.
 * The Navbar now handles user sign-in/out directly via UserMenu.
 * This component is kept for any existing references but is no longer the primary auth UI.
 */
import { useState } from "react";
import { signOut } from "@/app/actions";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

export default function AuthButton({ user }) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (user) {
    return (
      <form action={signOut}>
        <Button variant="outline" size="sm" type="submit" className="gap-2">
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </form>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowAuthModal(true)}
        size="sm"
        className="gap-2 font-medium"
      >
        <LogIn className="h-4 w-4" />
        Sign in
      </Button>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
