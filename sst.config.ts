// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'confi',
      removal: input.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    // await import('./infra/app-sync');
    await import('./infra/auth');
    // await import('./infra/api');
    const { client } = await import('./infra/client');

    return {
      client: client.staticSite.url,
    };
  },
});
