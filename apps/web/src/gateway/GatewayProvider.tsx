'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { FC, ReactNode, useState } from 'react';
import { AppRouter } from 'ssr-gateway';
import superjson from 'superjson';

import { TrpcContext } from './browser';

interface TrpcProviderProps {
  children: ReactNode;
}

const GatewayProvider: FC<TrpcProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: '/trpc',
          async headers() {
            return {};
          },
        }),
      ],
      transformer: superjson,
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TrpcContext.Provider value={trpcClient}>{children}</TrpcContext.Provider>
    </QueryClientProvider>
  );
};

export default GatewayProvider;
