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

import { createNotionClient } from './notion';
import { appRouter } from './router';
import { createContextFactory } from './trpc/context';

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  MAKERS_PAGE_KV: KVNamespace;
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

    return fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: createContextFactory({
        env: {
          RECRUIT_NOTION_PAGE_ID: env.RECRUIT_NOTION_PAGE_ID,
        },
        waitUntil: ctx.waitUntil,
        checkApiKey(apiKey) {
          return apiKey.trim() === env.INTERNAL_API_KEY;
        },
        blog: {
          notion: createNotionClient(env.BLOG_NOTION_API_KEY),
          databaseId: env.BLOG_NOTION_DB_ID,
        },
        recruitNotionClient: createNotionClient(env.RECRUIT_NOTION_API_KEY),
        kv: env.MAKERS_PAGE_KV,
      }),
    });
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
