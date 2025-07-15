import { appSync } from './app-sync';
import { auth } from './auth';

const vpc = new sst.aws.Vpc('ApiVpc', {});

const cluster = new sst.aws.Cluster('ApiCluster', { vpc });

const service = new sst.aws.Service('ApiService', {
  cluster,
  image: {
    context: 'packages/api',
  },
  environment: {
    PORT: '8080',
  },
  memory: '0.5 GB',
  cpu: '0.25 vCPU',
  serviceRegistry: {
    port: 8080,
  },
  link: [auth.userPool, auth.userPoolClient, appSync],
  permissions: [
    {
      actions: ['bedrock:*'],
      resources: ['*'],
    },
  ],
});

const apiGateway = new sst.aws.ApiGatewayV2('ApiApiGatewayV2', { vpc });

apiGateway.routePrivate('$default', service.nodes.cloudmapService.arn);

export const api = {
  vpc,
  cluster,
  service,
  apiGateway,
};
