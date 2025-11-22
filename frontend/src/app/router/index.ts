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

// preline ui auto init on route change
router.afterEach(async (to, from, failure) => {
  if (!failure) setTimeout(() => window.HSStaticMethods.autoInit(), 100);
});

export default router
