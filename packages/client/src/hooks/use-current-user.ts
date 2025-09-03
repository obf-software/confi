import { useQuery } from '@tanstack/react-query';
import { useAuth } from './use-auth';
import { apiService } from '../services/api';

export const useCurrentUser = () => {
  const { getFreshToken, status } = useAuth();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const token = await getFreshToken();
      const response = await apiService.withToken({ token }).getUser({ id: null });
      if (!response.success) {
        throw new Error(response.errors.map((error) => error.message).join(', '));
      }
      return response.data;
    },
    enabled: status === 'authenticated',
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
