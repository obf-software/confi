import { AuthUser } from 'aws-amplify/auth';
import * as amplifyAuth from 'aws-amplify/auth';
import { UseAuthenticator, useAuthenticator } from '@aws-amplify/ui-react';

interface useAuthReturn {
  user: AuthUser | null;
  status: UseAuthenticator['authStatus'];
  signOut: () => Promise<void>;
  getFreshToken: () => Promise<string>;
}

export const useAuth = (): useAuthReturn => {
  const authenticator = useAuthenticator((context) => [
    context.user,
    context.authStatus,
    context.signOut,
  ]);

  const signOut = async () => {
    void authenticator.signOut();
  };

  const getFreshToken = async () => {
    try {
      const session = await amplifyAuth.fetchAuthSession();
      const token = session.tokens?.accessToken.toString();
      if (!token) throw new Error('No token found in session');
      return token;
    } catch (error) {
      console.error(`Error getting fresh token: ${error}`);
      throw error;
    }
  };

  return {
    user: authenticator.user,
    status: authenticator.authStatus,
    signOut,
    getFreshToken,
  };
};
