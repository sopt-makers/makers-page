import './global.css';
import '@sopt-makers/ui/dist/index.css';

import clsx from 'clsx';
import localFont from 'next/font/local';
import Script from 'next/script';
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
  title: 'SOPT makers',
  description: '',
  colorScheme: 'dark',
  themeColor: '#0F1010',
  openGraph: {
    title: 'SOPT makers',
    description: '',
    url: BASE_URL ?? undefined,
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ko' className={clsx(suitFont.variable, 'bg-black100 text-[62.5%] text-white')}>
      <Script id='init-gtm'>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P7FTW7RG');`}</Script>
      <body className='min-h-screen'>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-P7FTW7RG'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <GatewayProvider>
          <AnimationProviders>{children}</AnimationProviders>
        </GatewayProvider>
      </body>
    </html>
  );
}
