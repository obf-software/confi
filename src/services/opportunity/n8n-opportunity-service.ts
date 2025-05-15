import {
  Opportunity,
  OpportunityService,
  OpportunityServiceFindOpportunitiesInput,
} from './protocols';

export class N8nOpportunityService implements OpportunityService {
  async findOpportunities(input: OpportunityServiceFindOpportunitiesInput): Promise<Opportunity[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return Promise.resolve([
      {
        name: 'name1',
        description: 'description',
        benefits: ['benefits'],
        enrollmentDeadline: 'enrollmentDeadline',
        link: 'link',
        preparationTime: 'preparationTime',
        requiredDocumentation: 'requiredDocumentation',
        requirements: ['requirements'],
      },
      {
        name: 'name2',
        description: 'description',
        benefits: ['benefits'],
        enrollmentDeadline: 'enrollmentDeadline',
        link: 'link',
        preparationTime: 'preparationTime',
        requiredDocumentation: 'requiredDocumentation',
        requirements: ['requirements'],
      },
      {
        name: 'name3',
        description: 'description',
        benefits: ['benefits'],
        enrollmentDeadline: 'enrollmentDeadline',
        link: 'link',
        preparationTime: 'preparationTime',
        requiredDocumentation: 'requiredDocumentation',
        requirements: ['requirements'],
      },
      {
        name: 'name4',
        description: 'description',
        benefits: ['benefits'],
        enrollmentDeadline: 'enrollmentDeadline',
        link: 'link',
        preparationTime: 'preparationTime',
        requiredDocumentation: 'requiredDocumentation',
        requirements: ['requirements'],
      },
      {
        name: 'name5',
        description: 'description',
        benefits: ['benefits'],
        enrollmentDeadline: 'enrollmentDeadline',
        link: 'link',
        preparationTime: 'preparationTime',
        requiredDocumentation: 'requiredDocumentation',
        requirements: ['requirements'],
      },
      {
        name: 'name6',
        description: 'description',
        benefits: ['benefits'],
        enrollmentDeadline: 'enrollmentDeadline',
        link: 'link',
        preparationTime: 'preparationTime',
        requiredDocumentation: 'requiredDocumentation',
        requirements: ['requirements'],
      },
    ]);
  }
}
