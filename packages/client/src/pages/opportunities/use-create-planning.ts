import { useMutation } from '@tanstack/react-query';

import { OpportunityServiceCreatePlanningInput } from '../../services/opportunity';
import { N8nOpportunityService } from '../../services/opportunity';

export const useCreatePlanning = () => {
  const opportunitiesService = new N8nOpportunityService();

  const findOpportunities = useMutation({
    mutationFn: async (input: OpportunityServiceCreatePlanningInput) => {
      const response = await opportunitiesService.createPlanning(input);
      return response;
    },
    retry: false,
  });

  return findOpportunities;
};
