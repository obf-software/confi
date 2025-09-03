import { env } from './env';

const appUrl = `https://${env.CLOUDFLARE_DOMAIN_NAME}`;

const userPool = new sst.aws.CognitoUserPool('AuthUserPool', {
  transform: {
    userPool: {
      autoVerifiedAttributes: ['email'],
    },
  },
  verify: {
    emailMessage: `
Your confirmation code is {####}.
<br />
Enter the code in the app (${appUrl}) to confirm your account.
<br />
<br />
<b>Never share this code with anyone.</b>
<br />
<br />
<b>Regards,
<br />
<b>Confi Team</b>`,
    emailSubject: 'Confi - Confirm your account',
  },
});

const userPoolClient = userPool.addClient('AuthUserPoolClient', {});

export const auth = {
  userPool,
  userPoolClient,
};
