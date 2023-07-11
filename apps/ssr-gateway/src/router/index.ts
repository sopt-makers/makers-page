import { router } from '../trpc/stub';
import { internalRouter } from './internal';
import { recruitRouter } from './recruit';

export const appRouter = router({
  internal: internalRouter,
  recruit: recruitRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
