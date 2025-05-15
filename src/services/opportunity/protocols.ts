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

export interface Opportunity {
  name: string;
  description: string;
  benefits: string[];
  requirements: string[];
  enrollmentDeadline: string;
  preparationTime: string;
  requiredDocumentation: string;
  link: string;
}

export interface OpportunityService {
  findOpportunities(input: OpportunityServiceFindOpportunitiesInput): Promise<Opportunity[]>;
}
