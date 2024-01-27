'use client';

import { FC, useEffect, useState } from 'react';

import AboutRecruit from './AboutRecruit';

interface SimpleMenuProps {}

const SimpleMenu: FC<SimpleMenuProps> = ({}) => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  useEffect(() => {
    const pid = setTimeout(() => {
      setIsShowMenu(true);
    }, 5000);

    return () => {
      clearTimeout(pid);
    };
  }, []);

  if (!isShowMenu) {
    return null;
  }

  return (
    <div>
      <AboutRecruit />
    </div>
  );
};

export default SimpleMenu;
