import { Inject, Injectable, Logger } from '@nestjs/common';
import { ObjectId } from 'bson';
import { Opportunity } from 'src/domain/opportunity';
import { Planning } from 'src/domain/planning';
import { IcsTransformer } from 'src/infrastructure/services/ics-transformer';
import { PlanningTransformer } from 'src/infrastructure/services/planning-transformer';
import { S3Service } from 'src/infrastructure/services/s3-service';

@Injectable()
export class CreatePlanning {
  private readonly logger = new Logger(CreatePlanning.name);

  constructor(
    @Inject(PlanningTransformer) private readonly planningTransformer: PlanningTransformer,
    @Inject(IcsTransformer) private readonly icsTransformer: IcsTransformer,
    @Inject(S3Service) private readonly s3Service: S3Service
  ) {}

  async execute(input: Input): Promise<Output> {
    this.logger.debug(`Creating planning for ${input.opportunities.length} opportunities`);

    // Generate planning content
    const planningContent = await this.planningTransformer.transform(input.opportunities);
    this.logger.debug('Planning content generated');

    // Generate ICS content
    const icsContent = await this.icsTransformer.transform(planningContent);
    this.logger.debug('ICS content generated');

    // Generate unique file names
    const fileId = new ObjectId().toHexString();
    const pdfKey = `planning/${fileId}.pdf`;
    const icsKey = `planning/${fileId}.ics`;

    // Upload files to S3
    const [pdfUrl, icsUrl] = await Promise.all([
      this.s3Service.uploadFile(pdfKey, planningContent, 'application/pdf'),
      this.s3Service.uploadFile(icsKey, icsContent, 'text/calendar')
    ]);

    this.logger.debug(`Files uploaded - PDF: ${pdfUrl}, ICS: ${icsUrl}`);

    // Create planning domain object
    const planning = Planning.create({
      content: planningContent,
      pdfUrl,
      icsUrl,
    });

    this.logger.log(`Planning created successfully with ID: ${planning.id}`);

    return {
      planning,
      pdfUrl,
      icsUrl,
    };
  }
}

export interface Input {
  opportunities: Opportunity[];
}

export interface Output {
  planning: Planning;
  pdfUrl: string;
  icsUrl: string;
}