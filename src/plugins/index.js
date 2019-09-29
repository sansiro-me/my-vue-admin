import fetch from './fetch'
import Dialog from './dialog'
import Box from './message'

export default {
  install(Vue) {
    Vue.prototype.$fetch = fetch
    Vue.prototype.$dialog = Dialog.dialog

    Vue.prototype.$notify = Box.notify
    Vue.prototype.$message = Box.message

    // Vue.prototype.$alert = () => console.log("11");
    Vue.prototype.$alert = Box.alert

    Vue.prototype.$confirm = Box.confirm
  }
}