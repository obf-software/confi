import { ApiService, ApiServiceImpl } from './api-service';

const makeApiService = (): ApiService => {
  const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (!apiUrl) throw new Error('VITE_API_URL is not set');
  return new ApiServiceImpl(apiUrl);
};

export const apiService = makeApiService();
