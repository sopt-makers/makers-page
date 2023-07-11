/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { ExecutionContext, KVNamespace, Request, Response } from '@cloudflare/workers-types';
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
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (!env.RECRUIT_NOTION_API_KEY) {
      return new Response('Error: Invalid RECRUIT_NOTION_API_KEY', { status: 500 });
    }
    if (!env.RECRUIT_NOTION_PAGE_ID) {
      throw new Error('Env RECRUIT_NOTION_PAGE_ID is not set.');
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
        recruitNotionClient: createNotionClient(env.RECRUIT_NOTION_API_KEY),
        kv: env.MAKERS_PAGE_KV,
      }),
    });
  },
};
