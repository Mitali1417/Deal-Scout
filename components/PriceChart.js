"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getPriceHistory } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { BRAND_COLOR } from "@/lib/constants";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

function formatPrice(value, currency) {
  const code = (currency || "USD").toString().toUpperCase();
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: code.length === 3 ? code : "USD",
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${code} ${value?.toFixed(2)}`;
  }
}

function PriceTrend({ data }) {
  if (data.length < 2) return null;
  const first = data[0].price;
  const last = data[data.length - 1].price;
  const diff = last - first;
  const pct = ((Math.abs(diff) / first) * 100).toFixed(1);

  if (diff < 0) {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <TrendingDown className="h-3.5 w-3.5" />
        Down {pct}% since first tracked
      </span>
    );
  }
  if (diff > 0) {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-rose-500">
        <TrendingUp className="h-3.5 w-3.5" />
        Up {pct}% since first tracked
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <Minus className="h-3.5 w-3.5" />
      No change
    </span>
  );
}

const CustomTooltip = ({ active, payload, label, currency }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-md text-sm">
      <p className="text-muted-foreground mb-0.5">{label}</p>
      <p className="font-semibold text-foreground">
        {formatPrice(payload[0].value, currency)}
      </p>
    </div>
  );
};

export default function PriceChart({ productId, currency }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const history = await getPriceHistory(productId);
      const chartData = history.map((item) => ({
        date: new Date(item.checked_at).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        }),
        price: parseFloat(item.price),
      }));
      setData(chartData);
      setLoading(false);
    }
    loadData();
  }, [productId]);

  if (loading) {
    return (
      <div className="space-y-3 w-full">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-sm text-muted-foreground">
          No price history yet.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Check back after the first daily price update.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">Price History</h4>
        <PriceTrend data={data} />
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            strokeOpacity={0.1}
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "currentColor", opacity: 0.5 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "currentColor", opacity: 0.5 }}
            axisLine={false}
            tickLine={false}
            width={55}
            tickFormatter={(v) => formatPrice(v, currency)}
          />
          <Tooltip content={<CustomTooltip currency={currency} />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke={BRAND_COLOR}
            strokeWidth={2.5}
            dot={{ fill: BRAND_COLOR, r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
