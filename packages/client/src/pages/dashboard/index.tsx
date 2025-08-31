import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/use-current-user';
import { LoadingSpinner } from '../../components/loading-spinner';

export const DashboardIndex: React.FC = () => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading || !user) {
    return <LoadingSpinner />;
  }

  // Redirect based on user role
  if (user.role === 'ADMIN') {
    return <Navigate to='/dashboard/statistics' replace />;
  }
  
  return <Navigate to='/dashboard/find-opportunities' replace />;
};