import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  // mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/all-users',
    },
    {
      path: '/all-users',
      component: () => import('@/components/UserList'),
    },
  ],
})
 