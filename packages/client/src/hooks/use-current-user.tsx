import { useQuery } from '@tanstack/react-query';
import { User, UserRole } from '../services/api/api-service';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/auth-context';

// Mock current user data for development
// TODO: Replace with actual API call when authorization is ready
const getMockCurrentUser = async (): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock user with ADMIN role for testing
  // Change role to 'USER' to test normal user flow
  const mockRole: UserRole = 'ADMIN';
  
  return {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    role: mockRole,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const useCurrentUser = () => {
  const { isAuthenticated } = useAuth();
  
  const query = useQuery({
    queryKey: ['currentUser'],
    queryFn: getMockCurrentUser,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
  
  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};