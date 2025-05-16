import { z } from 'zod';

import {
  Opportunity,
  opportunitySchema,
  OpportunityService,
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
}
