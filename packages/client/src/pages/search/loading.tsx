import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

export type Loading = FlexProps;

export const Loading: React.FC<Loading> = ({ ...flexProps }) => {
  return (
    <Flex
      minH='100vh'
      bgColor='#0A274E'
      {...flexProps}
    >
      <video
        playsInline
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      >
        <source
          src={'loading.mp4'}
          type={'video/mp4'}
        />
      </video>
    </Flex>
  );
};
