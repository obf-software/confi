import {
  type AuthUser,
  confirmSignUp,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from 'aws-amplify/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<{ nextStep: unknown }>;
  confirmRegistration: (email: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuthState: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const refreshAuthState = async () => {
    try {
      const user = await getCurrentUser();
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  const login = async (email: string, password: string) => {
    const { isSignedIn } = await signIn({
      username: email,
      password,
    });

    if (isSignedIn) {
      await refreshAuthState();
    }
  };

  const register = async (email: string, password: string, name: string) => {
    const { nextStep } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name: 'teste',
        },
      },
    });

    return { nextStep };
  };

  const confirmRegistration = async (email: string, code: string) => {
    await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
  };

  const logout = async () => {
    await signOut();
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  useEffect(() => {
    void refreshAuthState();
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    confirmRegistration,
    logout,
    refreshAuthState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
