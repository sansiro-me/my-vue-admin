import layout from '@/components/LayOut'

const routes = [
  {
    path: 'home',
    name: 'home',
    component:() => import('@/views/home/home'),
    meta: {
      name: '首页',
      icon: 'home'
    }
  },
  {
    path: 'list',
    name: 'list',
    component:() => import('@/views/list/list'),
    meta: {
      name: '订单管理',
      icon: 'shopping-bag'
    }
  },
  {
    path: 'works',
    name: 'works',
    component: layout,
    meta: {
      name: '管理',
      icon: 'anchor'
    },
    children: [
      {
        path: 'manage',
        name: 'manage',
        component:() => import('@/views/works/manage'),
        meta: {
          name: '管理作品',
          icon: 'eye'
        }
      },
      {
        path: 'site',
        name: 'site',
        component:() => import('@/views/works/site'),
        meta: {
          name: '管理网站',
          icon: 'user'
        }
      }
    ]
  }
];

export default routes;
