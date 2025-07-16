import './lib/amplify';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ColorModeProvider } from './components/color-mode';
import { DashboardLayout } from './components/dashboard-layout';
import { MainLayout } from './components/main-layout';
import { ProtectedRoute } from './components/protected-route';
import { Toaster } from './components/toaster';
import { AuthProvider } from './contexts/auth-context';
import { Login } from './pages/auth/login';
import { Register } from './pages/auth/register';
import { DashboardOpportunities } from './pages/dashboard/opportunities';
import { DashboardPlannings } from './pages/dashboard/plannings';
import { DashboardProfile } from './pages/dashboard/profile';
import { DashboardResult } from './pages/dashboard/result';
import { DashboardSearch } from './pages/dashboard/search';
import { Home } from './pages/home';
import { Opportunities } from './pages/opportunities';
import { Result } from './pages/result';
import { Search } from './pages/search';
import { themeSystem } from './styles/theme';

const queryClient = new QueryClient();

export const Provider: React.FC = () => {
  // const

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'search',
          element: (
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          ),
        },
        {
          path: 'opportunities',
          element: (
            <ProtectedRoute>
              <Opportunities />
            </ProtectedRoute>
          ),
        },
        {
          path: 'result',
          element: (
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <DashboardSearch />,
        },
        {
          path: 'search',
          element: <DashboardSearch />,
        },
        {
          path: 'opportunities',
          element: <DashboardOpportunities />,
        },
        {
          path: 'result',
          element: <DashboardResult />,
        },
        {
          path: 'plannings',
          element: <DashboardPlannings />,
        },
        {
          path: 'profile',
          element: <DashboardProfile />,
        },
      ],
    },
  ]);

  return (
    <ChakraProvider value={themeSystem}>
      <QueryClientProvider client={queryClient}>
        <ColorModeProvider>
          <AuthProvider>
            <Toaster />
            <RouterProvider router={router} />
          </AuthProvider>
        </ColorModeProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
