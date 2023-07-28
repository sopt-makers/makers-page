'use clinet';

import { m, useScroll, useTransform } from 'framer-motion';

import Footer from './Footer';
// import Header from './Header';

export default function FloatingSection() {
  const { scrollYProgress } = useScroll();
  //   const opacityHeader = useTransform(scrollYProgress, [0, 0.07], [0, 1]);
  const opacityFooter = useTransform(scrollYProgress, [0, 0.07, 0.97, 0.99], [0, 1, 1, 0]);

  return (
    <div className='hidden md:block'>
      {/* <m.div style={{ opacity: opacityHeader }}>
        <Header />
      </m.div> */}
      <m.div style={{ opacity: opacityFooter }}>
        <Footer />
      </m.div>
    </div>
  );
}
