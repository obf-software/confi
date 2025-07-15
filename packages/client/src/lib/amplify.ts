import { Amplify, ResourcesConfig } from 'aws-amplify';

const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
      loginWith: {
        username: true,
      },
      signUpVerificationMethod: 'code',
    },
  },
};

Amplify.configure(amplifyConfig);

export { amplifyConfig };
