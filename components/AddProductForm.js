"use client";

import { useState } from "react";
import { addProduct } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Link2 } from "lucide-react";
import { toast } from "sonner";

export default function AddProductForm({ user }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("url", url.trim());

    const result = await addProduct(formData);

    if (result?.error) {
      toast.error(result.error, {
        description: "Make sure the URL is a valid product page and try again.",
      });
    } else {
      toast.success(result?.message || "Product is now being tracked!", {
        description: "We'll email you when the price drops.",
      });
      setUrl("");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden />
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.amazon.com/dp/…"
            className="pl-9 h-11 text-sm"
            required
            disabled={loading}
            aria-label="Product URL"
            aria-describedby="url-help"
          />
        </div>

        <Button
          type="submit"
          disabled={loading || !url.trim()}
          className="h-11 px-6 font-semibold shrink-0"
          size="default"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Fetching price…
            </>
          ) : (
            "Track price"
          )}
        </Button>
      </div>

      <p id="url-help" className="text-xs text-muted-foreground leading-relaxed">
        Paste a product page URL from any online store. We extract the price automatically and save it to your tracker.
      </p>
    </form>
  );
}
