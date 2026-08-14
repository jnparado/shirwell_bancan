import { NextResponse } from "next/server";
import {
  APPLE_TEAM_ID,
  IOS_BUNDLE_ID,
  isAppleUniversalLinksConfigured,
} from "@/config/mobile-app";

/** Apple Universal Links — associate web domain with iOS app. */
export async function GET() {
  if (!isAppleUniversalLinksConfigured()) {
    return NextResponse.json({}, { status: 404 });
  }

  const teamId = APPLE_TEAM_ID;

  return NextResponse.json({
    applinks: {
      apps: [],
      details: [
        {
          appID: `${teamId}.${IOS_BUNDLE_ID}`,
          paths: ["/auth/callback", "/auth/callback/*", "/home", "/login"],
        },
      ],
    },
  });
}
