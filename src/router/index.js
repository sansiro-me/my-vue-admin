import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Login from '@/views/login/login.vue'
import menus from './routes'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'container',
      component:() => import('@/components/Container.vue'),
      redirect: 'home',
      children: menus
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('@/components/404.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.name == 'login') {
    next();
  }
  else if(store.state.permission.getToken) {
    if(!store.state.permission.account) {
      store.dispatch('permission/getInfo').then(() => {
        next();
      })
    }
    else {
      next();
    }
  }
  else {
    next({ path: '/login' })
  }
})

router.afterEach((to) => {
  store.commit('permission/setCrumbList', to.matched)
  store.commit('permission/setCurrentMenu', to.name)
});


export default router
