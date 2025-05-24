import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { Toaster } from './toaster';

export type MainLayoutProps = BoxProps;

export const MainLayout: React.FC<MainLayoutProps> = ({ ...boxProps }) => {
  return (
    <Box
      width='100%'
      maxWidth='100%'
      {...boxProps}
    >
      <Outlet />
      <Toaster />
    </Box>
  );
};
