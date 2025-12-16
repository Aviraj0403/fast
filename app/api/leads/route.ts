import { NextResponse } from 'next/server';

// This API route has been disabled. Lead handling was moved to an external
// backend (NestJS). Keep this route present to avoid 404s during deploys,
// but it returns 410 Gone with instructions.

export async function POST() {
  return NextResponse.json(
    { error: 'This endpoint has been removed. Use the external backend configured via NEXT_PUBLIC_BACKEND_URL.' },
    { status: 410 }
  );
}

export async function GET() {
  return NextResponse.json(
    { error: 'This endpoint has been removed. Use the external backend configured via NEXT_PUBLIC_BACKEND_URL.' },
    { status: 410 }
  );
}
