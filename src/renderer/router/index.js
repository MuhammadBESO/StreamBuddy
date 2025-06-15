import { createRouter, createWebHistory } from 'vue-router'

// Lazy load views for better performance
const BracketView = () => import('../views/BracketsViews.vue')
const TodayView = () => import('../views/TodayMatches.vue')
const PlayerStatusView = () => import('../views/PlayersStatus.vue') 
const SettingsView = () => import('../views/SettingsView.vue') 
const routes = [
  { path: '/', redirect: '/bracket' },
  { path: '/bracket', name: 'Bracket Views', component: BracketView },
  { path: '/today', name: "Today's Matches", component: TodayView },
  { path: '/players', name: 'Players Status', component: PlayerStatusView },
    { path: '/settings', name: 'Settings', component: SettingsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
