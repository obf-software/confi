import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ColorModeProvider } from './components/color-mode';
import { MainLayout } from './components/main-layout';
import { Home } from './pages/home';
import { Search } from './pages/search';
import { themeSystem } from './styles/theme';

export const Provider = () => {
  const basePath = import.meta.env.VITE_BASE_PATH || '/';

  const router = createBrowserRouter([
    {
      path: `${basePath}*`,
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
      ],
    },
  ]);

  return (
    <ChakraProvider value={themeSystem}>
      <ColorModeProvider>
        <RouterProvider router={router} />
      </ColorModeProvider>
    </ChakraProvider>
  );
};
