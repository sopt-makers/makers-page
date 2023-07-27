import { KVNamespace } from '@cloudflare/workers-types';
import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

import { NotionUnofficialClient } from '../notion/api/client';
import { NotionClient } from '../notion/officialApi/client';

interface ContextDeps {
  waitUntil: (promise: Promise<void>) => void;
  checkApiKey: (apiKey: string) => boolean;
  image: {
    delete: (keys: string[]) => Promise<void>;
  };
  blog: {
    notion: NotionClient;
    databaseId: string;
  };
  recruit: {
    notionClient: NotionUnofficialClient;
    rootPageId: string;
  };
  kv: KVNamespace;
}

export function createContextFactory(deps: ContextDeps) {
  return function createContext({ req, resHeaders }: FetchCreateContextFnOptions) {
    return { req, resHeaders, ...deps };
  };
}

export type Context = inferAsyncReturnType<ReturnType<typeof createContextFactory>>;
