/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { CreatePlanning } from './application/create-planning';
import { CreateTag } from './application/create-tag';
import { FindOpportunities } from './application/find-opportunities';
import { LoadOpportunities } from './application/load-opportunities';
import { ActionsController } from './infrastructure/controller/actions-controller';
import { TagsController } from './infrastructure/controller/tags-controller';
import { googleSpreadsheetsFactory } from './infrastructure/factory/google-spreadsheets-factory';
import { mongoClientFactory } from './infrastructure/factory/mongo-client-factory';
import { openAIFactory } from './infrastructure/factory/open-ai-factory';
import { s3Factory } from './infrastructure/factory/s3-factory';
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
import {
  PlanningTransformer,
  PlanningTransformerOpenAi,
} from './infrastructure/services/planning-transformer';
import {
  IcsTransformer,
  IcsTransformerOpenAi,
} from './infrastructure/services/ics-transformer';
import {
  PdfGenerator,
  PdfGeneratorPuppeteer,
} from './infrastructure/services/pdf-generator';
import {
  S3Service,
  S3ServiceAws,
} from './infrastructure/services/s3-service';
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
    { provide: PlanningTransformer, useClass: PlanningTransformerOpenAi },
    { provide: IcsTransformer, useClass: IcsTransformerOpenAi },
    { provide: PdfGenerator, useClass: PdfGeneratorPuppeteer },
    { provide: S3Service, useClass: S3ServiceAws },
    { provide: TagRepository, useClass: TagRepositoryDb },
    { provide: TagTransformer, useClass: TagTransformerOpenAi },

    // Factories
    googleSpreadsheetsFactory,
    mongoClientFactory,
    openAIFactory,
    s3Factory,

    // Use Cases
    CreatePlanning,
    CreateTag,
    FindOpportunities,
    LoadOpportunities,
  ],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup(
    'api-spec',
    app,
    () =>
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
          .setTitle('Confi API')
          .setVersion('latest')
          .addTag('Actions', 'Available actions')
          .addTag('Tags', 'Manage tags')
          .setContact('Confi', 'https://confi.com', 'support@confi.com')
          .setExternalDoc('GitHub', 'https://github.com/obf-software/confi')
          .build()
      ),
    {
      customSiteTitle: 'Confi API Documentation',
    }
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(console.error);
