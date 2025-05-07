  import { createRouter, createWebHistory } from 'vue-router'
  import LoginView from '@/views/auth/LoginView.vue'
  import RegisterView from '@/views/auth/RegisterView.vue'
  import MainView from '@/views/auth/MainView.vue'
  import RequestView from '@/views/auth/RequestView.vue'
  import AppointmentView from '@/views/auth/AppointmentView.vue'
  import AccountSettings from '@/views/auth/AccountSettings.vue'
  import MyprofileView from '@/views/auth/MyprofileView.vue'
  import AppointmentOverview from '@/views/auth/AppointmentOverview.vue'
  import PendingRequest from '@/views/auth/PendingRequest.vue'
  import EditProfile from '@/views/auth/EditProfile.vue'

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
        path: '/requests',
        name: 'requests',
        component: RequestView,
      },
      {
        path: '/appointment',
        name: 'appointment',
        component: AppointmentView,
      },
      {
        path: '/account-settings',
        name: 'account-settings',
        component: AccountSettings,
      },
      {
        path: '/my-profile',
        name: 'my-profile',
        component: MyprofileView,
      },
      {
        path: '/appointment-overview',
        name: 'appointment-overview',
        component: AppointmentOverview,
      },
      {
        path: '/pending-requests',
        name: 'pending-requests',
        component: PendingRequest,
      },
      {
        path: '/edit-profile',
        name: 'edit-profile',
        component: EditProfile,
      }
    ],
  })

  export default router
