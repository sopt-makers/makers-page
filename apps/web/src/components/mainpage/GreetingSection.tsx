import React from 'react';

import Intro from './greeting/Intro';
import MakersIntodution from './greeting/MakersIntodution';
import Missions from './greeting/Missions';

export default function Greeting() {
  return (
    <div>
      <Intro />
      <MakersIntodution />
      <Missions />
    </div>
  );
}
