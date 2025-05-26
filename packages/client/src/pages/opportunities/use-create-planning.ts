import { useMutation } from '@tanstack/react-query';

import { apiService } from '../../services/api';

export const useCreatePlanning = () => {
  const createPlanning = useMutation({
    mutationFn: async (ids: string[]) => await apiService.createPlanning(ids),
    retry: false,
  });

  return createPlanning;
};
