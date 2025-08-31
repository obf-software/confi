import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

import { useAuth } from '../contexts/auth-context';
import { useCurrentUser } from '../hooks/use-current-user';
import { LoadingSpinner } from './loading-spinner';
import { UserRole } from '../services/api/api-service';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = '/dashboard/find-opportunities',
}) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { user, isLoading: userLoading } = useCurrentUser();
  const location = useLocation();

  if (authLoading || userLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
        replace
      />
    );
  }

  if (!user) {
    return <LoadingSpinner />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <Box p='8'>
        <VStack gap='4' align='center'>
          <Heading size='xl' color='fg.emphasized'>
            Acesso Negado
          </Heading>
          <Text color='fg.muted' textAlign='center'>
            Você não tem permissão para acessar esta página.
          </Text>
          <Navigate to={redirectTo} replace />
        </VStack>
      </Box>
    );
  }

  return <>{children}</>;
};