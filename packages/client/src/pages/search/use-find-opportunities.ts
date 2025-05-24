import { useMutation } from '@tanstack/react-query';

import { OpportunityServiceFindOpportunitiesInput } from '../../services/opportunity';
import { N8nOpportunityService } from '../../services/opportunity';

export const useFindOpportunities = () => {
  const opportunitiesService = new N8nOpportunityService();

  const findOpportunities = useMutation({
    mutationFn: async (input: OpportunityServiceFindOpportunitiesInput) => {
      const response = await opportunitiesService.findOpportunities(input);
      return response;
    },
    retry: false,
  });

  return findOpportunities;
};
