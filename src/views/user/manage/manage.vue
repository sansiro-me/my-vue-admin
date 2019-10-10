<template>
  <el-container v-loading="loading">
    <el-main>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="角色">
          <el-select v-model="searchObj.power" size="medium">
            <el-option label="全部" value=""></el-option>
            <el-option label="admin" value="admin"></el-option>
            <el-option label="user" value="user"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="搜索内容">
          <el-input v-model="searchObj.search" size="medium" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="medium" @click="onSubmit">查询</el-button>
          <el-button size="medium" @click="addNewUser" v-if="haswrite">新增用户</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="userList" style="width: 100%">
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="账号" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>

        <el-table-column label="昵称" min-width="170">
          <template slot-scope="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>

        <el-table-column label="头像">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>

        <el-table-column label="创建时间" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createtime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="角色">
          <template slot-scope="scope">
            <span>{{ scope.row.power }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注" min-width="300">
          <template slot-scope="scope">
            <span class="pre">{{ scope.row.description }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150" v-if="haswrite">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import { getAllUser, removeUser } from '@/request/permission/'

export default {
  data() {
    return {
      loading: false,
      userList: [],
      searchObj: {
        power: '',
        search: ''
      },
      pager: {
        total: 0,
        current: 0
      }
    }
  },
  computed: {
    haswrite() {
      return this.$store.getters['permission/getWrite'];
    }
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    changePage(pageNum) {
      this.getUserList(this.searchObj, pageNum);
    },
    onSubmit() {
      this.getUserList(this.searchObj);
    },
    async getUserList(search = {}, page = 1) {
      this.loading = true;

      if(search.search) {
        search.search = this.trim(search.search);
      }

      const { isSuccess, data } = await getAllUser({
        search: search.search,
        power: search.power,
        page: page
      });

      if(isSuccess) {
        this.userList = data.list;
        this.pager = {
          total: data.total,
          current: page
        }
      }

      this.loading = false;
    },
    async addNewUser() {
      const { button, data } = await this.$dialog('user/manage/create-user-layer');

      if(button == 'ok' && data) {
        this.getUserList();
      }
    },
    async handleDelete(index, row) {
      const { button } = await this.$confirm("你确定的吗，少年？", "温馨提示");

      if(button == 'ok') {
        this.removeUser(row.id);
      }
      else {
        console.log("not okd");
      }
    },
    async removeUser(userid) {
      const { isSuccess } = await removeUser({
        userid: userid
      });
      
      if(isSuccess) {
        this.getUserList();

        this.$notify.success({
          title: '成功',
          message: '删除成功～'
        });
      }
    },
    async handleEdit(index, row) {
      const { button, data } = await this.$dialog('user/manage/edit-user-layer', {
        data: JSON.parse(JSON.stringify(row))
      });

      if(button == 'ok' && data) {
        this.getUserList();
      }
    },
    trim(str) {
      return str.replace(/^\s+|\s+$/, '');
    }
  }
}
</script>

<style lang="scss" scoped>
.el-page-style {
  margin-top: 15px;
}

.pre {
  white-space: pre-wrap;
}
</style>
