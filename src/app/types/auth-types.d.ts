import { Session, User } from '@auth0/nextjs-auth0';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH0_SECRET: string;
      AUTH0_BASE_URL: string;
      AUTH0_ISSUER_BASE_URL: string;
      AUTH0_CLIENT_ID: string;
      AUTH0_CLIENT_SECRET: string;
    }
  }
}

// Extend the User type if you need custom fields
declare module '@auth0/nextjs-auth0' {
  interface User {
    email?: string;
    name?: string;
    // Add any custom fields you expect from Auth0
  }
}

export {};
