import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    INTANIA_AUTH_APP_ID: z.string().min(1),
    INTANIA_AUTH_REDIRECT_URL: z.string().url(),
    JWT_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_API_SERVER_URL: z.string().url(),
  },

  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_SERVER_URL: process.env.NEXT_PUBLIC_API_SERVER_URL,
  },
});
