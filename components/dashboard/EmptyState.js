import { TrendingDown, ArrowUpRight } from "lucide-react";

const TIPS = [
  "Go to any product page on Amazon, Flipkart, eBay, or any other store",
  "Copy the full URL from your browser's address bar",
  "Paste it in the form above and click \"Track price\"",
  "We'll save the current price and send you an email if it drops",
];

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4">
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-5">
        <TrendingDown className="h-8 w-8 text-primary" aria-hidden />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">
        No products tracked yet
      </h3>
      <p className="text-muted-foreground text-sm max-w-md leading-relaxed mb-8">
        Paste any product URL above to start tracking its price. After the first daily check,
        price history will appear on the chart and we can alert you when prices fall.
      </p>

      {/* Tips */}
      <div className="w-full max-w-md rounded-2xl border border-border bg-muted/40 p-5 text-left">
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
          <ArrowUpRight className="h-4 w-4 text-primary" aria-hidden />
          How to get started
        </h4>
        <ol className="space-y-2">
          {TIPS.map((tip, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
