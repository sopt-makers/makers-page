import { createTRPCProxyClient } from '@trpc/client';
import { createContext, useContext } from 'react';
import { AppRouter } from 'ssr-gateway';

export const TrpcContext = createContext<ReturnType<typeof createTRPCProxyClient<AppRouter>>>(
  new Proxy(
    {},
    {
      get: () => {
        throw new Error('TrpcContext is not set.');
      },
    },
  ) as never,
);

export const useGateway = () => {
  return useContext(TrpcContext);
};
