import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/index.scss'

import plugins from './plugins'
import components from './components/common'

Vue.config.productionTip = false

Vue.use(plugins);
Vue.use(components);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
