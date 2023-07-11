import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

import { NotionClient } from '../notion';

interface ContextDeps {
  env: {
    RECRUIT_NOTION_PAGE_ID: string;
  };
  waitUntil: (promise: Promise<void>) => void;
  checkApiKey: (apiKey: string) => boolean;
  recruitNotionClient: NotionClient;
}

export function createContextFactory(deps: ContextDeps) {
  return function createContext({ req, resHeaders }: FetchCreateContextFnOptions) {
    return { req, resHeaders, ...deps };
  };
}

export type Context = inferAsyncReturnType<ReturnType<typeof createContextFactory>>;
