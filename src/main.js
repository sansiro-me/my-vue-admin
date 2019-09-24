import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/index.scss'

import plugins from './plugins'
import './router/check'

Vue.use(plugins);

Vue.config.productionTip = false

// console.log(router);

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
