import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiService, apiService } from '../services/api';
import { useAuth } from './use-auth';

export const useListMyPlannings = () => {
  const { getFreshToken } = useAuth();

  return useQuery({
    queryKey: ['listMyPlannings'],
    queryFn: async () => {
      const token = await getFreshToken();
      const response = await apiService.withToken({ token }).listPlannings({ userId: 'me' });
      if (!response.success) {
        throw new Error(response.errors.map((error) => error.message).join(', '));
      }
      return response.data;
    },
    retry: false,
  });
};
