import fetch from '@/plugins/fetch/';

export function login(data) {
  return fetch.post('/permission/login', { data: data});
}

export function getUserInfo() {
  return fetch.get('/permission/getInfo');
}

export function getAllUser(data) {
  return fetch.post('/permission/getAllUserList', { data: data });
}

export function addNewUser(data) {
  return fetch.post('/permission/addNewUser', { data: data });
}

export function removeUser(data) {
  return fetch.get('/permission/removeUser', { data: data });
}

export function editUserInfo(data) {
  return fetch.post('/permission/editUser', { data: data });
}