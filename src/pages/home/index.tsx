import React from 'react';
import { Sponsors } from './sponsors';
import { Hero } from './hero';
import { Details } from './details';

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
