import "server-only";

import type { Fetcher } from "@cloudflare/workers-types";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { FetchEsque } from "@trpc/client/dist/internals/types";
import type { AppRouter } from "ssr-gateway";
import superjson from "superjson";

const SSR_GATEWAY_URL = process.env.SSR_GATEWAY_URL;
const SSR_GATEWAY_API_KEY = process.env.SSR_GATEWAY_API_KEY;

// 가능하다면 SSR Gateway와의 통신에 Service Binding 사용
// https://developers.cloudflare.com/pages/platform/functions/bindings/#service-bindings
//
const serviceBindingFetch = (() => {
  const { SSR_GATEWAY_Binding } = process.env as unknown as {
    SSR_GATEWAY_Binding?: Fetcher;
  };

  if (SSR_GATEWAY_Binding) {
    console.log("Using Service Binding");

    return SSR_GATEWAY_Binding.fetch as FetchEsque;
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
