import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { ColorModeProvider } from './components/color-mode';
import { MainLayout } from './components/main-layout';
import { buildPath } from './helpers/build-path';
import { Home } from './pages/home';
import { Opportunities } from './pages/opportunities';
import { Result } from './pages/result';
import { Search } from './pages/search';
import { themeSystem } from './styles/theme';

const queryClient = new QueryClient();

export const Provider: React.FC = () => {
  // const

  const router = createHashRouter([
    {
      path: '*',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: buildPath('search', true),
          element: <Search />,
        },
        {
          path: buildPath('opportunities', true),
          element: <Opportunities />,
        },
        {
          path: buildPath('result', true),
          element: <Result />,
        },
      ],
    },
  ]);

  return (
    <ChakraProvider value={themeSystem}>
      <QueryClientProvider client={queryClient}>
        <ColorModeProvider>
          <RouterProvider router={router} />
        </ColorModeProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
