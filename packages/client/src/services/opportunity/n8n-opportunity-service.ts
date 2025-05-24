import PdfPrinter from 'pdfmake/build/pdfmake';
import PdfFonts from 'pdfmake/build/vfs_fonts';
import { z } from 'zod';

import {
  Opportunity,
  opportunitySchema,
  OpportunityService,
  OpportunityServiceCreatePlanningInput,
  OpportunityServiceCreatePlanningOutput,
  OpportunityServiceFindOpportunitiesInput,
} from './protocols';

export class N8nOpportunityService implements OpportunityService {
  async findOpportunities(input: OpportunityServiceFindOpportunitiesInput): Promise<Opportunity[]> {
    const response = await fetch(
      'https://primary-production-ca8e.up.railway.app/webhook/9b100fc7-6454-449a-89e7-3b3c9c93d4de',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      }
    );

    const rawBody: unknown = await response.json();
    const responseSchema = z.object({
      message: z.object({
        content: z.object({
          opportunities: z.array(opportunitySchema),
        }),
      }),
    });
    const { success, data, error } = responseSchema.safeParse(rawBody);

    if (!success) {
      console.error(`Não foi possível obter as oportunidades`, error);
      return [];
    }

    return data.message.content.opportunities;
  }

  async createPlanning(
    input: OpportunityServiceCreatePlanningInput
  ): Promise<OpportunityServiceCreatePlanningOutput> {
    const response = await fetch(
      'https://primary-production-ca8e.up.railway.app/webhook/143cdbba-ab5d-44a3-ad88-0e3e69f58b4f',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      }
    );

    const rawBody: unknown = await response.json();
    const responseSchema = z.object({
      calendar_ics_file_content: z.string(),
      planning_pdf_file_content: z.string(),
    });
    const { success, data, error } = responseSchema.safeParse(rawBody);

    if (!success) {
      console.error(`Não foi possível obter as oportunidades`, error);
      throw new Error('Não foi possível obter as oportunidades');
    }

    const calendarFile = new Blob([data.calendar_ics_file_content], { type: 'text/plain' });
    const planningFile = await this.generatePdfFileFromString(data.planning_pdf_file_content);

    return {
      calendarFile,
      planningFile,
    };
  }

  private async generatePdfFileFromString(data: string): Promise<Blob> {
    return new Promise<Blob>((resolve) => {
      PdfPrinter.vfs = PdfFonts.vfs;
      PdfPrinter.createPdf({
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [{ text: data, fontSize: 12 }],
      }).getBlob((output) => {
        resolve(output);
      });
    });
  }
}
