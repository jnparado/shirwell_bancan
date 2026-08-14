import { NextResponse } from "next/server";
import {
  ANDROID_APP_LINK_SHA256,
  ANDROID_PACKAGE_NAME,
  isAndroidAppLinksConfigured,
} from "@/config/mobile-app";

/** Android App Links — verify domain for OAuth / deep links. */
export async function GET(request: Request) {
  if (!isAndroidAppLinksConfigured()) {
    return NextResponse.json([], { status: 404 });
  }

  const origin = new URL(request.url).origin;

  return NextResponse.json([
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: ANDROID_PACKAGE_NAME,
        sha256_cert_fingerprints: [ANDROID_APP_LINK_SHA256],
      },
    },
  ]);
}
