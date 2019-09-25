<template>
  <el-container>
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
          <el-input v-model="searchObj.search" size="medium"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="medium" @click="onSubmit">查询</el-button>
          <el-button size="medium" @click="addNewUser">新增用户</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="userList" style="width: 100%">
        <el-table-column label="用户id" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="昵称">
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
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
  
</template>


<script>
import { getAllUser, removeUser } from '@/request/permission/'

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      userList: [],
      searchObj: {
        power: '',
        search: ''
      },
      form: {},
      formRules: {
        name: [{ required: true }],
        avatar: [{ required: true }],
        power: [{ required: true }]
      },
    }
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    async getUserList(search = {}) {
      const { isSuccess, data } = await getAllUser(search);

      if(isSuccess) {
        this.userList = data;
      }
    },
    onSubmit() {
      this.getUserList(this.searchObj);
    },
    showDialog() {

    },
    async addNewUser() {
      const { button, data } = await this.$dialog('user/create-user-layer');

      if(button == 'ok' && data) {
        this.getUserList();
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
    closeDrawer() {
      console.log(this.form);
      this.loading = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
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
    async handleEdit(index, row) {
      const { button, data } = await this.$dialog('user/edit-user-layer', {
        data: row
      });

      if(button == 'ok' && data) {
        this.getUserList();
      }
    }
  }
}
</script>
