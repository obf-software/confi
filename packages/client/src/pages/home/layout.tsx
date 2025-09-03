import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

export type HomeLayoutProps = BoxProps;

export const HomeLayout: React.FC<HomeLayoutProps> = ({ ...boxProps }) => {
  return (
    <Box
      width='100%'
      maxWidth='100%'
      {...boxProps}
    >
      <Outlet />
    </Box>
  );
};
