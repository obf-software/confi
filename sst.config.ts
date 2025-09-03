/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'confi',
      removal: input.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      providers: {
        cloudflare: '6.8.0',
      },
    };
  },
  async run() {
    // await import('./infra/app-sync');
    await import('./infra/env');
    await import('./infra/auth');
    // await import('./infra/api');
    const { client } = await import('./infra/client');
    return {
      client: client.staticSite.url,
    };
  },
});
