import store from '@/store'
import router from './index'

router.beforeEach((to, from, next) => {
  if(to.name == 'login') {
    next();
  }
  else if(store.state.permission.getToken) {
    // console.log(to);
    // console.log(from);
    // if(!from.name || (to.name !== from.name)) {
      next();
    // }
  }
  else {
    next({ path: '/login' })
  }
  // console.log(to);
})