import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/index'

import ElementUI from 'element-ui'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/style/index.scss'

import './plugins'

Vue.config.productionTip = false

Vue.prototype.$alert = Message;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
