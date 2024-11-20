import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();

// Export POST for form submissions
export const POST = GET;