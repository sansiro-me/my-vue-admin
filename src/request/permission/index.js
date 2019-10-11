import fetch from '@/plugins/fetch/';

// 登陆
export function login(data) {
  return fetch('/permission/login', { method: 'post', data: data});
}

// 获取用户信息，用于系统显示等
export function getUserInfo() {
  return fetch('/permission/getInfo');
}

// 获取用户列表
export function getAllUser(data) {
  return fetch('/permission/getAllUserList', { method: 'post', data: data });
}

// 新增用户
export function addNewUser(data) {
  return fetch('/permission/addNewUser', { method: 'post', data: data });
}

// 删除用户
export function removeUser(data) {
  return fetch('/permission/removeUser', { data: data });
}

// 编辑用户信息
export function editUserInfo(data) {
  return fetch('/permission/editUser', { method: 'post', data: data });
}

// 用户获取个人信息，用于个人中心
export function getOwnInfo() {
  return fetch('/permission/getOwnInfo');
}

// 用户修改密码，用于个人中心
export function changePasswd(data) {
  return fetch('/permission/changePasswd', { method: 'post', data: data });
}

// 获取角色列表
export function getGroupList(data) {
  return fetch('/permission/getGroupList', { method: 'post', data: data });
}

// 获取角色路由
export function getGroupRoute(data) {
  return fetch('/permission/getGroupRoute', { data: data });
}

// 设置角色路由
export function setGroupRoute(data) {
  return fetch('/permission/setGroupRoute', { method: 'post', data: data });
}

// 获取全部的路由表
export function getAllRoutes() {
  return fetch('/permission/getAllRoutes');
}

// 同步本地路由到服务器，不需要服务器配置新路由，直接本地路由表过滤后同步到服务器
export function updateRouteToServer(data) {
  return fetch('/permission/updateRoutes', { method: 'post', data: data });
}