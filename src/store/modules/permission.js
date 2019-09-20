// import { fetchPermission } from '@/api/permission'
// import router, { DynamicRoutes } from '@/router/index'
// import { recursionRouter } from '@/utils/recursion-router'
// import dynamicRouter from '@/router/dynamic-router'

import { login, getUserInfo } from '@/request/permission'
import routes from '@/router/routes'

export default {
  namespaced: true,
  state: {
    permissionList: null /** 所有路由 */,
    sidebarMenu: [] /** 导航菜单 */,
    // currentMenu: '' /** 当前active导航菜单 */,
    control_list: [] /** 完整的权限列表 */,
    // avatar: ''/** 头像 */,
    account: ''/** 用户角色 */,

    avatar: '',
    userid: '',
    token: '',
    name: '',
    get getToken() {
      return localStorage.getItem('token')
    },
    crumbList: [],
    menuList: [],
    currentMenu: ''
  },
  getters: {
    // getToken: {
    //   root: true,
    //   handler() {
    //     return localStorage.getItem('token')
    //   }
    // }
  },
  mutations: {
    SET_AVATAR(state, avatar) {
      state.avatar = avatar
    },
    SET_ACCOUNT(state, account) {
      state.account = account
    },
    SET_PERMISSION(state, routes) {
      state.permissionList = routes
    },
    CLEAR_PERMISSION(state) {
      state.permissionList = null
    },
    SET_MENU(state, menu) {
      state.sidebarMenu = menu
    },
    CLEAR_MENU(state) {
      state.sidebarMenu = []
    },
    SET_CONTROL_LIST(state, list) {
      state.control_list = list
    },

    setUserInfo(state, info) {
      state.userid = info.userid;
      state.avatar = info.avatar;
      state.name = info.name;
    },
    setLoginInfo(state, info) {
      state.token = info.token;

      localStorage.setItem('token', info.token);
    },
    logout(state) {
      state.token = '';
      localStorage.removeItem('token');　　
    },
    setCrumbList(state, list) {
      state.crumbList = list
    },
    setMenuList(state, list) {
      state.menuList = list
    },
    setCurrentMenu(state, currentMenu) {
      state.currentMenu = currentMenu
    },
  },
  actions: {
    async login({ commit }, obj) {
      const { isSuccess, data } = await login(obj);

      if(isSuccess) {
        commit('setLoginInfo', data);
        commit('setMenuList', routes);
        return true;
      }
      else {
        return false;
      }
    },
    async getInfo({ commit }) {
      const { isSuccess, data } = await getUserInfo();

      if(isSuccess) {
        commit('setUserInfo', data)
      }
    }
  }
}
