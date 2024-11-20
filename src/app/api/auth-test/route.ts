import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    baseUrl: process.env.AUTH0_BASE_URL,
    issuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL,
    clientId: process.env.AUTH0_CLIENT_ID ? 'Set' : 'Not set',
    clientSecret: process.env.AUTH0_CLIENT_SECRET ? 'Set' : 'Not set',
    secret: process.env.AUTH0_SECRET ? 'Set' : 'Not set'
  };

  return NextResponse.json({ config });
}