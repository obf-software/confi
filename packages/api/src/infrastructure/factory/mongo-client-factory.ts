/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

export const mongoClientFactory: FactoryProvider = {
  provide: MongoClient,
  inject: [ConfigService],

  useFactory: (configService: ConfigService) => {
    const url = configService.getOrThrow('MONGO_URL') as string;
    return new MongoClient(url);
  },
};
