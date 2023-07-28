import { m, useScroll, useTransform } from 'framer-motion';

import MakersLogo3D from '@/components/common/MakersLogo3D';

import Intro from './Intro';
import MakersIntodution from './MakersIntodution';
import Missions from './Missions';

export default function Greeting() {
  const { scrollYProgress } = useScroll();
  const paddingBottomLogo = useTransform(scrollYProgress, [0, 0.07], ['35rem', '0rem']);
  const opacityLogo = useTransform(scrollYProgress, [0, 0.07], [1, 0.5]);

  return (
    <div className='relative h-[770rem] md:h-[790rem]'>
      <div className='absolute inset-0'>
        <div className='sticky top-0 flex h-[100vh] items-center justify-center'>
          <m.div style={{ paddingBottom: paddingBottomLogo, opacity: opacityLogo }}>
            <MakersLogo3D className='h-[27rem] w-[27rem] md:h-[40rem] md:w-[40rem]' />
          </m.div>
        </div>
      </div>
      <m.div className='absolute inset-0'>
        <Intro className='pt-[10rem] md:pt-[20rem]' />
        <MakersIntodution />
        <Missions />
      </m.div>
    </div>
  );
}
