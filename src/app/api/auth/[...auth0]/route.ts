import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export { GET as POST };