import Dialog from './dialog'

export default {
  install(Vue) {
    Vue.prototype.$dialog = Dialog.dialog
  }
}