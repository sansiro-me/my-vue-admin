<template>
	<div>
    <el-tree
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :indent="50"
      :props="defaultProps">
    </el-tree>

    <div class="margin-top">
      <el-button size="mini" @click="reset">复原</el-button>
      <el-button size="mini" @click="clear">清空</el-button>
    </div>
	</div>
</template>

<script>
import { setGroupRoute, getGroupRoute } from "@/request/permission"

export default {
  data() {
    return {
      dialogOptions: {
				title: '修改角色路由'
			},
      id: '',
      loading: false,
      form: {},
      routeList: [],
      data: [],
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
    this.id = this.dialogOptions.data.id;

    this.getPageInfo();
  },

  methods: {
    async dialogClickButton(button) {
			if(button == 'ok' || button == 'yes') {
				const result = await this.setNewRoute();

				return result;
			}
		},
    clear() {
      this.$refs.tree.setCheckedKeys([]);
    },
    reset() {
      this.$refs.tree.setCheckedKeys(this.showKey, true);
    },
    async getNowRoute() {
      const { isSuccess, data } = await getGroupRoute({
        id: this.id
      });

      if(isSuccess) {
        this.nowRoute = data.now;
        this.nowKey = Object.keys(data.now);

        this.routeList = this.calcRouteTree(data.route);
      }
    },
    async getPageInfo() {
      this.loading = true;
      await this.getNowRoute();

      this.addNumToNode(this.routeList);

      this.data = this.routeList;

      this.$refs.tree.setCheckedKeys(this.showKey, true);
      this.loading = false;
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

        // if (node.name && this.nowKey.includes(node.name)) {
        //   this.showKey.push(node.id);
        // }

        if (node.parent && this.nowKey.includes(node.parent) && this.nowRoute[node.parent][node.name]) {
          this.showKey.push(node.id);
        }

        if(node.children && node.children.length > 0) {
          this.addNumToNode(node.children);
        }
      }
    },
    async setNewRoute() {
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

      const { isSuccess, data } = await setGroupRoute({
        new: res,
        id: this.id
      });

      if (isSuccess) {
        this.$notify.success({
          title: '成功',
          message: '修改成功～'
				});
      }

      return isSuccess
    },
    calcRouteTree(data) {
      for (let i = 0; i < data.length; i++) {
        if(data[i].children && data[i].children.length > 0) {
          for (let j = 0; j < data[i].children.length; j++) {
            if(data[i].children[j].name) {
              data[i].children[j].children = [
                { title: '只读', name: 'read', parent: data[i].children[j].name },
                { title: '读写', name: 'write', parent: data[i].children[j].name }
              ];
            }
          }
        }
        else {
          data[i].children = [
            { title: '只读', name: 'read', parent: data[i].name },
            { title: '读写', name: 'write', parent: data[i].name }
          ];
        }
      }

      return data;
    }
  }
}
</script>

<style lang="scss" scoped>
.max-height {
  max-height: 600px;
  min-height: 300px;
}

.margin-top {
  margin-top: 10px;
}
</style>