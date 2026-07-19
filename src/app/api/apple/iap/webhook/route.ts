import { NextResponse } from "next/server";
import { isAppleJwsVerificationEnabled } from "@/lib/apple/iap";
import { jsonError, methodNotAllowed } from "@/lib/security/api";

/**
 * App Store Server Notifications V2 endpoint.
 * Configure in App Store Connect → App → App Information → App Store Server Notifications.
 */
export async function POST(request: Request) {
  if (!isAppleJwsVerificationEnabled()) {
    return jsonError("Apple webhook verification is not enabled.", 501);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonError("Invalid payload.", 400);
  }

  // TODO: verify signedPayload with Apple's root certificates and update user_entitlements.
  console.info("[apple-iap] webhook received", {
    hasPayload: Boolean(payload),
  });

  return NextResponse.json({ received: true });
}

export function GET() {
  return methodNotAllowed();
}
