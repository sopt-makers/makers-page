import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { middleware, publicProcedure, router } from "../trpc/stub";

const isInternalRequest = middleware(async (opts) => {
  const { ctx } = opts;
  const apiKey = ctx.req.headers.get("X-Api-Key");

  if (!apiKey || !ctx.checkApiKey(apiKey)) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next();
});

const internalProcedure = publicProcedure.use(isInternalRequest);

export const internalRouter = router({
  ping: internalProcedure.input(z.string()).query(({ input }) => {
    return `pong to ${input}!`;
  }),
});
