import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const oauthError = searchParams.get("error");
  const oauthErrorDescription = searchParams.get("error_description");

  if (oauthError) {
    const msg = (
      oauthErrorDescription ||
      oauthError ||
      "Sign-in was cancelled or failed."
    ).replace(/\+/g, " ");
    return NextResponse.redirect(
      new URL(`/error?reason=${encodeURIComponent(msg)}`, request.url)
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }

    return NextResponse.redirect(
      new URL(
        `/error?reason=${encodeURIComponent(error.message || "session_exchange_failed")}`,
        request.url
      )
    );
  }

  return NextResponse.redirect(
    new URL(
      `/error?reason=${encodeURIComponent("Missing authorization code. Try signing in again.")}`,
      request.url
    )
  );
}
