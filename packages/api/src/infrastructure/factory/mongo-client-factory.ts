import { FactoryProvider, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

export const mongoClientFactory: FactoryProvider = {
  provide: MongoClient,
  inject: [ConfigService],

  useFactory: (configService: ConfigService) => {
    const logger = new Logger('MongoClientFactory');
    const url = configService.getOrThrow<string>('MONGODB_URI');
    const client = new MongoClient(url);

    client.on('error', (error) => {
      logger.error('MongoDB client error', error);
    });

    client.on('connectionReady', () => {
      logger.debug('MongoDB client connection ready');
    });

    return client;
  },
};
