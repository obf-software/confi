import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime';
import { FactoryProvider } from '@nestjs/common';

export const bedrockClientFactory: FactoryProvider = {
  provide: BedrockRuntimeClient,
  useFactory: () => {
    return new BedrockRuntimeClient({
      region: 'us-east-1',
    });
  },
};
