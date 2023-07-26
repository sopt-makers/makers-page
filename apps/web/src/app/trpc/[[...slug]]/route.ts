import 'server-only';

import { SSR_GATEWAY_DOMAIN } from '@/env/server';
import { serviceBindingFetch } from '@/gateway/serviceBinding';

export const runtime = 'edge';

async function trpcProxy(request: Request) {
  const url = new URL(request.url);
  const targetUrl = new URL(SSR_GATEWAY_DOMAIN ?? '');
  url.protocol = targetUrl.protocol;
  url.host = targetUrl.host;

  const newRequest = new Request(url, {
    body: request.body,
    method: request.method,
    headers: request.headers,
  });

  return await serviceBindingFetch(url, newRequest);
}

export const GET = trpcProxy;
export const POST = trpcProxy;
