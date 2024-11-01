import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { AppRouter } from '../../../api/src/trpc/trpc.router';
import { env } from 'next-runtime-env';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (opts) =>
        (env('NEXT_PUBLIC_NODE_ENV') === 'development' &&
          typeof window !== 'undefined') ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${env('NEXT_PUBLIC_API_SERVER_URL')}trpc`,
      fetch(url, options) {
        console.log('fetching', url);
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});
