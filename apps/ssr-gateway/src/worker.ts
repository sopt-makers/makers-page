/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { ExecutionContext, KVNamespace } from '@cloudflare/workers-types';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { Hono } from 'hono/quick';

import { createNotionUnofficialClient } from './notion/api/client';
import { createNotionClient, NotionImageHandler } from './notion/officialApi/client';
import { appRouter } from './router';
import { createContextFactory } from './trpc/context';

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  MAKERS_PAGE_KV: KVNamespace;
  MAKERS_PAGE_R2: R2Bucket;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
  //
  // Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
  // MY_QUEUE: Queue;

  INTERNAL_API_KEY?: string;
  RECRUIT_NOTION_API_KEY?: string;
  RECRUIT_NOTION_PAGE_ID?: string;
  BLOG_NOTION_API_KEY?: string;
  BLOG_NOTION_DB_ID?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (
      !check(env, [
        'BLOG_NOTION_API_KEY',
        'BLOG_NOTION_DB_ID',
        'RECRUIT_NOTION_API_KEY',
        'RECRUIT_NOTION_PAGE_ID',
        'INTERNAL_API_KEY',
      ])
    ) {
      throw new Error('Some env values are not properly set.');
    }

    const imageHandler: NotionImageHandler = {
      async save(key, url) {
        const imageURL = new URL(`/image/${key}`, request.url).href;

        const meta = await env.MAKERS_PAGE_R2.head(`/image/${key}`);

        if (meta) {
          return { url: imageURL };
        }

        const response = await fetch(url);
        if (!response.body) {
          console.log('Failed to save image.');
          return { url };
        }

        await env.MAKERS_PAGE_R2.put(`/image/${key}`, response.body);

        return { url: imageURL };
      },
      async getResponse(key) {
        const object = await env.MAKERS_PAGE_R2.get(`/image/${key}`);
        if (!object) {
          return new Response(`404 Not Found`, {
            status: 400,
          });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);

        return new Response(object.body, { headers });
      },
      async delete(keys) {
        await env.MAKERS_PAGE_R2.delete(keys);
      },
    };
    const app = new Hono();

    app.get('/image/:key', async (c) => {
      const { key } = c.req.param();

      return imageHandler.getResponse(key);
    });

    app.all('/trpc/*', async () => {
      return fetchRequestHandler({
        endpoint: '/trpc',
        req: request,
        router: appRouter,
        createContext: createContextFactory({
          waitUntil: ctx.waitUntil,
          checkApiKey(apiKey) {
            return apiKey.trim() === env.INTERNAL_API_KEY;
          },
          blog: {
            notion: createNotionClient(env.BLOG_NOTION_API_KEY, imageHandler),
            databaseId: env.BLOG_NOTION_DB_ID,
          },
          image: {
            delete: imageHandler.delete,
          },
          recruit: {
            notionClient: createNotionUnofficialClient(imageHandler),
            rootPageId: env.RECRUIT_NOTION_PAGE_ID,
          },
          kv: env.MAKERS_PAGE_KV,
        }),
      });
    });

    return app.fetch(request, env, ctx);
  },
};

function check<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): obj is T & Required<{ [key in K]: T[K] }> {
  for (const key of keys) {
    if (!(key in obj)) {
      console.log(`Env value ${String(key)} is not properly set.`);
      return false;
    }
  }
  return true;
}
