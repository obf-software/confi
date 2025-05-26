import { Inject, Injectable, Logger } from '@nestjs/common';
import { ObjectId } from 'bson';
import { Opportunity } from 'src/domain/opportunity';
import { Planning } from 'src/domain/planning';
import { IcsTransformer } from 'src/infrastructure/services/ics-transformer';
import { PdfGenerator } from 'src/infrastructure/services/pdf-generator';
import { PlanningTransformer } from 'src/infrastructure/services/planning-transformer';
import { S3Service } from 'src/infrastructure/services/s3-service';

@Injectable()
export class CreatePlanning {
  private readonly logger = new Logger(CreatePlanning.name);

  constructor(
    @Inject(PlanningTransformer) private readonly planningTransformer: PlanningTransformer,
    @Inject(IcsTransformer) private readonly icsTransformer: IcsTransformer,
    @Inject(PdfGenerator) private readonly pdfGenerator: PdfGenerator,
    @Inject(S3Service) private readonly s3Service: S3Service
  ) {}

  async execute(input: Input): Promise<Output> {
    this.logger.debug(`Creating planning for ${input.opportunities.length} opportunities`);

    // Generate structured planning data
    const planningData = await this.planningTransformer.transform(input.opportunities);
    this.logger.debug('Planning data generated');

    // Generate beautiful PDF from structured data
    const pdfBuffer = await this.pdfGenerator.generatePdf(planningData);
    this.logger.debug('PDF generated');

    // Generate ICS content from planning data
    const planningText = this.convertPlanningDataToText(planningData);
    const icsContent = await this.icsTransformer.transform(planningText);
    this.logger.debug('ICS content generated');

    // Generate unique file names
    const fileId = new ObjectId().toHexString();
    const pdfKey = `planning/${fileId}.pdf`;
    const icsKey = `planning/${fileId}.ics`;

    // Upload files to S3
    const [pdfUrl, icsUrl] = await Promise.all([
      this.s3Service.uploadFile(pdfKey, pdfBuffer, 'application/pdf'),
      this.s3Service.uploadFile(icsKey, icsContent, 'text/calendar'),
    ]);

    this.logger.debug(`Files uploaded - PDF: ${pdfUrl}, ICS: ${icsUrl}`);

    // Create planning domain object
    const planning = Planning.create({
      content: planningText,
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

  private convertPlanningDataToText(planningData: any): string {
    let text = 'PLANEJAMENTO DE INSCRIÇÃO - OPORTUNIDADES INTERNACIONAIS DE FUNDING\n\n';

    // Add opportunities info
    planningData.opportunities.forEach((opp: any) => {
      text += `Oportunidade: ${opp.name}\n`;
      text += `Benefícios: ${opp.benefits.join(', ')}\n`;
      text += `Prazo de Inscrição: ${opp.enrollmentDeadline}\n`;
      text += `Link oficial: ${opp.link}\n\n`;
    });

    // Add steps
    planningData.steps.forEach((step: any) => {
      text += `${step.emoji} ${step.title}\n`;
      if (step.description) {
        text += `${step.description}\n`;
      }

      step.tasks.forEach((task: any) => {
        text += `[ ] ${task.description}`;
        if (task.estimatedTime) {
          text += ` (${task.estimatedTime})`;
        }
        text += '\n';
      });
      text += '\n';
    });

    return text;
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
