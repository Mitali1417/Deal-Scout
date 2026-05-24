"use client";

import { useState } from "react";
import { deleteProduct } from "@/app/actions";
import PriceChart from "./PriceChart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ExternalLink,
  Trash2,
  TrendingDown,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function formatPrice(amount, currency) {
  const code = (currency || "USD").toString().toUpperCase();
  const n = Number(amount);
  if (!Number.isFinite(n)) return `${code} ${amount}`;
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: code.length === 3 ? code : "USD",
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `${code} ${n.toFixed(2)}`;
  }
}

function getStoreName(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "Store";
  }
}

function formatRelativeDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function ProductCard({ product }) {
  const router = useRouter();
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Remove "${product.name}" from tracking?`)) return;
    setDeleting(true);
    const result = await deleteProduct(product.id);
    if (result?.error) {
      toast.error("Could not remove product", { description: result.error });
    } else {
      toast.success("Removed from tracking");
      router.refresh();
    }
    setDeleting(false);
  };

  const priceLabel = formatPrice(product.current_price, product.currency);
  const storeName = getStoreName(product.url);
  const lastUpdated = formatRelativeDate(product.updated_at);

  return (
    <Card className="overflow-hidden border-border/60 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-200">
      <CardContent className="p-0">
        {/* ── Card header ───────────────────────────────────────────────────── */}
        <div className="flex gap-4 p-5">
          {/* Product image */}
          {product.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="h-20 w-20 shrink-0 rounded-xl object-cover border border-border/60"
            />
          )}

          {/* Product info */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* Store + tracking badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs font-normal px-2 py-0.5">
                {storeName}
              </Badge>
              <Badge className="text-xs font-normal px-2 py-0.5 gap-1 bg-primary/10 text-primary border-primary/20">
                <TrendingDown className="h-3 w-3" aria-hidden />
                Tracking
              </Badge>
            </div>

            {/* Product name */}
            <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">{priceLabel}</span>
            </div>

            {/* Last updated */}
            {lastUpdated && (
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" aria-hidden />
                Updated {lastUpdated}
              </p>
            )}
          </div>
        </div>

        {/* ── Actions bar ───────────────────────────────────────────────────── */}
        <div className="flex items-center gap-1 px-5 pb-4 border-t border-border/50 pt-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChart(!showChart)}
                className="gap-1.5 text-muted-foreground hover:text-foreground h-8"
                aria-expanded={showChart}
                aria-label={showChart ? "Hide price chart" : "Show price chart"}
              >
                <BarChart3 className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">
                  {showChart ? "Hide" : "Price"} chart
                </span>
                {showChart ? (
                  <ChevronUp className="h-3.5 w-3.5" aria-hidden />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{showChart ? "Hide" : "View"} price history chart</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-1.5 text-muted-foreground hover:text-foreground h-8"
              >
                <Link href={product.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  <span className="hidden sm:inline">View product</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Open product page in a new tab</p>
            </TooltipContent>
          </Tooltip>

          <div className="flex-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={deleting}
                className="gap-1.5 text-muted-foreground hover:text-destructive h-8"
                aria-label="Remove from tracking"
              >
                <Trash2 className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">{deleting ? "Removing…" : "Remove"}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Stop tracking this product</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* ── Price chart (expandable) ──────────────────────────────────────── */}
        {showChart && (
          <div className="px-5 pb-5 border-t border-border/50 pt-4">
            <PriceChart productId={product.id} currency={product.currency} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
