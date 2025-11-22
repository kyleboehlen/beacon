import { createRouter, createWebHistory } from 'vue-router'
import { TitlePage } from '@/pages/title-page'
import { HomePage } from '@/pages/home-page'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: TitlePage },
    { path: '/dashboard', component: HomePage },
  ],
})

// Preline UI auto-init on route change
router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => window.HSStaticMethods?.autoInit?.(), 100)
  }
})

export default router
