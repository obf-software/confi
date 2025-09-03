export const routes = {
  home: {
    index: '/',
  },
  auth: {
    index: '/auth',
  },
  dashboard: {
    index: '/dashboard',
    admin: {
      index: '/dashboard/admin',
      statistics: '/dashboard/admin/statistics',
      tags: '/dashboard/admin/tags',
      evaluations: '/dashboard/admin/evaluations',
      opportunities: '/dashboard/admin/opportunities',
      opportunitiesSearch: '/dashboard/admin/opportunities-search',
      plannings: '/dashboard/admin/plannings',
    },
    findOpportunities: '/dashboard/find-opportunities',
    myPlannings: '/dashboard/my-plannings',
    profile: '/dashboard/profile',
  },
};

export const toChildPath = (route: string) => {
  return route.slice().split('/').pop();
};
