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
import { getOwnInfo } from "@/request/permission"

export default {
  data() {
    return {
      form: {},
      routeList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },

  mounted() {
    this.getRouteList();
  },

  methods: {
    showCurrent() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getRouteList() {
      this.routeList = [
        {
          id: 1,
          name: '用户管理',
          children: [
            {
              id: 2,
              name: '用户列表',
              children: [{ id: 3, name: 'read' }, { id: 4, name: 'write' }]
            }
          ]
        },
        {
          id: 5,
          name: '网站管理',
          children: [
            {
              id: 6,
              name: '我的作品',
              children: [{ id: 7, name: 'read' }, { id: 8, name: 'write' }]
            },
            {
              id: 9,
              name: '管理网站',
              children: [{ id: 10, name: 'read' }, { id: 11, name: 'write' }]
            }
          ]
        },
        {
          id: 12,
          name: '权限控制',
          children: [
            {
              id: 13,
              name: '角色管理',
              children: [{ id: 4, name: 'read' }, { id: 15, name: 'write' }]
            },
            {
              id: 16,
              name: '路由管理',
              children: [{ id: 17, name: 'read' }, { id: 18, name: 'write' }]
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>