import fetch from '@/plugins/fetch/';

export function login(data) {
  return fetch.post('/admin/admin/login', data);
}