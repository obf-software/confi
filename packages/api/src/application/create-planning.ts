import { Inject, Injectable, Logger } from '@nestjs/common';
import { Planning } from 'src/domain/planning';
import { FileStorageService } from 'src/infrastructure/services/file-storage-service/file-storage-service';
import { OpportunityRepository } from 'src/infrastructure/services/opportunity-repository';
import { PdfGenerator } from 'src/infrastructure/services/pdf-generator';
import { PlanningTransformer } from 'src/infrastructure/services/planning-transformer';

export interface Input {
  opportunitiesIds: string[];
}

export interface Output {
  planning: Planning;
}

@Injectable()
export class CreatePlanning {
  private readonly logger = new Logger(CreatePlanning.name);

  constructor(
    @Inject(OpportunityRepository) private readonly opportunityRepository: OpportunityRepository,
    @Inject(PlanningTransformer) private readonly planningTransformer: PlanningTransformer,
    @Inject(PdfGenerator) private readonly pdfGenerator: PdfGenerator,
    @Inject(FileStorageService) private readonly fileStorageService: FileStorageService
  ) {}

  async execute(input: Input): Promise<Output> {
    const opportunities = await this.opportunityRepository.findByIds(input.opportunitiesIds);

    const planningData =
      await this.planningTransformer.transformOpportunitiesIntoPlanningData(opportunities);

    const [pdfUrl, icsUrl] = await Promise.all([
      this.pdfGenerator
        .generatePdf(planningData)
        .then((fileBuffer) =>
          this.fileStorageService.upload({
            content: fileBuffer,
            contentType: 'application/pdf',
            extension: 'pdf',
          })
        )
        .then(({ fileInfo }) => this.fileStorageService.getFileDownloadUrl({ fileInfo }))
        .then(({ url }) => url),

      this.planningTransformer
        .transformPlanningDataIntoIcsContent(planningData)
        .then((icsContent) =>
          this.fileStorageService.upload({
            content: icsContent,
            contentType: 'text/calendar',
            extension: 'ics',
          })
        )
        .then(({ fileInfo }) => this.fileStorageService.getFileDownloadUrl({ fileInfo }))
        .then(({ url }) => url),
    ]);

    const planning = Planning.create({ pdfUrl, icsUrl });

    return { planning };
  }
}
