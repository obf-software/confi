import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider } from './components/snippets/color-mode';
import { themeSystem } from './styles/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/main-layout';
import { Home } from './pages/home';

export const Provider = () => {
  const basePath = import.meta.env.VITE_BASE_PATH ?? '/';
  const router = createBrowserRouter([
    {
      path: `${basePath}*`,
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
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
