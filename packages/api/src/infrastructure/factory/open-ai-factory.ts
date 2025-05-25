/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

export const openAIFactory: FactoryProvider = {
  provide: OpenAI,
  inject: [ConfigService],

  useFactory: (configService: ConfigService) => {
    const apiKey = configService.getOrThrow('OPENAI_API_KEY') as string;
    return new OpenAI({ apiKey });
  },
};
