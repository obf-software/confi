import { z } from 'zod';

export interface OpportunityServiceFindOpportunitiesInput {
  organizationName: string;
  organizationBriefing: string;
  activityRegion: string;
  organizationType: string;
  activityTime: string;
  businessStage: string;
  ods: string;
  minorityGroups: string[];
  englishLevel: string;
}

export interface OpportunityServiceCreatePlanningInput {
  opportunities: Opportunity[];
}

export interface OpportunityServiceCreatePlanningOutput {
  calendarFile: Blob;
  planningFile: Blob;
}

export const opportunitySchema = z.object({
  name: z.string().default('Oportunidade sem nome'),
  description: z.string().default('Descrição da oportunidade'),
  benefits: z.array(z.string()).default([]),
  requirements: z.array(z.string()).default([]),
  enrollmentDeadline: z.string().default('Sem data prevista'),
  preparationTime: z.string().default('Sem tempo de preparação'),
  requiredDocumentation: z.string().default('Sem documentos necessários'),
  link: z.string().default('Sem link'),
});

export type Opportunity = z.infer<typeof opportunitySchema>;

export interface OpportunityService {
  findOpportunities(input: OpportunityServiceFindOpportunitiesInput): Promise<Opportunity[]>;
  createPlanning(
    input: OpportunityServiceCreatePlanningInput
  ): Promise<OpportunityServiceCreatePlanningOutput>;
}
