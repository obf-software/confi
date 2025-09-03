import { useMutation } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { useAuth } from './use-auth';

export const useFindOpportunities = () => {
  const { getFreshToken } = useAuth();

  return useMutation({
    mutationFn: async (input: Record<string, unknown>) => {
      const token = await getFreshToken();
      const response = await apiService
        .withToken({ token })
        .findOpportunities({ formInput: input });
      if (!response.success) {
        throw new Error(response.errors.map((error) => error.message).join(', '));
      }
      return response.data;
    },
    retry: false,
  });
};
