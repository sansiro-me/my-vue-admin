import layout from '@/components/LayOut'

const routes = [
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
        component:() => import('@/views/user/manage/manage'),
        meta: {
          name: '用户列表',
          icon: 'eye'
        }
      }
    ]
  },
  {
    path: 'works',
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
        component:() => import('@/views/works/my-works/manage'),
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
    path: 'auth',
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
        name: 'roure-manage',
        component:() => import('@/views/auth/router/router-manage'),
        meta: {
          name: '路由管理',
          icon: 'map',
        }
      }
    ]
  }
];

const base = [
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
    path: 'user-center',
    name: 'user-center',
    component:() => import('@/views/user/center/center'),
    meta: {
      name: '个人中心',
      hidden: true
    }
  }
];

const realRoute = [...base, ...routes];

export default realRoute;

export function getRealRoute(userRoute) {
  console.log(Object.keys(userRoute));
  console.log(routes);

  let ins = JSON.parse(JSON.stringify(routes));

  for(let j = 0; j < ins.length; j++) {
    let item = ins[j];

    // 有子节点，遍历子节点
    if(item.children && item.children.length > 0) {
      for(let i = 0; i < item.children.length; i++) {
        // 如果子节点没有权限的话，就删掉
        if(!Object.keys(userRoute).includes(item.children[i].name)) {
          ins[j].children.splice(i, 1);
          
          i--;
        }
      }
      // 如果所有子节点都没权限的话，父节点删掉
      if(item.children && item.children.length < 1) {
        ins.splice(j, 1);
        j--;
      }
    }
    // 没有子节点，也没有权限的话，就删掉
    else if(!Object.keys(userRoute).includes(item.name)) {
      ins.splice(j, 1);
      j--;
    }
  }

  ins = Object.values(ins);

  return [...base, ...ins];
}
