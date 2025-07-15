import React from 'react';

import { Details } from './details';
import { Hero } from './hero';
import { Sponsors } from './sponsors';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Details />
      <Sponsors
        items={[
          {
            name: 'Universität Leipzig: SEPT Competence Center',
            logo: 'sept-logo.png',
          },
          {
            name: 'Universität Leipzig',
            logo: 'leipzig-logo.svg',
          },
        ]}
      />
    </>
  );
};
