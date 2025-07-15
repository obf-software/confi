import { auth } from '../auth';

const appSync = new sst.aws.AppSync('AppSync', {
  schema: 'infra/app-sync/schema.graphql',
  transform: {
    api: {
      authenticationType: 'AMAZON_COGNITO_USER_POOLS',
      userPoolConfig: {
        defaultAction: 'ALLOW',
        userPoolId: auth.userPool.id,
        appIdClientRegex: auth.userPoolClient.id,
      },
      additionalAuthenticationProviders: [
        {
          authenticationType: 'AWS_IAM',
        },
      ],
    },
  },
});

const noneDS = appSync.addDataSource({
  name: 'noneDS',
});

appSync.addResolver('Mutation publish', {
  dataSource: noneDS.name,
  requestTemplate: `{
    "version": "2017-02-28",
    "payload": {
      "name": "$context.arguments.name",
      "data": $util.toJson($context.arguments.data)
    }
  }`,
  responseTemplate: `
    $util.toJson($context.result)
  `,
});

appSync.addResolver('Subscription subscribe', {
  dataSource: noneDS.name,
  requestTemplate: `{
    "version": "2017-02-28",
    "payload": {
      "name": "$context.arguments.name",
      "data": ""
    }
  }`,
  responseTemplate: `
    #if(\${context.identity.username} != \${context.arguments.name})
      $utils.unauthorized()
    #else
      $util.toJson($context.result)
    #end
  `,
});

export { appSync };
