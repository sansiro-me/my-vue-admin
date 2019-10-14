<template>
  <el-container v-loading="loading">
    <el-main>
      <div class="all-div">
        <div class="left-div">
          <h2 class="title">旧的路由</h2>

          <el-tree
            :data="allRoutes"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :indent="50"
            :props="defaultProps">
          </el-tree>
        </div>

        <div class="right-div">
          <h2 class="title">新的路由</h2>

          <el-tree
            :data="newRoutes"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :indent="50"
            :props="defaultProps">
          </el-tree>
        </div>
      </div>

      <el-button @click="updateRouteToServer">同步本地路由到服务器</el-button>
    </el-main>
  </el-container>
</template>

<script>
import { getAllRoutes } from "@/request/permission"

export default {
  data() {
    return {
      allRoutes: [],
      newRoutes: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      loading: false
    }
  },

  computed: {
    haswrite() {
      return this.$store.getters['permission/getWrite'];
    }
  },

  mounted() {
    this.getAllRoutes();
  },

  methods: {
    async getAllRoutes() {
      this.loading = true;

      this.newRoutes = this.$store.state.permission.allRoutes;
      const { isSuccess, data } = await getAllRoutes();

      this.loading = false;

      if(isSuccess) {
        this.allRoutes = data;
      }
    },
    async updateRouteToServer() {
      this.loading = true;
      const { isSuccess } = await this.$store.dispatch('permission/updateRoute');

      this.loading = false;

      if (isSuccess) {
        this.getAllRoutes();
        this.$notify.success({
          title: '成功',
          message: '修改成功～'
				});
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.all-div {
  width: 100%;
  position: relative;
  display: inline-block;
  font-size: 0;
  margin-bottom: 20px;

  & > div {
    display: inline-block;
    width: 50%;

    height: 100%;
    font-size: 16px;
    vertical-align: top;
    padding: 0 20px;
  }

  .left-div {
    // background-color: #fff4f4;
  // background-color: #f8f8f8;
    border-right: 1px solid #919191;
  }

  // .right-div {
  //   background-color: #ceffce;
  // }
}

.el-tree {
  background-color: unset;
}

.title {
  margin-bottom: 10px;
}
</style>