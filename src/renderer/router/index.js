import { createRouter, createWebHistory } from 'vue-router'


const BracketView = () => import('../views/BracketsViews.vue')
const TodayView = () => import('../views/TodayMatches.vue')
const PlayerStatusView = () => import('../views/PlayersStatus.vue')

const routes = [
  {
    path: '/',
    redirect: () => {
      return localStorage.getItem('lastRoute') || '/bracket'
    },
  },
  { path: '/bracket', name: 'Bracket Views', component: BracketView },
  { path: '/today', name: "Today's Matches", component: TodayView },
  { path: '/players', name: 'Players Status', component: PlayerStatusView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.afterEach((to) => {
  localStorage.setItem('lastRoute', to.path)
})

export default router
