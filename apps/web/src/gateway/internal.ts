import 'server-only';

import type { Fetcher } from '@cloudflare/workers-types';
import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import { FetchEsque } from '@trpc/client/dist/internals/types';
import type { AppRouter } from 'ssr-gateway';
import superjson from 'superjson';

import { NEXT_PUBLIC_DEV_MODE } from '../env/client';
import { SSR_GATEWAY_API_KEY, SSR_GATEWAY_URL } from '../env/server';

// 가능하다면 SSR Gateway와의 통신에 Service Binding 사용
// https://developers.cloudflare.com/pages/platform/functions/bindings/#service-bindings
//
const serviceBindingFetch = (() => {
  const { SSR_GATEWAY_Binding } = process.env as unknown as {
    SSR_GATEWAY_Binding?: Fetcher;
  };

  if (SSR_GATEWAY_Binding) {
    console.log('[web] Using Service Binding');

    return SSR_GATEWAY_Binding.fetch as FetchEsque;
  }

  console.log('[web] Using URL Fetcher:', SSR_GATEWAY_URL);
  return fetch;
})();

export const internalGateway = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink({
      enabled: () => NEXT_PUBLIC_DEV_MODE,
    }),
    httpBatchLink({
      url: SSR_GATEWAY_URL,
      fetch: serviceBindingFetch,
      async headers() {
        return {
          'X-Api-Key': SSR_GATEWAY_API_KEY,
        };
      },
    }),
  ],
  transformer: superjson,
}).internal;
