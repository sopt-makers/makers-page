'use client';
import * as Collapsible from '@radix-ui/react-collapsible';
import clsx from 'clsx';
import { FC, ReactNode, useState } from 'react';

interface ToggleBlockProps {
  className?: string;
  children?: ReactNode;
  header?: ReactNode;
}

const ToggleBlock: FC<ToggleBlockProps> = ({ className, header, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root className={className} open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <div className='flex cursor-pointer items-center rounded py-[0.4rem] text-[1.8rem] transition-colors hover:bg-white/5'>
          <ToggleIcon
            className={clsx(
              'mr-[0.4rem] h-[2.4rem] w-[2.4rem] transform transition-transform',
              open && 'rotate-[90deg]',
            )}
          />
          {header}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content asChild>
        <div className='min-h-[2rem] pl-[2rem]'>{children}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default ToggleBlock;

function ToggleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M6 11L6 4L10.5 7.5L6 11Z' fill='currentColor'></path>
    </svg>
  );
}
