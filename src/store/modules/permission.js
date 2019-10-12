import { login, getUserInfo, updateRouteToServer } from '@/request/permission'
import { getRealRoute } from '@/router/routes'
import routes from '@/router/children'

export default {
  namespaced: true,
  state: {
    // permissionList: null /** 所有路由 */,
    // sidebarMenu: [] /** 导航菜单 */,
    // // currentMenu: '' /** 当前active导航菜单 */,
    // control_list: [] /** 完整的权限列表 */,
    // // avatar: ''/** 头像 */,

    account: '',
    avatar: '',
    userid: '',
    token: '',
    nickname: '',
    get getToken() {
      return localStorage.getItem('token')
    },
    crumbList: [],
    menuList: [],
    currentMenu: '',
    routes: [],
    isWrite: false,
    allRoutes: []
  },
  getters: {
    getMenu(state) {
      return state.menuList;
    },
    getRoutes(state) {
      return state.routes;
    },
    getWrite(state) {
      return state.isWrite;
    }
  },
  mutations: {
    setUserInfo(state, info) {
      state.userid = info.id;
      state.avatar = info.avatar;
      state.nickname = info.nickname;
      state.account = info.account;
    },
    setLoginInfo(state, info) {
      state.userid = info.id;
      state.token = info.token;
      state.avatar = info.avatar;
      state.nickname = info.nickname;
      state.account = info.account;

      localStorage.setItem('token', info.token);
    },
    logout(state) {
      state.token = '';
      state.nickname = '';
      localStorage.removeItem('token');
    },
    setCrumbList(state, list) {
      state.crumbList = list
    },
    setMenuList(state, list) {
      state.menuList = getRealRoute(list);
    },
    setCurrentMenu(state, currentMenu) {
      state.currentMenu = currentMenu
    },
    saveRoutes(state, routes) {
      state.routes = routes
    },
    setPageWrite(state, isPer) {
      state.isWrite = Boolean(isPer);
    },
    recordAllRoutes(state) {
      // state.allRoutes = JSON.parse(JSON.stringify(routes));

      let record = JSON.parse(JSON.stringify(routes));
      console.log(record);

      record.forEach(item => {
        // 如果不是叶子节点
        if (item.children && item.children.length > 0) {
          item.title = item.meta.name;

          delete(item.component);
          delete(item.meta);
          delete(item.name);
          delete(item.path);

          item.children.forEach(todo => {
            todo.title = todo.meta.name;

            delete(todo.component);
            delete(todo.meta);
            delete(todo.path);
          })
        }
        // 如果是叶子节点。因为规定路由只能有两级。所以用不着递归
        else {
          item.title = item.meta.name;

          delete(item.component);
          delete(item.meta);
          delete(item.path);
        }
      });

      state.allRoutes = record;
    }
  },
  actions: {
    async login({ commit }, obj) {
      const { isSuccess, data } = await login(obj);

      if(isSuccess) {
        commit('recordAllRoutes');
        commit('setLoginInfo', data);
        commit('setMenuList', data.route);
        return true;
      }
      else {
        return false;
      }
    },
    async getInfo({ commit }) {
      const { isSuccess, data } = await getUserInfo();

      if(isSuccess) {
        commit('recordAllRoutes');
        commit('setUserInfo', data);
        commit('setMenuList', data.route);
      }
    },
    saveRoutes({ commit }, routes) {
      commit('saveRoutes', routes);
    },
    setPageWrite({ commit }, pper) {
      commit('setPageWrite', pper);
    },
    async updateRoute({state}) {
      const result = await updateRouteToServer({
        routes: state.allRoutes
      });
      
      return result;
    }
  }
}
