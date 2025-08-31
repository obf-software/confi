import { ApiService, Opportunity, OpportunitySearch, Planning, Tag, User } from './api-service';

// Utility functions
const success = <T>(data: T): Promise<ApiService.ApiServiceResponse<T>> =>
  Promise.resolve({ success: true, data });

const failure = (
  errors: ApiService.ApiServiceError[]
): Promise<ApiService.ApiServiceResponse<never>> => Promise.resolve({ success: false, errors });

export class ApiServiceMock implements ApiService {
  constructor() {}

  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'ADMIN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      role: 'USER',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private tags: Tag[] = [
    {
      id: '1',
      name: 'Tag 1',
      description: 'Tag 1 description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Tag 2',
      description: 'Tag 2 description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private opportunitySearches: OpportunitySearch[] = [
    {
      id: '1',
      name: 'Opportunity Search 1',
      prompt: 'Opportunity Search 1 prompt',
      status: 'DRAFT',
      numberOfOpportunities: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Opportunity Search 2',
      prompt: 'Opportunity Search 2 prompt',
      status: 'IN_PROGRESS',
      numberOfOpportunities: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Opportunity Search 3',
      prompt: 'Opportunity Search 3 prompt',
      status: 'COMPLETED',
      numberOfOpportunities: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private opportunities: Opportunity[] = [
    {
      id: '1',
      name: 'Opportunity 1',
      description: 'Opportunity 1 description',
      benefits: ['Benefit 1', 'Benefit 2'],
      requirements: ['Requirement 1', 'Requirement 2'],
      enrollmentDeadline: '2021-01-01',
      preparationTime: '1 week',
      requiredDocumentation: ['Documentation 1', 'Documentation 2'],
      link: 'https://example.com',
      tags: ['1', '2'],
      searchId: '3',
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Opportunity 1',
      description: 'Opportunity 1 description',
      benefits: ['Benefit 1', 'Benefit 2'],
      requirements: ['Requirement 1', 'Requirement 2'],
      enrollmentDeadline: '2021-01-01',
      preparationTime: '1 week',
      requiredDocumentation: ['Documentation 1', 'Documentation 2'],
      link: 'https://example.com',
      tags: ['1', '2'],
      searchId: null,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private plannings: Planning[] = [
    {
      id: '1',
      title: 'Planning 1',
      opportunityIds: ['1', '2'],
      pdfFileId: '1',
      icsFileId: '1',
      status: 'IN_PROGRESS',
      userId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Planning 2',
      opportunityIds: ['1', '2'],
      pdfFileId: '1',
      icsFileId: '1',
      status: 'IN_PROGRESS',
      userId: '2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Users
  async listUsers(input: ApiService.ListUsersInput): Promise<ApiService.ListUsersOutput> {
    return success(this.users);
  }

  async getUser(input: ApiService.GetUserInput): Promise<ApiService.GetUserOutput> {
    const user = this.users.find((user) => user.id === input.id);
    if (!user) return failure([{ code: 'NOT_FOUND', message: 'User not found' }]);
    return success(user);
  }

  // Tags
  async listTags(input: ApiService.ListTagsInput): Promise<ApiService.ListTagsOutput> {
    return success(this.tags);
  }

  async getTag(input: ApiService.GetTagInput): Promise<ApiService.GetTagOutput> {
    const tag = this.tags.find((tag) => tag.id === input.id);
    if (!tag) return failure([{ code: 'NOT_FOUND', message: 'Tag not found' }]);
    return success(tag);
  }

  async updateTag(input: ApiService.UpdateTagInput): Promise<ApiService.UpdateTagOutput> {
    const tag = this.tags.find((tag) => tag.id === input.id);
    if (!tag) return failure([{ code: 'NOT_FOUND', message: 'Tag not found' }]);
    tag.name = input.tag.name;
    tag.description = input.tag.description;
    return success(tag);
  }

  async createTag(input: ApiService.CreateTagInput): Promise<ApiService.CreateTagOutput> {
    const ids = this.tags.map((tag) => Number(tag.id));
    const nextId = Math.max(...ids) + 1;
    const tag = {
      id: nextId.toString(),
      name: input.tag.name,
      description: input.tag.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tags.push(tag);
    return success(tag);
  }

  async deleteTag(input: ApiService.DeleteTagInput): Promise<ApiService.DeleteTagOutput> {
    const tag = this.tags.find((tag) => tag.id === input.id);
    if (!tag) return failure([{ code: 'NOT_FOUND', message: 'Tag not found' }]);
    this.tags = this.tags.filter((tag) => tag.id !== input.id);
    return success(undefined);
  }

  // Opportunity Searches
  async listOpportunitySearches(
    input: ApiService.ListOpportunitySearchesInput
  ): Promise<ApiService.ListOpportunitySearchesOutput> {
    return success(this.opportunitySearches);
  }

  async getOpportunitySearch(
    input: ApiService.GetOpportunitySearchInput
  ): Promise<ApiService.GetOpportunitySearchOutput> {
    const opportunitySearch = this.opportunitySearches.find(
      (opportunitySearch) => opportunitySearch.id === input.id
    );
    if (!opportunitySearch)
      return failure([{ code: 'NOT_FOUND', message: 'Opportunity search not found' }]);
    return success(opportunitySearch);
  }

  async updateOpportunitySearch(
    input: ApiService.UpdateOpportunitySearchInput
  ): Promise<ApiService.UpdateOpportunitySearchOutput> {
    const opportunitySearch = this.opportunitySearches.find(
      (opportunitySearch) => opportunitySearch.id === input.id
    );
    if (!opportunitySearch)
      return failure([{ code: 'NOT_FOUND', message: 'Opportunity search not found' }]);
    opportunitySearch.name = input.opportunitySearch.name;
    opportunitySearch.prompt = input.opportunitySearch.prompt;
    return success(opportunitySearch);
  }

  async createOpportunitySearch(
    input: ApiService.CreateOpportunitySearchInput
  ): Promise<ApiService.CreateOpportunitySearchOutput> {
    const ids = this.opportunitySearches.map((opportunitySearch) => Number(opportunitySearch.id));
    const nextId = Math.max(...ids) + 1;
    const opportunitySearch: OpportunitySearch = {
      id: nextId.toString(),
      name: input.opportunitySearch.name,
      prompt: input.opportunitySearch.prompt,
      status: 'DRAFT',
      numberOfOpportunities: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.opportunitySearches.push(opportunitySearch);
    return success(opportunitySearch);
  }
  async runOpportunitySearch(
    input: ApiService.RunOpportunitySearchInput
  ): Promise<ApiService.RunOpportunitySearchOutput> {
    const opportunitySearch = this.opportunitySearches.find(
      (opportunitySearch) => opportunitySearch.id === input.id
    );
    if (!opportunitySearch)
      return failure([{ code: 'NOT_FOUND', message: 'Opportunity search not found' }]);
    opportunitySearch.status = 'IN_PROGRESS';
    return success(undefined);
  }

  async deleteOpportunitySearch(
    input: ApiService.DeleteOpportunitySearchInput
  ): Promise<ApiService.DeleteOpportunitySearchOutput> {
    const opportunitySearch = this.opportunitySearches.find(
      (opportunitySearch) => opportunitySearch.id === input.id
    );
    if (!opportunitySearch)
      return failure([{ code: 'NOT_FOUND', message: 'Opportunity search not found' }]);
    this.opportunitySearches = this.opportunitySearches.filter(
      (opportunitySearch) => opportunitySearch.id !== input.id
    );
    return success(undefined);
  }

  // Opportunities
  async listOpportunities(
    input: ApiService.ListOpportunitiesInput
  ): Promise<ApiService.ListOpportunitiesOutput> {
    return success(this.opportunities);
  }

  async getOpportunity(
    input: ApiService.GetOpportunityInput
  ): Promise<ApiService.GetOpportunityOutput> {
    const opportunity = this.opportunities.find((opportunity) => opportunity.id === input.id);
    if (!opportunity) return failure([{ code: 'NOT_FOUND', message: 'Opportunity not found' }]);
    return success(opportunity);
  }

  async updateOpportunity(
    input: ApiService.UpdateOpportunityInput
  ): Promise<ApiService.UpdateOpportunityOutput> {
    const opportunity = this.opportunities.find((opportunity) => opportunity.id === input.id);
    if (!opportunity) return failure([{ code: 'NOT_FOUND', message: 'Opportunity not found' }]);
    opportunity.name = input.opportunity.name;
    opportunity.description = input.opportunity.description;
    opportunity.benefits = input.opportunity.benefits;
    opportunity.requirements = input.opportunity.requirements;
    opportunity.enrollmentDeadline = input.opportunity.enrollmentDeadline;
    opportunity.preparationTime = input.opportunity.preparationTime;
    opportunity.requiredDocumentation = input.opportunity.requiredDocumentation;
    opportunity.link = input.opportunity.link;
    opportunity.tags = input.opportunity.tags;
    opportunity.searchId = input.opportunity.searchId;
    opportunity.status = input.opportunity.status;
    return success(opportunity);
  }

  async createOpportunity(
    input: ApiService.CreateOpportunityInput
  ): Promise<ApiService.CreateOpportunityOutput> {
    const ids = this.opportunities.map((opportunity) => Number(opportunity.id));
    const nextId = Math.max(...ids) + 1;
    const opportunity: Opportunity = {
      id: nextId.toString(),
      name: input.opportunity.name,
      description: input.opportunity.description,
      benefits: input.opportunity.benefits,
      requirements: input.opportunity.requirements,
      enrollmentDeadline: input.opportunity.enrollmentDeadline,
      preparationTime: input.opportunity.preparationTime,
      requiredDocumentation: input.opportunity.requiredDocumentation,
      link: input.opportunity.link,
      status: input.opportunity.status,
      searchId: null,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.opportunities.push(opportunity);
    return success(opportunity);
  }

  async deleteOpportunity(
    input: ApiService.DeleteOpportunityInput
  ): Promise<ApiService.DeleteOpportunityOutput> {
    const opportunity = this.opportunities.find((opportunity) => opportunity.id === input.id);
    if (!opportunity) return failure([{ code: 'NOT_FOUND', message: 'Opportunity not found' }]);
    this.opportunities = this.opportunities.filter((opportunity) => opportunity.id !== input.id);
    return success(undefined);
  }

  // Plannings
  async listPlannings(
    input: ApiService.ListPlanningsInput
  ): Promise<ApiService.ListPlanningsOutput> {
    return success(this.plannings);
  }

  async getPlanning(input: ApiService.GetPlanningInput): Promise<ApiService.GetPlanningOutput> {
    const planning = this.plannings.find((planning) => planning.id === input.id);
    if (!planning) return failure([{ code: 'NOT_FOUND', message: 'Planning not found' }]);
    return success(planning);
  }

  async updatePlanning(
    input: ApiService.UpdatePlanningInput
  ): Promise<ApiService.UpdatePlanningOutput> {
    const planning = this.plannings.find((planning) => planning.id === input.id);
    if (!planning) return failure([{ code: 'NOT_FOUND', message: 'Planning not found' }]);
    planning.title = input.planning.title;
    return success(planning);
  }

  async createPlanning(
    input: ApiService.CreatePlanningInput
  ): Promise<ApiService.CreatePlanningOutput> {
    const ids = this.plannings.map((planning) => Number(planning.id));
    const nextId = Math.max(...ids) + 1;
    const planning: Planning = {
      id: nextId.toString(),
      title: input.planning.title,
      opportunityIds: input.planning.opportunityIds,
      pdfFileId: null,
      icsFileId: null,
      status: 'IN_PROGRESS',
      userId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.plannings.push(planning);
    return success(planning);
  }

  async deletePlanning(
    input: ApiService.DeletePlanningInput
  ): Promise<ApiService.DeletePlanningOutput> {
    const planning = this.plannings.find((planning) => planning.id === input.id);
    if (!planning) return failure([{ code: 'NOT_FOUND', message: 'Planning not found' }]);
    this.plannings = this.plannings.filter((planning) => planning.id !== input.id);
    return success(undefined);
  }

  // Files
  async getFileUrl(input: ApiService.GetFileUrlInput): Promise<ApiService.GetFileUrlOutput> {
    return success('https://example.com');
  }
}
