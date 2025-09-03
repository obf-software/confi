/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { CreatePlanning } from './application/create-planning';
import { FindOpportunities } from './application/find-opportunities';
import { ActionsController } from './infrastructure/controller/actions-controller';
import { bedrockClientFactory } from './infrastructure/factory/bedrock-client-factory';
import { mongoClientFactory } from './infrastructure/factory/mongo-client-factory';
import { s3ClientFactory } from './infrastructure/factory/s3-client-factory';
import {
  FileStorageService,
  FileStorageServiceS3,
} from './infrastructure/services/file-storage-service';
import {
  OpportunityRepository,
  OpportunityRepositoryDb,
} from './infrastructure/services/opportunity-repository';
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
import {
  PlanningRepository,
  PlanningRepositoryDb,
} from './infrastructure/services/planning-repository';
import { ListPlannings } from './application/list-plannings';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ActionsController],
  providers: [
    // Services
    { provide: FileStorageService, useClass: FileStorageServiceS3 },
    { provide: OpportunityRepository, useClass: OpportunityRepositoryDb },
    { provide: OpportunityTransformer, useClass: OpportunityTransformerAwsBedrock },
    { provide: PdfGenerator, useClass: PdfGeneratorPuppeteer },
    { provide: PlanningRepository, useClass: PlanningRepositoryDb },
    { provide: PlanningTransformer, useClass: PlanningTransformerAwsBedrock },
    { provide: TagRepository, useClass: TagRepositoryDb },
    { provide: TagTransformer, useClass: TagTransformerAwsBedrock },

    // Factories
    mongoClientFactory,
    bedrockClientFactory,
    s3ClientFactory,

    // Use Cases
    CreatePlanning,
    FindOpportunities,
    ListPlannings,
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
