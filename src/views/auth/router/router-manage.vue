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
import { getRouteList, getGroupRoute } from "@/request/permission"

export default {
  data() {
    return {
      form: {},
      routeList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      nowRoute: [],
      nowKey: [],
      showKey: [],
      baseNum: 1
    }
  },

  mounted() {
    this.getPageInfo();
  },

  methods: {
    async getPageInfo() {
      await this.getRouteList();
      await this.getNowRoute();

      // console.log('okokoko');
      this.addNumToNode(this.routeList);

      console.log(this.routeList);
      console.log(this.showKey);

      // setCheckedKeys
      let rere = this.$refs.tree.setCheckedKeys([1]);
      console.log(rere)
    },
    addNumToNode(node) {
      if(node instanceof Array) {
        for(let i = 0; i < node.length; i++) {
          this.addNumToNode(node[i]);
        }
      }
      else if(node instanceof Object) {
        node.id = this.baseNum;
        this.baseNum++;

        if (node.name && this.nowKey.includes(node.name)) {
          this.showKey.push(node.id);
        }

        if (node.parent && this.nowKey.includes(node.parent) && this.nowRoute[node.parent][node.name]) {
          this.showKey.push(node.id);
        }

        if(node.children && node.children.length > 0) {
          this.addNumToNode(node.children);
        }
      }
    },
    showCurrent() {
      // console.log(this.$refs.tree.getCheckedNodes(true));
      let nowTree = this.$refs.tree.getCheckedNodes(true);
      let res = {};

      for(let i = 0; i < nowTree.length; i++) {
        if(res[nowTree[i].parent]) {
          res[nowTree[i].parent][nowTree[i].name] = true;
        }
        else {
          res[nowTree[i].parent] = {};
          res[nowTree[i].parent][nowTree[i].name] = true;
        }
      }

      console.log(res);
    },
    async getRouteList() {
      const { isSuccess, data } = await getRouteList();

      if(isSuccess) {
        // console.log(data);
        this.routeList = this.calcRouteTree(data);
      }
    },
    calcRouteTree(data) {
      for (let i = 0; i < data.length; i++) {
        if(data[i].children && data[i].children.length > 0) {
          for (let j = 0; j < data[i].children.length; j++) {
            if(data[i].children[j].children && data[i].children[j].children.length) {
              for (let k = 0; k < data[i].children[j].children.length; k++) {
                data[i].children[j].children[k].parent = data[i].children[j].name;
              }
            }
            else {
              data[i].children[j].parent = data[i].name;
            }
          }
        }
        else {
          
        }
      }

      return data;
    },
    async getNowRoute() {
      const { isSuccess, data } = await getGroupRoute();

      if(isSuccess) {
        this.nowRoute = data;
        this.nowKey = Object.keys(data);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>