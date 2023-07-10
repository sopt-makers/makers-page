import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

import { NotionClient } from '../notion';

interface ContextDeps {
  waitUntil: (promise: Promise<void>) => void;
  checkApiKey: (apiKey: string) => boolean;
  customPageNotionClient: NotionClient;
}

export function createContextFactory(deps: ContextDeps) {
  return function createContext({ req, resHeaders }: FetchCreateContextFnOptions) {
    return { req, resHeaders, ...deps };
  };
}

export type Context = inferAsyncReturnType<ReturnType<typeof createContextFactory>>;
