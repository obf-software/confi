import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ColorModeProvider } from './components/color-mode';
import { MainLayout } from './components/main-layout';
import { buildAbsolutePath } from './helpers/build-absolute-path';
import { Home } from './pages/home';
import { Opportunities } from './pages/opportunities';
import { Result } from './pages/result';
import { Search } from './pages/search';
import { themeSystem } from './styles/theme';

const queryClient = new QueryClient();

export const Provider: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: buildAbsolutePath('/'),
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'search',
          element: <Search />,
        },
        {
          path: 'opportunities',
          element: <Opportunities />,
        },
        {
          path: 'result',
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
