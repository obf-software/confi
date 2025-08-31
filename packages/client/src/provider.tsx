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
import { RoleProtectedRoute } from './components/role-protected-route';
import { Login } from './pages/auth/login';
import { Register } from './pages/auth/register';
import { DashboardIndex } from './pages/dashboard';
import { DashboardStatistics } from './pages/dashboard/statistics';
import { DashboardTags } from './pages/dashboard/tags';
import { DashboardAdminOpportunities } from './pages/dashboard/admin/opportunities';
import { DashboardAdminOpportunitiesSearch } from './pages/dashboard/admin/opportunities-search';
import { DashboardAdminPlannings } from './pages/dashboard/admin/plannings';
import { DashboardAdminEvaluations } from './pages/dashboard/admin/evaluations';
import { DashboardFindOpportunities } from './pages/dashboard/find-opportunities';
import { DashboardMyPlannings } from './pages/dashboard/my-plannings';
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
          element: <DashboardIndex />,
        },
        // Admin-only routes
        {
          path: 'statistics',
          element: (
            <RoleProtectedRoute allowedRoles={['ADMIN']}>
              <DashboardStatistics />
            </RoleProtectedRoute>
          ),
        },
        {
          path: 'tags',
          element: (
            <RoleProtectedRoute allowedRoles={['ADMIN']}>
              <DashboardTags />
            </RoleProtectedRoute>
          ),
        },
        {
          path: 'admin/evaluations',
          element: (
            <RoleProtectedRoute allowedRoles={['ADMIN']}>
              <DashboardAdminEvaluations />
            </RoleProtectedRoute>
          ),
        },
        {
          path: 'admin/opportunities',
          element: (
            <RoleProtectedRoute allowedRoles={['ADMIN']}>
              <DashboardAdminOpportunities />
            </RoleProtectedRoute>
          ),
        },
        {
          path: 'admin/opportunities-search',
          element: (
            <RoleProtectedRoute allowedRoles={['ADMIN']}>
              <DashboardAdminOpportunitiesSearch />
            </RoleProtectedRoute>
          ),
        },
        {
          path: 'admin/plannings',
          element: (
            <RoleProtectedRoute allowedRoles={['ADMIN']}>
              <DashboardAdminPlannings />
            </RoleProtectedRoute>
          ),
        },
        // Common routes (all authenticated users)
        {
          path: 'find-opportunities',
          element: <DashboardFindOpportunities />,
        },
        {
          path: 'my-plannings',
          element: <DashboardMyPlannings />,
        },
        {
          path: 'profile',
          element: <DashboardProfile />,
        },
        // Legacy routes (keeping for backward compatibility)
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
