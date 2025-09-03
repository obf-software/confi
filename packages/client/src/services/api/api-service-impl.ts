import { ApiService } from './api-service';

export class ApiServiceImpl implements ApiService {
  private token: string | null = null;

  constructor(private readonly apiUrl: string) {}

  withToken(input: ApiService.WithTokenInput): ApiService {
    this.token = input.token;
    return this;
  }

  // Users
  async listUsers(input: ApiService.ListUsersInput): Promise<ApiService.ListUsersOutput> {
    throw new Error('Not implemented');
  }

  async getUser(input: ApiService.GetUserInput): Promise<ApiService.GetUserOutput> {
    throw new Error('Not implemented');
  }

  // Tags
  async listTags(input: ApiService.ListTagsInput): Promise<ApiService.ListTagsOutput> {
    throw new Error('Not implemented');
  }

  async getTag(input: ApiService.GetTagInput): Promise<ApiService.GetTagOutput> {
    throw new Error('Not implemented');
  }

  async updateTag(input: ApiService.UpdateTagInput): Promise<ApiService.UpdateTagOutput> {
    throw new Error('Not implemented');
  }

  async createTag(input: ApiService.CreateTagInput): Promise<ApiService.CreateTagOutput> {
    throw new Error('Not implemented');
  }

  async deleteTag(input: ApiService.DeleteTagInput): Promise<ApiService.DeleteTagOutput> {
    throw new Error('Not implemented');
  }

  // Opportunity Searches
  async listOpportunitySearches(
    input: ApiService.ListOpportunitySearchesInput
  ): Promise<ApiService.ListOpportunitySearchesOutput> {
    throw new Error('Not implemented');
  }

  async getOpportunitySearch(
    input: ApiService.GetOpportunitySearchInput
  ): Promise<ApiService.GetOpportunitySearchOutput> {
    throw new Error('Not implemented');
  }

  async updateOpportunitySearch(
    input: ApiService.UpdateOpportunitySearchInput
  ): Promise<ApiService.UpdateOpportunitySearchOutput> {
    throw new Error('Not implemented');
  }

  async createOpportunitySearch(
    input: ApiService.CreateOpportunitySearchInput
  ): Promise<ApiService.CreateOpportunitySearchOutput> {
    throw new Error('Not implemented');
  }

  async runOpportunitySearch(
    input: ApiService.RunOpportunitySearchInput
  ): Promise<ApiService.RunOpportunitySearchOutput> {
    throw new Error('Not implemented');
  }

  async deleteOpportunitySearch(
    input: ApiService.DeleteOpportunitySearchInput
  ): Promise<ApiService.DeleteOpportunitySearchOutput> {
    throw new Error('Not implemented');
  }

  // Opportunities
  async listOpportunities(
    input: ApiService.ListOpportunitiesInput
  ): Promise<ApiService.ListOpportunitiesOutput> {
    throw new Error('Not implemented');
  }

  async getOpportunity(
    input: ApiService.GetOpportunityInput
  ): Promise<ApiService.GetOpportunityOutput> {
    throw new Error('Not implemented');
  }

  async updateOpportunity(
    input: ApiService.UpdateOpportunityInput
  ): Promise<ApiService.UpdateOpportunityOutput> {
    throw new Error('Not implemented');
  }

  async createOpportunity(
    input: ApiService.CreateOpportunityInput
  ): Promise<ApiService.CreateOpportunityOutput> {
    throw new Error('Not implemented');
  }

  async deleteOpportunity(
    input: ApiService.DeleteOpportunityInput
  ): Promise<ApiService.DeleteOpportunityOutput> {
    throw new Error('Not implemented');
  }

  // Plannings
  async listPlannings(
    input: ApiService.ListPlanningsInput
  ): Promise<ApiService.ListPlanningsOutput> {
    throw new Error('Not implemented');
  }

  async getPlanning(input: ApiService.GetPlanningInput): Promise<ApiService.GetPlanningOutput> {
    throw new Error('Not implemented');
  }

  async updatePlanning(
    input: ApiService.UpdatePlanningInput
  ): Promise<ApiService.UpdatePlanningOutput> {
    throw new Error('Not implemented');
  }

  async createPlanning(
    input: ApiService.CreatePlanningInput
  ): Promise<ApiService.CreatePlanningOutput> {
    throw new Error('Not implemented');
  }

  async deletePlanning(
    input: ApiService.DeletePlanningInput
  ): Promise<ApiService.DeletePlanningOutput> {
    throw new Error('Not implemented');
  }

  // Files
  async getFileUrl(input: ApiService.GetFileUrlInput): Promise<ApiService.GetFileUrlOutput> {
    throw new Error('Not implemented');
  }

  // Evaluations
  async listEvaluations(
    input: ApiService.ListEvaluationsInput
  ): Promise<ApiService.ListEvaluationsOutput> {
    throw new Error('Not implemented');
  }

  async createEvaluation(
    input: ApiService.CreateEvaluationInput
  ): Promise<ApiService.CreateEvaluationOutput> {
    throw new Error('Not implemented');
  }
}
