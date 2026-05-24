import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_TAGLINE, APP_DESCRIPTION, ROUTES } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 px-4">
      {/* Background glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Free price tracking — no credit card needed
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-[1.1]">
          Never Pay Too Much,{" "}
          <span className="gradient-text">Ever Again.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          {APP_DESCRIPTION}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="font-semibold px-8 h-12 text-base gap-2">
            <Link href={ROUTES.AUTH}>
              Start Tracking Free
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="lg"
            className="h-12 text-base text-muted-foreground hover:text-foreground"
          >
            <a href="#how-it-works">See how it works ↓</a>
          </Button>
        </div>

        {/* Social proof */}
        <p className="mt-8 text-sm text-muted-foreground">
          Works with Amazon, Flipkart, eBay, and thousands more stores
        </p>
      </div>
    </section>
  );
}
