'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useState } from 'react';

import FullscreenLoading from '@/components/common/FullscreenLoading';

export function RenderingLoading() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    setTimeout(() => setLoaded(true), 1000);
  }, []);

  return (
    <AnimatePresence>
      {!loaded && (
        <m.div
          className='bg-black100 fixed left-0 right-0 top-0 z-50 min-h-[calc(100vh+1px)]'
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <FullscreenLoading />
        </m.div>
      )}
    </AnimatePresence>
  );
}
