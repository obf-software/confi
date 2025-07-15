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
import { bedrockClientFactory } from './infrastructure/factory/bedrock-client-factory';
import { mongoClientFactory } from './infrastructure/factory/mongo-client-factory';
import {
  FileStorageService,
  FileStorageServiceS3,
} from './infrastructure/services/file-storage-service';
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
  OpportunityTransformerAwsBedrock,
} from './infrastructure/services/opportunity-transformer';
import { PdfGenerator, PdfGeneratorPuppeteer } from './infrastructure/services/pdf-generator';
import {
  PlanningTransformer,
  PlanningTransformerAwsBedrock,
} from './infrastructure/services/planning-transformer';
import { TagRepository, TagRepositoryDb } from './infrastructure/services/tag-repository';
import {
  TagTransformer,
  TagTransformerAwsBedrock,
} from './infrastructure/services/tag-transformer';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ActionsController, TagsController],
  providers: [
    // Services
    { provide: FileStorageService, useClass: FileStorageServiceS3 },
    { provide: OpportunityRepository, useClass: OpportunityRepositoryDb },
    { provide: OpportunitySource, useClass: OpportunitySourceSheets },
    { provide: OpportunityTransformer, useClass: OpportunityTransformerAwsBedrock },
    { provide: PdfGenerator, useClass: PdfGeneratorPuppeteer },
    { provide: PlanningTransformer, useClass: PlanningTransformerAwsBedrock },
    { provide: TagRepository, useClass: TagRepositoryDb },
    { provide: TagTransformer, useClass: TagTransformerAwsBedrock },

    // Factories
    mongoClientFactory,
    bedrockClientFactory,

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
  app.enableCors();

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
