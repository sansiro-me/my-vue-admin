<template>
  <el-container>
    <el-main>
      <el-tree
        :data="routeList"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :indent="50"
        :props="defaultProps">
      </el-tree>

      <el-button @click="showCurrent"></el-button>
    </el-main>
  </el-container>
</template>

<script>
import { getRouteList } from "@/request/permission"

export default {
  data() {
    return {
      form: {},
      routeList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },

  mounted() {
    this.getRouteList();

    this.routeList = [
      {
        title: '用户管理',
        children: [
          {
            title: '用户列表',
            name: 'user-manage',
            children: [{ title: '只读', name: 'read' }, { title: '读写', name: 'write' }]
          }
        ]
      },
      {
        title: '网站管理',
        children: [
          {
            title: '我的作品',
            name: 'works-manage',
            children: [{ title: '只读', name: 'read' }, { title: '读写', name: 'write' }]
          },
          {
            title: '管理网站',
            name: 'site-manage',
            children: [{ title: '只读', name: 'read' }, { title: '读写', name: 'write' }]
          }
        ]
      },
      {
        title: '权限控制',
        children: [
          {
            title: '角色管理',
            name: 'auth-manage',
            children: [{ title: '只读', name: 'read' }, { title: '读写', name: 'write' }]
          },
          {
            title: '路由管理',
            name: 'roure-manage',
            children: [{ title: '只读', name: 'read' }, { title: '读写', name: 'write' }]
          }
        ]
      }
    ];
  },

  methods: {
    showCurrent() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    async getRouteList() {
      const { isSuccess, data } = await getRouteList();

      if(isSuccess) {
        console.log(data);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>