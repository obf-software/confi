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
      home: '/dashboard/admin/home',
      tags: '/dashboard/admin/tags',
      opportunities: '/dashboard/admin/opportunities',
      plannings: '/dashboard/admin/plannings',
      aiMatching: '/dashboard/admin/ai-matching',
      aiSearch: '/dashboard/admin/ai-search',
    },
    findOpportunities: '/dashboard/find-opportunities',
    myPlannings: '/dashboard/my-plannings',
    profile: '/dashboard/profile',
  },
};

export const toChildPath = (route: string) => {
  return route.slice().split('/').pop();
};
