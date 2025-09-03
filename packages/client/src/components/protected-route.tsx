import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, ButtonGroup, Heading, Text, VStack } from '@chakra-ui/react';

import { useAuth } from '../hooks/use-auth';
import { LoadingSpinner } from './loading-spinner';
import { UserRole } from '../services/api/api-service';
import { routes } from '../lib/routes';
import { useCurrentUser } from '../hooks/use-current-user';

interface ProtectedRouteProps extends React.PropsWithChildren {
  onlyAllowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, onlyAllowedRoles }) => {
  const { status, signOut } = useAuth();
  const currentUser = useCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      void navigate(routes.auth.index, { state: { from: location }, replace: true });
    }
  }, [status, navigate, location]);

  if (status !== 'authenticated' || currentUser.isLoading) {
    return <LoadingSpinner />;
  }

  const isRoleInvalid =
    currentUser.data?.role &&
    onlyAllowedRoles !== undefined &&
    onlyAllowedRoles.length > 0 &&
    !onlyAllowedRoles.includes(currentUser.data.role);

  const errors = [
    currentUser.error?.message,
    isRoleInvalid ? `Permissão insuficiente` : null,
  ].filter((e): e is string => !!e);

  if (errors.length > 0) {
    return (
      <Box p='8'>
        <VStack
          gap='4'
          align='center'
        >
          <Heading
            size='xl'
            color='fg.emphasized'
          >
            Acesso Negado
          </Heading>

          <Text
            color='fg.muted'
            textAlign='center'
          >
            {errors.join('\n')}
          </Text>

          <Button
            variant='outline'
            colorPalette='teal'
            onClick={() => {
              void signOut();
            }}
          >
            Sair
          </Button>
        </VStack>
      </Box>
    );
  }

  return <>{children}</>;
};
