import React from 'react';
import { Outlet } from 'react-router-dom';

export const DashboardAdminLayout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
