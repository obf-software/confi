import { useMutation } from '@tanstack/react-query';
import { ApiService, apiService } from '../services/api';
import { useAuth } from './use-auth';

export const useFileUrl = () => {
  const { getFreshToken } = useAuth();

  return useMutation({
    mutationFn: async (input: ApiService.GetFileUrlInput) => {
      const token = await getFreshToken();
      const response = await apiService.withToken({ token }).getFileUrl(input);
      if (!response.success) {
        throw new Error(response.errors.map((error) => error.message).join(', '));
      }
      return response.data;
    },
    retry: false,
  });
};
