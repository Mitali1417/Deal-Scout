import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getProducts } from "@/app/actions";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AddProductForm from "@/components/AddProductForm";
import ProductCard from "@/components/ProductCard";
import DashboardStats from "@/components/dashboard/DashboardStats";
import EmptyState from "@/components/dashboard/EmptyState";
import { Separator } from "@/components/ui/separator";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { PlusCircle, Package } from "lucide-react";

export const metadata = {
  title: `Dashboard — ${APP_NAME}`,
  description: "Manage and track your saved products and price alerts.",
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getDisplayName(user) {
  return (
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there"
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.AUTH);
  }

  const products = await getProducts();
  const greeting = getGreeting();
  const firstName = getDisplayName(user);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar user={user} activePage="dashboard" />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 space-y-8">
        {/* ── Welcome banner ──────────────────────────────────────────────── */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {greeting}, {firstName}! 👋
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Here&rsquo;s a snapshot of your tracked products and price activity.
          </p>
        </div>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <DashboardStats products={products} />

        <Separator className="opacity-50" />

        {/* ── Add product ──────────────────────────────────────────────────── */}
        <section aria-labelledby="add-product-heading">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <PlusCircle className="h-4 w-4" aria-hidden />
            </div>
            <div>
              <h2 id="add-product-heading" className="text-base font-semibold text-foreground">
                Track a new product
              </h2>
              <p className="text-xs text-muted-foreground">
                Paste any product URL — we extract the name, image, and price instantly.
              </p>
            </div>
          </div>

          <AddProductForm user={user} />
        </section>

        <Separator className="opacity-50" />

        {/* ── Products grid ─────────────────────────────────────────────────── */}
        <section aria-labelledby="products-heading">
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Package className="h-4 w-4" aria-hidden />
              </div>
              <div>
                <h2 id="products-heading" className="text-base font-semibold text-foreground">
                  Your tracked products
                </h2>
                <p className="text-xs text-muted-foreground">
                  Open a card to compare price history or visit the product page.
                </p>
              </div>
            </div>
            {products.length > 0 && (
              <span className="text-sm font-medium text-muted-foreground tabular-nums">
                {products.length} {products.length === 1 ? "product" : "products"}
              </span>
            )}
          </div>

          {products.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 items-start">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-muted/20">
              <EmptyState />
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
