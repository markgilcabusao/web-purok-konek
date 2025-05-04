import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import MainView from '@/views/auth/MainView.vue'
import RequestView from '@/views/auth/RequestView.vue'
import AppointmentView from '@/views/auth/AppointmentView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
    },
    {
      path: '/request',
      name: 'request',
      component: RequestView,
    },
    {
      path: '/appointment',
      name: 'appointment',
      component: AppointmentView,
    },
  ],
})

export default router
