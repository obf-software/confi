const userPool = new sst.aws.CognitoUserPool('AuthUserPool', {
  transform: {
    userPool: {
      autoVerifiedAttributes: ['email'],
    },
  },
  verify: {
    emailMessage: 'Seu código de confirmação é {####}',
    emailSubject: 'Confirme sua conta no Confi',
  },
});

const userPoolClient = userPool.addClient('AuthUserPoolClient', {});

export const auth = {
  userPool,
  userPoolClient,
};
