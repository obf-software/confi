import React from 'react';

import { buildPath } from '../../helpers/build-path';
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
            logo: buildPath('sept-logo.png'),
          },
          {
            name: 'Universität Leipzig',
            logo: buildPath('leipzig-logo.svg'),
          },
        ]}
      />
    </>
  );
};
