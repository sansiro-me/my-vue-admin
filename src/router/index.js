import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Login from '@/views/login/login.vue'

Vue.use(Router)

const onlyLogin = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

// 初始路由
const router = new Router({
  routes: onlyLogin
});

router.beforeEach((to, from, next) => {
  if(to.name == 'login') {
    next();
  }
  else if(store.state.permission.getToken) {
    if(to.meta) {
      store.dispatch('permission/setPageWrite', Boolean(to.meta.write));
    }

    if(!store.state.permission.account) {
      store.dispatch('permission/getInfo').then(() => {
        // next();

        // console.log(store.getters['permission/getRoutes']);

        // router.addRoutes(store.getters['permission/getRoutes']);

        next({ ...to, replace: true })
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
