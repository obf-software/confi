/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { CreateTag } from './application/create-tag';
import { FindOpportunities } from './application/find-opportunities';
import { LoadOpportunities } from './application/load-opportunities';
import { ActionsController } from './infrastructure/controller/actions-controller';
import { TagsController } from './infrastructure/controller/tags-controller';
import { googleSpreadsheetsFactory } from './infrastructure/factory/google-spreadsheets-factory';
import { mongoClientFactory } from './infrastructure/factory/mongo-client-factory';
import { openAIFactory } from './infrastructure/factory/open-ai-factory';
import {
  OpportunityRepository,
  OpportunityRepositoryDb,
} from './infrastructure/services/opportunity-repository';
import {
  OpportunitySource,
  OpportunitySourceSheets,
} from './infrastructure/services/opportunity-source';
import {
  OpportunityTransformer,
  OpportunityTransformerOpenAi,
} from './infrastructure/services/opportunity-transformer';
import { TagRepository, TagRepositoryDb } from './infrastructure/services/tag-repository';
import { TagTransformer, TagTransformerOpenAi } from './infrastructure/services/tag-transformer';

const config = () => {
  return {
    port: process.env.PORT ?? 3000,
  };
};

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] })],
  controllers: [ActionsController, TagsController],
  providers: [
    // Services
    { provide: OpportunityRepository, useClass: OpportunityRepositoryDb },
    { provide: OpportunitySource, useClass: OpportunitySourceSheets },
    { provide: OpportunityTransformer, useClass: OpportunityTransformerOpenAi },
    { provide: TagRepository, useClass: TagRepositoryDb },
    { provide: TagTransformer, useClass: TagTransformerOpenAi },

    // Factories
    googleSpreadsheetsFactory,
    mongoClientFactory,
    openAIFactory,

    // Use Cases
    CreateTag,
    FindOpportunities,
    LoadOpportunities,
  ],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(console.error);
