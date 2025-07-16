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

type AuthNextSignUpStep = 'CONFIRM_SIGN_UP' | 'COMPLETE_AUTO_SIGN_IN' | 'DONE';

type AuthNextSignInStep =
  | 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP'
  | 'CONTINUE_SIGN_IN_WITH_EMAIL_SETUP'
  | 'CONFIRM_SIGN_IN_WITH_TOTP_CODE'
  | 'CONTINUE_SIGN_IN_WITH_MFA_SELECTION'
  | 'CONTINUE_SIGN_IN_WITH_MFA_SETUP_SELECTION'
  | 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE'
  | 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED'
  | 'CONFIRM_SIGN_IN_WITH_SMS_CODE'
  | 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE'
  | 'CONFIRM_SIGN_UP'
  | 'RESET_PASSWORD'
  | 'DONE'
  | 'CONTINUE_SIGN_IN_WITH_FIRST_FACTOR_SELECTION'
  | 'CONFIRM_SIGN_IN_WITH_PASSWORD';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<AuthNextSignInStep>;
  register: (email: string, password: string, name: string) => Promise<AuthNextSignUpStep>;
  confirmRegistration: (email: string, code: string) => Promise<AuthNextSignUpStep>;
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
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password,
    });

    if (isSignedIn) {
      await refreshAuthState();
    }

    return nextStep.signInStep;
  };

  const register = async (email: string, password: string, name: string) => {
    const { nextStep, isSignUpComplete } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name,
        },
        autoSignIn: true,
      },
    });

    if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
    }

    if (isSignUpComplete) {
      await refreshAuthState();
    }

    return nextStep.signUpStep;
  };

  const confirmRegistration = async (email: string, code: string) => {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });

    if (isSignUpComplete) {
      await refreshAuthState();
    }

    return nextStep.signUpStep;
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
