import { Box } from '@chakra-ui/react';
import React from 'react';

import { Details } from './details';
import { Features } from './features';
import { Hero } from './hero';
import { Sponsors } from './sponsors';
import { Testimonials } from './testimonials';

export const Home: React.FC = () => {
  React.useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <Box>
      <Hero />
      <Features />
      <Details />
      <Testimonials />
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
    </Box>
  );
};
