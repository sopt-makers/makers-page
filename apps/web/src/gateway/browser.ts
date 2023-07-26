import { createTRPCProxyClient } from '@trpc/client';
import { createContext, useContext } from 'react';
import { AppRouter } from 'ssr-gateway';

export const TrpcContext = createContext<ReturnType<typeof createTRPCProxyClient<AppRouter>>>(
  new Proxy({}, { get: () => console.log('nop') }) as never,
);

export const useGateway = () => {
  return useContext(TrpcContext);
};
