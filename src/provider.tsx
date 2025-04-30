import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider } from './components/snippets/color-mode';
import { themeSystem } from './styles/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout';
import { Home } from './pages/home';

export const Provider = () => {
  const router = createBrowserRouter([
    {
      path: '/*',
      element: <Layout />,
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
