import { useMutation } from '@tanstack/react-query';

import { apiService } from '../../services/api';

export const useFindOpportunities = () => {
  const findOpportunities = useMutation({
    mutationFn: async (input: Record<string, unknown>) => await apiService.findOpportunities(input),
    retry: false,
  });

  return findOpportunities;
};
