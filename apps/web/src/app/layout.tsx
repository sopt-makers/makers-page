import './global.css';

import clsx from 'clsx';
import localFont from 'next/font/local';
import { ReactNode } from 'react';

import AnimationProviders from '@/components/core/animation/AnimationProviders';

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ko' className={clsx(suitFont.variable, 'bg-black100 text-[62.5%] text-white')}>
      <body className='min-h-screen'>
        <AnimationProviders>{children}</AnimationProviders>
      </body>
    </html>
  );
}
