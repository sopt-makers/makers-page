import { redirect } from 'next/navigation';

import { gateway } from '@/gateway';

export const GET = async (_request: Request, { params }: { params: { key: string } }) => {
  const target = await gateway.redirect.redirectLink.query(params.key);

  if (!target) {
    return new Response('Not Found', { status: 404 });
  }

  redirect(target);
};
