import 'server-only';

import { Fetcher } from '@cloudflare/workers-types';
import { FetchEsque } from '@trpc/client/dist/internals/types';

import { SSR_GATEWAY_DOMAIN } from '@/env/server';

// 가능하다면 SSR Gateway와의 통신에 Service Binding 사용
// https://developers.cloudflare.com/pages/platform/functions/bindings/#service-bindings
//
export const serviceBindingFetch = ((): FetchEsque => {
  const { SSR_GATEWAY_Binding } = process.env as unknown as {
    SSR_GATEWAY_Binding?: Fetcher;
  };

  if (SSR_GATEWAY_Binding) {
    console.log('[web] Using Service Binding');

    // bind를 해주지 않으면 오류 발생
    return SSR_GATEWAY_Binding.fetch.bind(SSR_GATEWAY_Binding) as FetchEsque;
  }

  console.log('[web] Using URL Fetcher:', SSR_GATEWAY_DOMAIN);
  return (req, init) => fetch(req, { ...init, next: { revalidate: 0 } });
})();
