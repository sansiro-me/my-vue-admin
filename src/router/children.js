import layout from '@/components/LayOut'

export default [
  {
    path: '/user',
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
        component:() => import('@/views/user/manage/manage'),
        meta: {
          name: '用户列表',
          icon: 'eye'
        }
      }
    ]
  },
  {
    path: '/works',
    name: 'works',
    component: layout,
    meta: {
      name: '网站管理',
      icon: 'tv'
    },
    children: [
      {
        path: 'manage',
        name: 'works-manage',
        component: () => import('@/views/works/my-works/manage'),
        meta: {
          name: '我的作品',
          icon: 'archive'
        }
      },
      {
        path: 'site',
        name: 'site-manage',
        component:() => import('@/views/works/site'),
        meta: {
          name: '管理网站',
          icon: 'aperture'
        }
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: layout,
    meta: {
      name: '权限控制',
      icon: 'toggle-left'
    },
    children: [
      {
        path: 'manage',
        name: 'auth-manage',
        component:() => import('@/views/auth/group/group-manage'),
        meta: {
          name: '角色管理',
          icon: 'users'
        }
      },
      {
        path: 'route',
        name: 'route-manage',
        component:() => import('@/views/auth/router/router-manage'),
        meta: {
          name: '路由管理',
          icon: 'map',
        }
      }
    ]
  }
];
