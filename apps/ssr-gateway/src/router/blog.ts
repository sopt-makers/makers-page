import { Block } from 'notion-types';
import { z } from 'zod';

import { propertyResolver } from '../notion/officialApi/property';
import { NotionPage } from '../notion/officialApi/types';
import { storageFactory } from '../storage/kv';
import { internalProcedure, publicProcedure, router } from '../trpc/stub';

export const blogRouter = router({
  list: internalProcedure
    .input(
      z.object({
        category: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const pages = await (async () => {
        const cacheKey = () => `cache:blog:list`;

        const cached = await ctx.kv.get(cacheKey(), 'json');
        if (cached) {
          return cached as PagesType;
        }

        const pages = await ctx.blog.notion.getDatabaseContents(ctx.blog.databaseId);
        type PagesType = typeof pages;

        await ctx.kv.put(cacheKey(), JSON.stringify(pages));

        return pages;
      })();

      const articles = pages.map((page) => {
        const properties = extractArticleProperties(page.properties);

        return {
          ...properties,
          id: page.id,
        };
      });
      const categories = articles
        .map((article) => article.category)
        .filter((category): category is string => !!category);

      const filtered = articles.filter((article) => !input.category || article.category === input.category);

      const data = {
        articles: filtered,
        categories,
      };

      return data;
    }),
  invalidateList: internalProcedure.mutation(async ({ ctx }) => {
    await ctx.kv.delete('cache:blog:list');
  }),
  article: internalProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    const cached = await ctx.kv.get(`cache:blog:article:${input.id}`, 'json');
    if (cached) {
      return cached as ArticleData;
    }

    const [page, { blocks }] = await Promise.all([
      ctx.blog.notion.getPage(input.id),
      ctx.blog.notion.getBlocks(input.id),
    ]);
    const properties = extractArticleProperties(page.properties);

    const articleData = { ...properties, blocks };
    type ArticleData = typeof articleData;

    await ctx.kv.put(`cache:blog:article:${input.id}`, JSON.stringify(articleData));

    return articleData;
  }),
  invalidateArticle: internalProcedure.input(z.object({ id: z.string() })).mutation(async ({ input, ctx }) => {
    await ctx.kv.delete(`cache:blog:article:${input.id}`);
  }),
  invalidateAllArticles: internalProcedure.mutation(async ({ ctx }) => {
    const { keys } = await ctx.kv.list({ prefix: 'cache:blog:article:' });

    await Promise.all(keys.map(async ({ name }) => ctx.kv.delete(name)));
  }),
  refetchArticleList: publicProcedure.mutation(async ({ ctx }) => {
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
  articleList: publicProcedure.query(async ({ ctx }) => {
    const articleListStorage = getArticleListStorage(ctx.kv);

    const list = await articleListStorage.get('');

    if (!list) {
      return [];
    }

    return list;
  }),
  refetchArticle: publicProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const articleStorage = getArticleStorage(ctx.kv);

    const { blockMap, pageBlock } = await ctx.recruit.notionClient.getPage(input);
    const pageData = await ctx.blog.notion.getPage(input);

    const properties = extractArticleProperties(pageData.properties);

    await articleStorage.put(input, {
      id: pageBlock.id,
      blockMap,
      meta: properties,
      lastFetched: new Date().toISOString(),
    });
  }),
  articleNew: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const articleStorage = getArticleStorage(ctx.kv);
    const article = await articleStorage.get(input);

    return article ?? null;
  }),
});

const articleMetaSchema = z.object({
  category: z.string().nullable(),
  thumbnail: z.string().nullable(),
  title: z.string(),
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
