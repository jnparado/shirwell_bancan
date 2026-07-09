import { NextResponse } from "next/server";

/**
 * App Store Server Notifications V2 endpoint.
 * Configure in App Store Connect → App → App Information → App Store Server Notifications.
 *
 * Production URL: https://your-domain.com/api/apple/iap/webhook
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // TODO: verify signedPayload with Apple's root certificates and update user_entitlements
  // using the originalTransactionId → user mapping stored at first sync.
  console.info("[apple-iap] webhook received", {
    hasPayload: Boolean(payload),
  });

  return NextResponse.json({ received: true });
}
