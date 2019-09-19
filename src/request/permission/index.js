import fetch from '@/plugins/fetch/';

export function login(data) {
  return fetch.post('/admin/admin/login', data);
}

export function getUserInfo() {
  return fetch.get('/admin/admin/getInfo');
}