import fetch from '@/plugins/fetch/';

// 获取作品列表
export function getWorksList() {
  return fetch.get('/works/getWorksList');
}

// 改变作品状态，上下线
export function changeStatus(data) {
  return fetch.post('/works/changeStatus', { data:data });
}

// 修改作品信息
export function editWorkInfo(data) {
  return fetch.post('/works/editWorkInfo', { data:data });
}

// 添加作品
export function addWork(data) {
  return fetch.post('/works/addNewWork', { data:data });
}