import { router } from '../trpc/stub';
import { blogRouter } from './blog';
import { recruitRouter } from './recruit';

export const appRouter = router({
  recruit: recruitRouter,
  blog: blogRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
