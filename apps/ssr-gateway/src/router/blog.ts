import { Block } from 'notion-types';
import { z } from 'zod';

import { propertyResolver } from '../notion/officialApi/property';
import { NotionPage } from '../notion/officialApi/types';
import { storageFactory } from '../storage/kv';
import { publicProcedure, router } from '../trpc/stub';

export const blogRouter = router({
  refetchList: publicProcedure.mutation(async ({ ctx }) => {
    const articleListStorage = getArticleListStorage(ctx.kv);

    const pages = await ctx.blog.notion.getDatabaseContents(ctx.blog.databaseId);
    const pagesData = pages.map((page) => {
      const properties = extractArticleProperties(page.properties);

      return {
        id: page.id,
        meta: properties,
        lastFetched: new Date().toISOString(),
      };
    });

    await articleListStorage.put('', pagesData);

    return pagesData;
  }),
  list: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const articleListStorage = getArticleListStorage(ctx.kv);

      const list = await articleListStorage.get('');

      if (!list) {
        return {
          articles: [],
          categories: [],
        };
      }

      const articles = list.filter((article) => !input.category || article.meta.category === input.category);

      return {
        articles,
        categories: [],
      };
    }),
  refetchArticle: publicProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const articleStorage = getArticleStorage(ctx.kv);

    const { blockMap, pageBlock } = await ctx.recruit.notionClient.getPage(input);
    const pageData = await ctx.blog.notion.getPage(input);

    const propertiesFromAPI = extractArticleProperties(pageData.properties);

    await articleStorage.put(input, {
      id: pageBlock.id,
      blockMap,
      meta: { ...propertiesFromAPI },
      lastFetched: new Date().toISOString(),
    });
  }),
  article: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const articleStorage = getArticleStorage(ctx.kv);
    const article = await articleStorage.get(input);

    if (!article) {
      return null;
    }

    const blockMapSigned = await (async () => {
      return await ctx.recruit.notionClient.signFileUrls(article.blockMap);
    })();

    return { ...article, blockMap: blockMapSigned };
  }),
});

const articleMetaSchema = z.object({
  category: z.string().nullable(),
  thumbnail: z.string().nullable(),
  title: z.string(),
  editors: z.array(
    z.object({
      name: z.string(),
      role: z.string().optional(),
    }),
  ),
});

const getArticleListStorage = storageFactory({
  version: 1,
  prefix: 'blog:articleList:',
  type: z.array(
    z.object({
      id: z.string(),
      meta: articleMetaSchema,
      lastFetched: z.string(),
    }),
  ),
});

const getArticleStorage = storageFactory({
  version: 1,
  prefix: 'blog:article:',
  type: z.object({
    id: z.string(),
    meta: articleMetaSchema,
    blockMap: z.custom<Record<string, Block>>(),
    lastFetched: z.string(),
  }),
});

function extractArticleProperties(properties: NotionPage['properties']) {
  const resolver = propertyResolver(properties);

  const title = resolver.title('title');
  const editors = resolver.multiSelect('editors').map((raw) => {
    const [name, role = undefined] = raw.split('|');

    return {
      name,
      role,
    };
  });
  const publishedAt = resolver.date('publishedAt');
  const category = resolver.select('category');
  const thumbnailFiles = resolver.files('thumbnail');
  const thumbnail = thumbnailFiles.length > 0 ? thumbnailFiles[0]?.url ?? null : null;
  const publish = resolver.checkbox('publish');

  return {
    title,
    editors,
    publishedAt,
    category,
    thumbnail,
    publish,
  };
}
