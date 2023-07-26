import 'server-only';

import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { AppRouter } from 'ssr-gateway';
import superjson from 'superjson';

import { DEV_MODE, SSR_GATEWAY_API_KEY, SSR_GATEWAY_DOMAIN } from '../env/server';
import { serviceBindingFetch } from './serviceBinding';

export const gateway = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink({
      enabled: () => DEV_MODE,
    }),
    httpBatchLink({
      url: `${SSR_GATEWAY_DOMAIN}/trpc`,
      fetch: serviceBindingFetch,
      async headers() {
        return {
          'X-Api-Key': SSR_GATEWAY_API_KEY,
        };
      },
    }),
  ],
  transformer: superjson,
});
