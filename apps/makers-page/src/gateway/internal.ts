import "server-only";

import type { Fetcher } from "@cloudflare/workers-types";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { FetchEsque } from "@trpc/client/dist/internals/types";
import type { AppRouter } from "ssr-gateway";
import superjson from "superjson";

const SSR_GATEWAY_URL = process.env.SSR_GATEWAY_URL;
const SSR_GATEWAY_API_KEY = process.env.SSR_GATEWAY_API_KEY;

const serviceBindingFetch = (() => {
  const { SSR_GATEWAY } = process.env as unknown as { SSR_GATEWAY?: Fetcher };

  if (SSR_GATEWAY) {
    console.log("Using Service Binding");

    return SSR_GATEWAY.fetch as FetchEsque;
  }

  console.log("Using URL Fetcher:", SSR_GATEWAY_URL);
  return undefined;
})();

export const internalGateway = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: SSR_GATEWAY_URL,
      fetch: serviceBindingFetch,
      async headers() {
        return {
          "X-Api-Key": SSR_GATEWAY_API_KEY,
        };
      },
    }),
  ],
  transformer: superjson,
}).internal;
