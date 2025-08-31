import { ApiService } from './api-service';
import { ApiServiceImpl } from './api-service-impl';
import { ApiServiceMock } from './api-service-mock';

const makeApiService = (): ApiService => {
  const shouldUseMock = import.meta.env.VITE_USE_API_MOCK === 'true';

  if (shouldUseMock) {
    return new ApiServiceMock();
  }

  const apiUrl = import.meta.env.VITE_API_URL as string | undefined;

  if (!apiUrl) {
    throw new Error(`Trying to use API implementation but VITE_API_URL is not set`);
  }

  return new ApiServiceImpl(apiUrl);
};

export const apiService = makeApiService();
