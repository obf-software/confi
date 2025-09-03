// import { api } from './api';
import { auth } from './auth';
import { env } from './env';

const staticSite = new sst.aws.StaticSite('ClientStaticSite', {
  path: 'packages/client',
  domain: {
    name: env.CLOUDFLARE_DOMAIN_NAME,
    dns: sst.cloudflare.dns(),
  },
  dev: {
    url: 'http://localhost:5173',
    command: 'pnpm dev',
    autostart: true,
    title: 'Client',
  },
  build: {
    output: 'dist',
    command: 'pnpm build',
  },
  environment: {
    // VITE_API_URL: api.url,
    VITE_USE_API_MOCK: 'true',
    VITE_USER_POOL_ID: auth.userPool.id,
    VITE_USER_POOL_CLIENT_ID: auth.userPoolClient.id,
  },
});

export const client = {
  staticSite,
};
