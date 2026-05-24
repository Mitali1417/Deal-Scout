import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

const PERKS = [
  "Works on any e-commerce store",
  "Email alerts when prices drop",
  "Full price history chart",
  "Completely free, always",
];

export default function CtaSection() {
  return (
    <section className="py-16 sm:py-24 px-4 bg-muted/30">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Ready to start saving?
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Join shoppers who never overpay. Set up your first price tracker in seconds — no credit card, no install.
        </p>

        {/* Perks checklist */}
        <ul className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mb-8">
          {PERKS.map((perk) => (
            <li key={perk} className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-primary shrink-0" aria-hidden />
              {perk}
            </li>
          ))}
        </ul>

        <Button asChild size="lg" className="font-semibold px-10 h-12 text-base gap-2">
          <Link href={ROUTES.AUTH}>
            Get Started for Free
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  );
}
