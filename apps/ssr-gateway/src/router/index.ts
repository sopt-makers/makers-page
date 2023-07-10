import { router } from '../trpc/stub';
import { internalRouter } from './internal';
import { notionRouter } from './notion';

export const appRouter = router({
  internal: internalRouter,
  notion: notionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
