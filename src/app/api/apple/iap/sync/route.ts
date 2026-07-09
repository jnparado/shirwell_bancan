import { NextResponse } from "next/server";
import {
  APPLE_IAP_PRODUCT_IDS,
  isAppleIapConfigured,
} from "@/lib/apple/iap";
import { upsertAppleEntitlement } from "@/lib/auth/premium";
import { createServerSupabaseClient, createServiceRoleSupabaseClient } from "@/lib/supabase/server";

type SyncBody = {
  productId?: string;
  originalTransactionId?: string;
  expiresAt?: string | null;
  /** StoreKit 2 signed transaction (JWS) — verify on server when Apple keys are configured. */
  signedTransaction?: string;
};

/**
 * Called by the Shirwell Music iOS app after a successful StoreKit purchase or restore.
 * Requires a signed-in Supabase session (cookie or Authorization bearer from the app WebView).
 */
export async function POST(request: Request) {
  if (!isAppleIapConfigured()) {
    return NextResponse.json(
      {
        error:
          "Apple IAP server verification is not configured. Set APPLE_APP_STORE_ISSUER_ID, APPLE_APP_STORE_KEY_ID, and APPLE_APP_STORE_PRIVATE_KEY.",
      },
      { status: 503 },
    );
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Auth is not configured." }, { status: 503 });
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  let body: SyncBody;
  try {
    body = (await request.json()) as SyncBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const productId = body.productId?.trim();
  if (!productId || !APPLE_IAP_PRODUCT_IDS.includes(productId as (typeof APPLE_IAP_PRODUCT_IDS)[number])) {
    return NextResponse.json({ error: "Unknown productId." }, { status: 400 });
  }

  const originalTransactionId = body.originalTransactionId?.trim();
  if (!originalTransactionId) {
    return NextResponse.json({ error: "originalTransactionId is required." }, { status: 400 });
  }

  // TODO: verify body.signedTransaction JWS with Apple's App Store Server library before granting access.
  if (!body.signedTransaction?.trim()) {
    return NextResponse.json(
      { error: "signedTransaction (StoreKit JWS) is required for verification." },
      { status: 400 },
    );
  }

  const adminSupabase = createServiceRoleSupabaseClient();
  if (!adminSupabase) {
    return NextResponse.json(
      { error: "Server cannot write entitlements. Set SUPABASE_SERVICE_ROLE_KEY." },
      { status: 503 },
    );
  }

  const { error } = await upsertAppleEntitlement(adminSupabase, {
    userId: user.id,
    premium: true,
    productId,
    originalTransactionId,
    expiresAt: body.expiresAt ?? null,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, premium: true });
}
