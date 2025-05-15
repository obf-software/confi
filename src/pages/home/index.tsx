import React from 'react';

import { buildAbsolutePath } from '../../helpers/build-absolute-path';
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
            logo: buildAbsolutePath('sept-logo.png'),
          },
          {
            name: 'Universität Leipzig',
            logo: buildAbsolutePath('leipzig-logo.svg'),
          },
        ]}
      />
    </>
  );
};
