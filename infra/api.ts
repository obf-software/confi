import { appSync } from './app-sync';
import { auth } from './auth';
import { env } from './env';

const vpc = new sst.aws.Vpc('ApiVpc', {});

const cluster = new sst.aws.Cluster('ApiCluster', { vpc });

const bucket = new sst.aws.Bucket('ApiBucket');

const service = new sst.aws.Service('ApiService', {
  cluster,
  image: {
    context: 'packages/api',
  },
  environment: {
    PORT: '8080',
    MONGODB_URI: env.MONGODB_URI,
    GOOGLE_SPREADSHEET_ID: env.GOOGLE_SPREADSHEET_ID,
    GOOGLE_SERVICE_ACCOUNT_EMAIL: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_SERVICE_ACCOUNT_KEY: env.GOOGLE_SERVICE_ACCOUNT_KEY,
    S3_BUCKET_NAME: bucket.name,
  },
  memory: '0.5 GB',
  cpu: '0.25 vCPU',
  serviceRegistry: {
    port: 8080,
  },
  dev: {
    url: 'http://localhost:8080',
    command: 'pnpm dev',
    autostart: true,
  },
  permissions: [
    {
      actions: ['bedrock:*'],
      resources: ['*'],
    },
  ],
  link: [auth.userPool, auth.userPoolClient, appSync, bucket],
});

let apiGateway: sst.aws.ApiGatewayV2 | undefined = undefined;

if (!$dev) {
  apiGateway = new sst.aws.ApiGatewayV2('ApiApiGatewayV2', { vpc });
  apiGateway.routePrivate('$default', service.nodes.cloudmapService.arn);
}

const url = apiGateway?.url || 'http://localhost:8080';

export const api = {
  bucket,
  vpc,
  cluster,
  service,
  url,
};
