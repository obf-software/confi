import './lib/amplify';
import { queryClient } from './lib/query-client';
import { routes, toChildPath } from './lib/routes';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from './contexts/theme/provider';
import { ToasterProvider } from './contexts/toaster/provider';
import { themeSystem } from './styles/theme';
import { ProtectedRoute } from './components/protected-route';
import { HomeLayout } from './pages/home/layout';
import { Home } from './pages/home';
import { DashboardLayout } from './pages/dashboard/layout';
import { DashboardAdminHome } from './pages/dashboard/admin/home';
import { DashboardAdminTags } from './pages/dashboard/admin/tags';
import { DashboardAdminOpportunities } from './pages/dashboard/admin/opportunities';
import { DashboardAdminAiSearch } from './pages/dashboard/admin/ai-search';
import { DashboardAdminPlannings } from './pages/dashboard/admin/plannings';
import { DashboardAdminAiMatching } from './pages/dashboard/admin/ai-matching';
import { DashboardFindOpportunities } from './pages/dashboard/find-opportunities';
import { DashboardMyPlannings } from './pages/dashboard/my-plannings';
import { DashboardProfile } from './pages/dashboard/profile';
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth } from './pages/auth';
import { DashboardAdminLayout } from './pages/dashboard/admin/layout';
import { DashboardCreatePlanning } from './pages/dashboard/create-planning';

export const Provider: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: routes.home.index,
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: routes.auth.index,
      element: <Auth />,
    },
    {
      path: routes.dashboard.index,
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: (
            <Navigate
              to={routes.dashboard.findOpportunities}
              replace
            />
          ),
        },
        {
          path: toChildPath(routes.dashboard.admin.index),
          element: (
            <ProtectedRoute onlyAllowedRoles={['ADMIN']}>
              <DashboardAdminLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: (
                <Navigate
                  to={routes.dashboard.admin.home}
                  replace
                />
              ),
            },
            {
              path: toChildPath(routes.dashboard.admin.home),
              element: <DashboardAdminHome />,
            },
            {
              path: toChildPath(routes.dashboard.admin.tags),
              element: <DashboardAdminTags />,
            },
            {
              path: toChildPath(routes.dashboard.admin.aiMatching),
              element: <DashboardAdminAiMatching />,
            },
            {
              path: toChildPath(routes.dashboard.admin.opportunities),
              element: <DashboardAdminOpportunities />,
            },
            {
              path: toChildPath(routes.dashboard.admin.aiSearch),
              element: <DashboardAdminAiSearch />,
            },
            {
              path: toChildPath(routes.dashboard.admin.plannings),
              element: <DashboardAdminPlannings />,
            },
          ],
        },
        {
          path: toChildPath(routes.dashboard.findOpportunities),
          element: <DashboardFindOpportunities />,
        },
        {
          path: toChildPath(routes.dashboard.myPlannings),
          element: <DashboardMyPlannings />,
        },
        {
          path: toChildPath(routes.dashboard.createPlanning),
          element: <DashboardCreatePlanning />,
        },
        {
          path: toChildPath(routes.dashboard.profile),
          element: <DashboardProfile />,
        },
      ],
    },
  ]);

  return (
    <ChakraProvider value={themeSystem}>
      <ThemeProvider>
        <ToasterProvider />

        <Authenticator.Provider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Authenticator.Provider>
      </ThemeProvider>
    </ChakraProvider>
  );
};
