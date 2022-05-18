export default [
  {
    path: '/apps/scoring-analysis/',
    name: 'scoring-analysis',
    component: () => import('@/views/apps/scoring/ScoringAnalysis.vue')
  },
  {
    path: '/apps/clients/',
    name: 'clients',
    component: () => import('@/views/apps/clients/Clients.vue')
  },
  {
    path: '/apps/documents/',
    name: 'documents',
    component: () => import('@/views/apps/documents/Documents.vue')
  },
  {
    path: '/apps/history/',
    name: 'history',
    component: () => import('@/views/apps/history/History.vue')
  },
]
