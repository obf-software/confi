const userPool = new sst.aws.CognitoUserPool('AuthUserPool', {});

const userPoolClient = userPool.addClient('AuthUserPoolClient');

export const auth = {
  userPool,
  userPoolClient,
};
