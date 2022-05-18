const dashboard = [
  {
    path: '/apps/scoring-analysis/',
    name: 'scoring-analysis',
    component: () => import('@/views/apps/scoring/ScoringAnalysis.vue'),
    meta: {
      layout: 'content'
    }
  },
 
]
export default dashboard
