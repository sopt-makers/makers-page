import { router } from '../trpc/stub';
import { blogRouter } from './blog';
import { recruitRouter } from './recruit';
import { redirectRouter } from './redirect';

export const appRouter = router({
  recruit: recruitRouter,
  blog: blogRouter,
  redirect: redirectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
