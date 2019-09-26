import fetch from '@/plugins/fetch/';

// 登陆
export function login(data) {
  return fetch.post('/permission/login', { data: data});
}

// 获取用户信息，用于系统显示等
export function getUserInfo() {
  return fetch.get('/permission/getInfo');
}

// 获取用户列表
export function getAllUser(data) {
  return fetch.post('/permission/getAllUserList', { data: data });
}

// 新增用户
export function addNewUser(data) {
  return fetch.post('/permission/addNewUser', { data: data });
}

// 删除用户
export function removeUser(data) {
  return fetch.get('/permission/removeUser', { data: data });
}

// 编辑用户信息
export function editUserInfo(data) {
  return fetch.post('/permission/editUser', { data: data });
}

// 用户获取个人信息，用于个人中心
export function getOwnInfo() {
  return fetch.get('/permission/getOwnInfo');
}

// 用户修改密码，用于个人中心
export function changePasswd(data) {
  return fetch.post('/permission/changePasswd', { data: data });
}