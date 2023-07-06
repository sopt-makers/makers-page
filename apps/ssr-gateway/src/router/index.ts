import { router } from "../trpc/stub";
import { internalRouter } from "./internal";

export const appRouter = router({
  internal: internalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
