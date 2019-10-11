import router from './index'
import store from '@/store'

// 需要权限控制的路由
import routes from './children'

// const oldRoutes = JSON.parse(JSON.stringify(routes));

// export default oldRoutes;

let needToAdd = [
  {
    path: '/',
    name: 'container',
    component:() => import('@/components/Container.vue'),
    redirect: 'home',
    children: []
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('@/components/404.vue')
  }
];

// 需要添加，但是不用权限验证的路由
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

export function getRealRoute(userRoute) {
  console.log("clip 111");
  // let ins = JSON.parse(JSON.stringify(routes));
  let ins = routes;

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
        else
        {
          // 是否有写权限
          if(userRoute[item.children[i].name].write) {
            ins[j].children[i].meta.write = true;
          }
          else {
            ins[j].children[i].meta.write = false;
          }
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

  // ins 就是过滤之后，用户有权限的路由
  // ins = Object.values(ins);

  needToAdd = needToAdd.concat(ins);

  needToAdd[0].children = [].concat(base, ins);

  store.dispatch('permission/saveRoutes', needToAdd);

  router.addRoutes(needToAdd);

  return [].concat(base, ins);
}
