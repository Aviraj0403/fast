import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Coarse location (city and state only) from the hosting platform's request headers. No IP address leaves this function. */
export function GET(req: Request) {
  const dec = (v: string | null) => {
    try {
      return v ? decodeURIComponent(v) : undefined;
    } catch {
      return undefined;
    }
  };
  return NextResponse.json(
    { city: dec(req.headers.get("x-vercel-ip-city")), region: dec(req.headers.get("x-vercel-ip-country-region")) },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
