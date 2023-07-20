import { z } from 'zod';

import { propertyResolver } from '../notion/property';
import { NotionPage } from '../notion/types';
import { internalProcedure, router } from '../trpc/stub';

export const blogRouter = router({
  list: internalProcedure
    .input(
      z.object({
        category: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const cached = await ctx.kv.get('cache:blog:list', 'json');
      if (cached) {
        return cached as ArticleListType;
      }

      const pages = await ctx.blog.notion.getDatabaseContents(ctx.blog.databaseId);

      const articles = pages.map((page) => {
        const properties = extractArticleProperties(page.properties);

        return {
          ...properties,
          id: page.id,
        };
      });

      const filtered = articles.filter(
        (article) => input.category === undefined || article.category === input.category,
      );
      type ArticleListType = typeof filtered;

      await ctx.kv.put('cache:blog:list', JSON.stringify(filtered));

      return filtered;
    }),
  invalidateList: internalProcedure.mutation(async ({ ctx }) => {
    await ctx.kv.delete('cache:blog:list');
  }),
  article: internalProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    const cached = await ctx.kv.get(`cache:blog:article:${input.id}`, 'json');
    if (cached) {
      return cached as ArticleData;
    }

    const [page, blocks] = await Promise.all([ctx.blog.notion.getPage(input.id), ctx.blog.notion.getBlocks(input.id)]);
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
  const thumbnail = thumbnailFiles.length > 0 ? thumbnailFiles[0] : null;
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
