// Port

export interface ApiService {
  // Users
  listUsers: (input: ApiService.ListUsersInput) => Promise<ApiService.ListUsersOutput>;
  getUser: (input: ApiService.GetUserInput) => Promise<ApiService.GetUserOutput>;

  // Tags
  listTags: (input: ApiService.ListTagsInput) => Promise<ApiService.ListTagsOutput>;
  getTag: (input: ApiService.GetTagInput) => Promise<ApiService.GetTagOutput>;
  updateTag: (input: ApiService.UpdateTagInput) => Promise<ApiService.UpdateTagOutput>;
  createTag: (input: ApiService.CreateTagInput) => Promise<ApiService.CreateTagOutput>;
  deleteTag: (input: ApiService.DeleteTagInput) => Promise<ApiService.DeleteTagOutput>;

  // Opportunity Searches
  listOpportunitySearches: (
    input: ApiService.ListOpportunitySearchesInput
  ) => Promise<ApiService.ListOpportunitySearchesOutput>;
  getOpportunitySearch: (
    input: ApiService.GetOpportunitySearchInput
  ) => Promise<ApiService.GetOpportunitySearchOutput>;
  updateOpportunitySearch: (
    input: ApiService.UpdateOpportunitySearchInput
  ) => Promise<ApiService.UpdateOpportunitySearchOutput>;
  createOpportunitySearch: (
    input: ApiService.CreateOpportunitySearchInput
  ) => Promise<ApiService.CreateOpportunitySearchOutput>;
  runOpportunitySearch: (
    input: ApiService.RunOpportunitySearchInput
  ) => Promise<ApiService.RunOpportunitySearchOutput>;
  deleteOpportunitySearch: (
    input: ApiService.DeleteOpportunitySearchInput
  ) => Promise<ApiService.DeleteOpportunitySearchOutput>;

  // Opportunities
  listOpportunities: (
    input: ApiService.ListOpportunitiesInput
  ) => Promise<ApiService.ListOpportunitiesOutput>;
  getOpportunity: (
    input: ApiService.GetOpportunityInput
  ) => Promise<ApiService.GetOpportunityOutput>;
  updateOpportunity: (
    input: ApiService.UpdateOpportunityInput
  ) => Promise<ApiService.UpdateOpportunityOutput>;
  createOpportunity: (
    input: ApiService.CreateOpportunityInput
  ) => Promise<ApiService.CreateOpportunityOutput>;
  deleteOpportunity: (
    input: ApiService.DeleteOpportunityInput
  ) => Promise<ApiService.DeleteOpportunityOutput>;

  // Plannings
  listPlannings: (input: ApiService.ListPlanningsInput) => Promise<ApiService.ListPlanningsOutput>;
  getPlanning: (input: ApiService.GetPlanningInput) => Promise<ApiService.GetPlanningOutput>;
  updatePlanning: (
    input: ApiService.UpdatePlanningInput
  ) => Promise<ApiService.UpdatePlanningOutput>;
  createPlanning: (
    input: ApiService.CreatePlanningInput
  ) => Promise<ApiService.CreatePlanningOutput>;
  deletePlanning: (
    input: ApiService.DeletePlanningInput
  ) => Promise<ApiService.DeletePlanningOutput>;

  // Files
  getFileUrl: (input: ApiService.GetFileUrlInput) => Promise<ApiService.GetFileUrlOutput>;

  // Evaluations
  listEvaluations: (
    input: ApiService.ListEvaluationsInput
  ) => Promise<ApiService.ListEvaluationsOutput>;
  createEvaluation: (
    input: ApiService.CreateEvaluationInput
  ) => Promise<ApiService.CreateEvaluationOutput>;
}

// Dtos

export namespace ApiService {
  // Core

  export interface ApiServiceError {
    code: string;
    message: string;
  }

  export type ApiServiceResponse<T> =
    | { success: true; data: T }
    | { success: false; errors: ApiServiceError[] };

  // Users
  export interface ListUsersInput {}
  export type ListUsersOutput = ApiServiceResponse<User[]>;

  export interface GetUserInput {
    id: string | null;
  }
  export type GetUserOutput = ApiServiceResponse<User>;

  // Tags
  export interface ListTagsInput {}
  export type ListTagsOutput = ApiServiceResponse<Tag[]>;

  export interface GetTagInput {
    id: string;
  }
  export type GetTagOutput = ApiServiceResponse<Tag>;

  export interface UpdateTagInput {
    id: string;
    tag: Pick<Tag, 'name' | 'description'>;
  }
  export type UpdateTagOutput = ApiServiceResponse<Tag>;

  export interface CreateTagInput {
    tag: Pick<Tag, 'name' | 'description'>;
  }
  export type CreateTagOutput = ApiServiceResponse<Tag>;

  export interface DeleteTagInput {
    id: string;
  }
  export type DeleteTagOutput = ApiServiceResponse<void>;

  // Opportunity Searches
  export interface ListOpportunitySearchesInput {}
  export type ListOpportunitySearchesOutput = ApiServiceResponse<OpportunitySearch[]>;

  export interface GetOpportunitySearchInput {
    id: string;
  }
  export type GetOpportunitySearchOutput = ApiServiceResponse<OpportunitySearch>;

  export interface UpdateOpportunitySearchInput {
    id: string;
    opportunitySearch: Pick<OpportunitySearch, 'name' | 'prompt'>;
  }
  export type UpdateOpportunitySearchOutput = ApiServiceResponse<OpportunitySearch>;

  export interface CreateOpportunitySearchInput {
    opportunitySearch: Pick<OpportunitySearch, 'name' | 'prompt'>;
  }
  export type CreateOpportunitySearchOutput = ApiServiceResponse<OpportunitySearch>;

  export interface RunOpportunitySearchInput {
    id: string;
  }
  export type RunOpportunitySearchOutput = ApiServiceResponse<void>;

  export interface DeleteOpportunitySearchInput {
    id: string;
  }
  export type DeleteOpportunitySearchOutput = ApiServiceResponse<void>;

  // Opportunities
  export interface ListOpportunitiesInput {}
  export type ListOpportunitiesOutput = ApiServiceResponse<Opportunity[]>;

  export interface GetOpportunityInput {
    id: string;
  }
  export type GetOpportunityOutput = ApiServiceResponse<Opportunity>;

  export interface UpdateOpportunityInput {
    id: string;
    opportunity: Pick<
      Opportunity,
      | 'name'
      | 'description'
      | 'benefits'
      | 'requirements'
      | 'enrollmentDeadline'
      | 'preparationTime'
      | 'requiredDocumentation'
      | 'link'
      | 'tags'
      | 'searchId'
      | 'status'
    >;
  }
  export type UpdateOpportunityOutput = ApiServiceResponse<Opportunity>;

  export interface CreateOpportunityInput {
    opportunity: Pick<
      Opportunity,
      | 'name'
      | 'description'
      | 'benefits'
      | 'requirements'
      | 'enrollmentDeadline'
      | 'preparationTime'
      | 'requiredDocumentation'
      | 'link'
      | 'status'
    >;
  }
  export type CreateOpportunityOutput = ApiServiceResponse<Opportunity>;

  export interface DeleteOpportunityInput {
    id: string;
  }
  export type DeleteOpportunityOutput = ApiServiceResponse<void>;

  // Plannings
  export interface ListPlanningsInput {}
  export type ListPlanningsOutput = ApiServiceResponse<Planning[]>;

  export interface GetPlanningInput {
    id: string;
  }
  export type GetPlanningOutput = ApiServiceResponse<Planning>;

  export interface UpdatePlanningInput {
    id: string;
    planning: Pick<Planning, 'title'>;
  }
  export type UpdatePlanningOutput = ApiServiceResponse<Planning>;

  export interface CreatePlanningInput {
    planning: Pick<Planning, 'title' | 'opportunityIds'>;
  }
  export type CreatePlanningOutput = ApiServiceResponse<Planning>;

  export interface DeletePlanningInput {
    id: string;
  }
  export type DeletePlanningOutput = ApiServiceResponse<void>;

  // Files
  export interface GetFileUrlInput {
    id: string;
  }
  export type GetFileUrlOutput = ApiServiceResponse<string>;

  // Evaluations
  export interface ListEvaluationsInput {}
  export type ListEvaluationsOutput = ApiServiceResponse<Evaluation[]>;

  export interface CreateEvaluationInput {}
  export type CreateEvaluationOutput = ApiServiceResponse<Evaluation>;
}

// Models

export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type OpportunitySearchStatus = 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export interface OpportunitySearch {
  id: string;
  name: string;
  prompt: string;
  status: OpportunitySearchStatus;
  numberOfOpportunities: number | null;
  createdAt: string;
  updatedAt: string;
}

export type OpportunityStatus = 'ACTIVE' | 'DISABLED' | 'PENDING_REVIEW';

export interface Opportunity {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  requirements: string[];
  enrollmentDeadline: string;
  preparationTime: string;
  requiredDocumentation: string[];
  link: string | null;
  tags: string[];
  searchId: string | null;
  status: OpportunityStatus;
  createdAt: string;
  updatedAt: string;
}

export type PlanningStatus = 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export interface Planning {
  id: string;
  title: string;
  userId: string;
  opportunityIds: string[];
  pdfFileId: string | null;
  icsFileId: string | null;
  status: PlanningStatus;
  createdAt: string;
  updatedAt: string;
}

export interface File {
  id: string;
  key: string;
  bucket: string;
  userId: string;
  contentType: string;
  createdAt: string;
  updatedAt: string;
}

export type EvaluationStatus = 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export interface Evaluation {
  id: string;
  createdAt: string;
  progress: number;
  status: EvaluationStatus;
  endedAt: string | null;
}
