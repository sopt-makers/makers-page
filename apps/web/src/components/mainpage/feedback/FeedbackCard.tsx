import clsx from 'clsx';
import { m, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { FC, useRef } from 'react';

interface FeedbackCardProps {
  content: string;
  name: string;
  position: string;
  isDark: boolean;
  className?: string;
}

const FeedbackCard: FC<FeedbackCardProps> = ({ className, content, name, position, isDark }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['center end', 'start start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 1], [0.95, 1, 1]);

  useMotionValueEvent(scrollYProgress, 'change', console.log);

  return (
    <m.div
      ref={ref}
      className={clsx('flex flex-col gap-[2.4rem] rounded-[0.8rem] p-[4rem]', className)}
      style={{ opacity, scale }}
    >
      <div className={clsx('text-24-semibold', isDark ? 'text-white' : 'text-black100')}>{content}</div>
      <div className={clsx('flex items-center self-end', isDark ? 'text-white' : 'text-gray1')}>
        <span className='text-18-semibold'>{name}</span>
        <span className='text-18-regular px-[0.1rem]'>∙</span>
        <span className='text-18-regular'>{position}</span>
      </div>
    </m.div>
  );
};

export default FeedbackCard;
