import { router } from '../trpc/stub';
import { blogRouter } from './blog';
import { makersRouter } from './makers';
import { recruitRouter } from './recruit';

export const appRouter = router({
  recruit: recruitRouter,
  blog: blogRouter,
  makers: makersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
