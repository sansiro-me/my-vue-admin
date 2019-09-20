<template>
  <el-container>
    <el-main>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="角色">
          <el-select v-model="searchObj.power" size="medium">
            <el-option label="admin" value="admin"></el-option>
            <el-option label="user" value="user"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="搜索内容">
          <el-input v-model="searchObj.search" size="medium"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="medium" @click="onSubmit">查询</el-button>
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
            <span>{{ scope.row.description }}你是啊实打实的爱上爱上爱上你是啊实打实的爱上爱上爱上你是啊实打实的爱上爱上爱上你是啊实打实的爱上爱上爱上</span>
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
import { getAllUser } from '@/request/permission/'

export default {
  data() {
    return {
      userList: [],
      searchObj: {
        power: '',
        search: ''
      }
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>
