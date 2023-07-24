import React from 'react';

import Intro from './greetingsection/Intro';
import MakersIntodution from './greetingsection/MakersIntodution';
import Missions from './greetingsection/Missions';

export default function Greeting() {
  return (
    <div>
      <Intro />
      <MakersIntodution />
      <Missions />
    </div>
  );
}
