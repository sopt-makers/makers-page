import 'server-only';

import { SSR_GATEWAY_DOMAIN } from '@/env/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const targetUrl = new URL(SSR_GATEWAY_DOMAIN ?? '');
  url.protocol = targetUrl.protocol;
  url.host = targetUrl.host;

  const newRequest = new Request(url, {
    body: request.body,
    method: request.method,
    headers: request.headers,
  });

  return await fetch(url, newRequest);
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const targetUrl = new URL(SSR_GATEWAY_DOMAIN ?? '');
  url.protocol = targetUrl.protocol;
  url.host = targetUrl.host;

  const newRequest = new Request(url, {
    body: request.body,
    method: request.method,
    headers: request.headers,
  });

  return await fetch(url, newRequest);
}
