import { Package, TrendingDown, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function formatDate(dateStr) {
  if (!dateStr) return "Never";
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function getUniqueStores(products) {
  const stores = new Set(
    products.map((p) => {
      try {
        return new URL(p.url).hostname.replace("www.", "");
      } catch {
        return "unknown";
      }
    })
  );
  return stores.size;
}

export default function DashboardStats({ products }) {
  const totalProducts = products.length;
  const uniqueStores = getUniqueStores(products);
  const lastUpdated = products.reduce((latest, p) => {
    return !latest || new Date(p.updated_at) > new Date(latest) ? p.updated_at : latest;
  }, null);

  const stats = [
    {
      label: "Products Tracked",
      value: totalProducts,
      icon: Package,
      description: totalProducts === 0 ? "Add your first product below" : `Across ${uniqueStores} ${uniqueStores === 1 ? "store" : "stores"}`,
    },
    {
      label: "Stores Monitored",
      value: uniqueStores,
      icon: TrendingDown,
      description: uniqueStores === 0 ? "Add products to start" : "Unique online stores",
    },
    {
      label: "Last Price Check",
      value: formatDate(lastUpdated),
      icon: Calendar,
      description: "Prices checked daily automatically",
      isText: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(({ label, value, icon: Icon, description, isText }) => (
        <Card key={label} className="border-border/60">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground mb-1">{label}</p>
                <p className={`font-bold text-foreground ${isText ? "text-xl" : "text-3xl"}`}>
                  {value}
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {description}
                </p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
