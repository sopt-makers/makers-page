import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";

import { Context } from "./context";

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const router = t.router;
const middleware = t.middleware;
const publicProcedure = t.procedure;

const isAdmin = middleware(async (opts) => {
  const { ctx } = opts;
  const apiKey = ctx.req.headers.get("X-Api-Key");

  if (!apiKey || !ctx.checkApiKey(apiKey)) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next();
});

const internalProcedure = publicProcedure.use(isAdmin);

const internalRouter = router({
  ping: internalProcedure.input(z.string()).query(({ input }) => {
    return `pong to ${input}!`;
  }),
});

export const appRouter = t.router({
  internal: internalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
