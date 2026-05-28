import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { scrapeProduct } from "@/lib/firecrawl";
import { sendPriceDropAlert } from "@/lib/email";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use service role to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*");

    if (productsError) throw productsError;

    const productList = Array.isArray(products) ? products : [];

    console.log(`Found ${productList.length} products to check`);

    const results = {
      total: productList.length,
      updated: 0,
      failed: 0,
      priceChanges: 0,
      alertsSent: 0,
    };

    for (const product of productList) {
      try {
        const productData = await scrapeProduct(product.url);

        if (!productData.currentPrice) {
          results.failed++;
          continue;
        }

        const newPrice = parseFloat(productData.currentPrice);
        const oldPrice = parseFloat(product.current_price);

        await supabase
          .from("products")
          .update({
            current_price: newPrice,
            currency: productData.currencyCode || product.currency,
            name: productData.productName || product.name,
            image_url: productData.productImageUrl || product.image_url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", product.id);

        if (oldPrice !== newPrice) {
          const { error: historyInsertError } = await supabase.from("price_history").insert({
            product_id: product.id,
            price: newPrice,
            currency: productData.currencyCode || product.currency,
          });

          if (historyInsertError) {
            console.error(`Price history insert failed for product ${product.id}:`, historyInsertError);
          }

          results.priceChanges++;

          if (newPrice < oldPrice) {
            try {
              const userLookupResult = await supabase.auth.admin.getUserById(product.user_id);
              const userEmail = userLookupResult?.data?.user?.email;

              if (userEmail) {
                const emailResult = await sendPriceDropAlert(
                  userEmail,
                  product,
                  oldPrice,
                  newPrice
                );

                if (emailResult.success) {
                  results.alertsSent++;
                } else {
                  console.error(`Email send failed for product ${product.id}:`, emailResult.error);
                }
              }
            } catch (e) {
              console.error(`User lookup failed for product ${product.id}:`, e.message);
            }
          }
        }

        results.updated++;
      } catch (error) {
        console.error(`Error processing product ${product.id}:`, error);
        results.failed++;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Price check completed",
      results,
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Price check endpoint is working. Use POST to trigger.",
  });
}


// curl.exe -X POST http://localhost:3000/api/cron/check-prices -H "Authorization: Bearer 417019013f50670e19324370b172981e3a07b8b54af7ee4846694ff2e85bcc13"  