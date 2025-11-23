import { createRouter, createWebHistory } from 'vue-router'
import { TitlePage } from '@/pages/title-page'
import { DashboardPage } from '@/pages/dashboard-page'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'root', component: TitlePage },
    { path: '/dashboard', name: 'dashboard', component: DashboardPage },
  ],
})

// Preline UI auto-init on route change
router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => window.HSStaticMethods?.autoInit?.(), 100)
  }
})

export default router
