import { Block } from 'notion-types';
import { parsePageId } from 'notion-utils';
import { z } from 'zod';

import { storageFactory } from '../storage/kv';
import { Context } from '../trpc/context';
import { internalProcedure, publicProcedure, router } from '../trpc/stub';

export const recruitRouter = router({
  page: internalProcedure.input(z.object({ id: z.string().optional() })).query(async ({ ctx, input }) => {
    const pageStorage = getPageStorage(ctx.kv);
    const allowedPagesStorage = getAllowedPagesStorage(ctx.kv);
    const signedPageStorage = getSignedPageStorage(ctx.kv);

    const pageId = parsePageId(input.id ?? ctx.recruit.rootPageId);
    if (!pageId) {
      return { status: 'NOT_FOUND' } as const;
    }

    const allowedPages = await allowedPagesStorage.get('');
    if (!allowedPages) {
      return { status: 'NEED_REFRESH' } as const;
    }

    if (!allowedPages.includes(pageId)) {
      return { status: 'NOT_FOUND' } as const;
    }

    const cached = await signedPageStorage.get(pageId);
    if (cached) {
      console.log('cached');
      return { status: 'SUCCESS', ...cached } as const;
    }

    const data = await pageStorage.get(pageId);

    if (!data) {
      return { status: 'NEED_REFRESH' } as const;
    }

    const { blockMap, ...pageData } = data;

    const blockMapSigned = await (async () => {
      return await ctx.recruit.notionClient.SignFileUrls(blockMap);
    })();

    const newSignedPage = {
      ...pageData,
      blockMap: blockMapSigned,
    };

    await signedPageStorage.put(pageId, newSignedPage, { expirationTtl: 60 * 50 });

    return { status: 'SUCCESS', ...pageData, blockMap: blockMapSigned } as const;
  }),
  refresh: publicProcedure.mutation(async ({ ctx }) => {
    console.log('Start Refetching...');

    await refetchPages(ctx);
    return 'refresh!';
  }),
});

type PathFragment = {
  id: string | null;
  title: string;
};

const pageSchema = z.object({
  id: z.string(),
  title: z.string().nullable(),
  path: z.array(z.custom<PathFragment>()),
  blockMap: z.custom<Record<string, Block>>(),
});

const getPageStorage = storageFactory({
  version: 2,
  prefix: 'recruit:page:',
  type: pageSchema,
});

const getSignedPageStorage = storageFactory({
  version: 2,
  prefix: 'recruit:signedPage:',
  type: pageSchema,
});

const getAllowedPagesStorage = storageFactory({
  version: 1,
  prefix: 'recruit:allowedPages',
  type: z.array(z.string()),
});

async function refetchPages(ctx: Context) {
  const pageStorage = getPageStorage(ctx.kv);
  const allowedPagesStorage = getAllowedPagesStorage(ctx.kv);
  const signedPagesStorage = getSignedPageStorage(ctx.kv);

  const rootPageId = parsePageId(ctx.recruit.rootPageId);
  const allowedPages: string[] = [];

  async function traverse(pageId: string, path: PathFragment[] = []) {
    const { blockMap, title, pageBlock } = await ctx.recruit.notionClient.getPage(pageId);

    const childPageIds: string[] = [];
    function findChildPages(block: Block) {
      for (const childId of block.content ?? []) {
        const child = blockMap[childId];
        if (!child || childId === pageId) {
          continue;
        }
        if (child.type === 'page') {
          childPageIds.push(child.id);
          continue;
        }
        findChildPages(child);
      }
    }
    findChildPages(pageBlock);

    console.log('Refetching:', pageId, '->', childPageIds);

    const newPath: PathFragment[] = [...path, { id: pageId === rootPageId ? null : pageId, title: title ?? '' }];

    const childTraversePromises = childPageIds.map(async (id) => traverse(id, newPath));
    await Promise.all(childTraversePromises);

    await pageStorage.put(pageId, {
      id: pageId,
      title,
      path: newPath,
      blockMap,
    });

    allowedPages.push(pageId);
  }

  await traverse(rootPageId);
  await allowedPagesStorage.put('', allowedPages);
  await signedPagesStorage.deleteAll();
}
