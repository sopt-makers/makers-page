import { router } from '../trpc/stub';
import { blogRouter } from './blog';
import { internalRouter } from './internal';
import { recruitRouter } from './recruit';

export const appRouter = router({
  internal: internalRouter,
  recruit: recruitRouter,
  blog: blogRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
