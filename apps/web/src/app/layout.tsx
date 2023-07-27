import './global.css';

import clsx from 'clsx';
import localFont from 'next/font/local';
import { ReactNode } from 'react';

import AnimationProviders from '@/components/core/animation/AnimationProviders';
import GatewayProvider from '@/gateway/GatewayProvider';

export const runtime = 'edge';

const suitFont = localFont({
  src: [
    {
      path: './SUIT-Light.woff2',
      weight: '300',
    },
    {
      path: './SUIT-Regular.woff2',
      weight: '400',
    },
    {
      path: './SUIT-Medium.woff2',
      weight: '500',
    },
    {
      path: './SUIT-SemiBold.woff2',
      weight: '600',
    },
    {
      path: './SUIT-Bold.woff2',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-suit',
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata = {
  metadataBase: BASE_URL ? new URL(BASE_URL) : undefined,
  title: 'SOPT Makers',
  description: '',
  colorScheme: 'dark',
  themeColor: '#0F1010',
  openGraph: {
    title: 'SOPT Makers',
    description: '',
    url: BASE_URL ?? undefined,
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ko' className={clsx(suitFont.variable, 'bg-black100 text-[62.5%] text-white')}>
      <body className='min-h-screen'>
        <GatewayProvider>
          <AnimationProviders>{children}</AnimationProviders>
        </GatewayProvider>
      </body>
    </html>
  );
}
