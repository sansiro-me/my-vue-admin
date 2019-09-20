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
    path: 'user',
    name: 'user',
    component: layout,
    meta: {
      name: '用户管理',
      icon: 'shopping-bag'
    },
    children: [
      {
        path: 'manage',
        name: 'user-manage',
        component:() => import('@/views/user/manage'),
        meta: {
          name: '用户列表',
          icon: 'eye'
        }
      },
      {
        path: 'center',
        name: 'user-center',
        component:() => import('@/views/user/center'),
        meta: {
          name: '个人中心',
          icon: 'user'
        }
      }
    ]
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
