import { Authenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';
import { routes } from '../../lib/routes';

import '@aws-amplify/ui-react/styles.css';

export const Auth: React.FC = () => {
  return (
    <Authenticator
      loginMechanism='email'
      loginMechanisms={['email']}
      signUpAttributes={['email', 'name']}
      variation='modal'
    >
      {() => <Navigate to={routes.dashboard.index} />}
    </Authenticator>
  );
};
