import 'server-only';

import { gateway } from '@/gateway';

export const runtime = 'edge';

export async function POST(_request: Request, { params }: { params: { slug: string } }) {
  if (params.slug === 'recruit') {
    await gateway.recruit.invalidate.mutate();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  return new Response('', { status: 404 });
}
