<template>
  <el-container v-loading="loading">
    <el-main>
      <el-form :inline="true" @submit.native.prevent>
        <el-form-item label="搜索内容">
          <el-input v-model="search" size="medium" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="medium" @click="onSubmit">查询</el-button>
          <el-button size="medium" @click="addNewGroup" v-if="haswrite">新增角色</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="authList" style="width: 100%">
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="角色号">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>

        <el-table-column label="角色名">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="成员数量">
          <template slot-scope="scope">
            <span>{{ scope.row.num }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column label="根权限" min-width="150">
          <template slot-scope="scope">
            <el-tag class="margin-between" v-for="(todo, index) in scope.row.power" :key="index">{{ todo }}</el-tag>
          </template>
        </el-table-column> -->

        <el-table-column label="备注" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="220" v-if="haswrite">
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="warning" @click="gotoManage(scope.row.id)">管理</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="pager.total"
        hide-on-single-page
        class="el-page-style"
        @current-change="changePage">
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
import { getGroupList } from "@/request/permission"

export default {
  data() {
    return {
      form: {},
      authList: [],
      search: '',
      pager: {
        total: 0,
        current: 0
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
    this.getAuthList();
  },

  methods: {
    async gotoManage(id) {
      const { button, data } = await this.$dialog('auth/group/group-route-layer', {
        data: {
          id: id
        }
      });

      if(button == 'ok' && data) {
        // this.getUserList();
      }
    },
    changePage(pageNum) {
      this.getAuthList(this.search, pageNum);
    },
    onSubmit() {
      this.getAuthList(this.search);
    },
    async getAuthList(search = '', page = 1) {
      this.loading = true;
      const { isSuccess, data } = await getGroupList({
        search: search,
        page: page
      });

      this.loading = false;

      if(isSuccess) {
        this.authList = data.list;
        this.pager = {
          total: data.total,
          current: page
        }
      }
    },
    addNewGroup() {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.margin-between {
  margin-right: 5px;

  &:last-child {
    margin-right: 0;
  }
}
</style>