import store from '@/store'
import router from './index'

router.beforeEach((to, from, next) => {
  if(to.name == 'login') {
    next();
  }
  else if(store.state.permission.getToken) {
    console.log(store.state.permission);
    if(!store.state.permission.userid) {
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
})