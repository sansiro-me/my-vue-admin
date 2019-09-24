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
          <el-button size="medium" @click="dialog = true">新增用户</el-button>
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

    <el-drawer
      title="新增用户"
      :visible.sync="dialog"
      ref="drawer"
      :wrapperClosable="false"
      custom-class="medium"
      :destroy-on-close="true"
    >
      <el-form :model="form" label-width="80px" :rules="formRules">
        <el-form-item label="用户名称" prop="name">
          <el-input type="text" v-model="form.name" maxlength="10" show-word-limit />
        </el-form-item>

        <el-form-item label="用户头像" prop="avatar">
          <el-input v-model="form.avatar" />
        </el-form-item>

        <el-form-item label="用户角色" prop="power">
          <el-select v-model="form.power">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="用户" value="user"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.desc" />
        </el-form-item>

        <el-form-item>
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="addNewUser" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-container>
  
</template>


<script>
import { getAllUser, addNewUser } from '@/request/permission/'

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
      this.isloading = false;
      const { isSuccess } = await addNewUser(this.form);
      
      if(isSuccess) {
        this.isloading = false;
        this.dialog = false;
        this.getUserList();

        this.$notify.success({
          title: '成功',
          message: '添加新用户成功～'
        });
      }
    },
    async removeUser() {
      const { isSuccess } = await addNewUser(this.form);
      
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
    handleDelete(index, row) {
      // console.log(index, row);

      if(index < 1) {
        this.$dialog('user/create-user-layer').then(data => {
          console.log(data);
        })
      }
      else {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: qqq`
            });
          }
        });
      }
    }
  }
}
</script>
