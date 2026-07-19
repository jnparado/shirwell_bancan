import { NextResponse } from "next/server";

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function methodNotAllowed() {
  return jsonError("Method not allowed.", 405);
}
