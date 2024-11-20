import { handleAuth } from '@auth0/nextjs-auth0'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    return await handleAuth()(request)
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export { GET as POST }