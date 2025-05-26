import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

export const openAiClientFactory: FactoryProvider = {
  provide: OpenAI,
  inject: [ConfigService],

  useFactory: (configService: ConfigService) => {
    const apiKey = configService.getOrThrow<string>('OPENAI_API_KEY');
    const organization = configService.getOrThrow<string>('OPENAI_ORGANIZATION');

    return new OpenAI({ apiKey, organization });
  },
};
