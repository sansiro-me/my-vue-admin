<template>
  <el-container>
    <el-main>
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

        <el-table-column label="根权限" min-width="150">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.rootpower }}</span> -->
            <el-tag class="margin-between" v-for="(todo, index) in scope.row.power" :key="index">{{ todo }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="备注" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { getOwnInfo } from "@/request/permission"

export default {
  data() {
    return {
      form: {},
      authList: []
    }
  },

  mounted() {
    this.getAuthList();
  },

  methods: {
    getAuthList() {
      this.authList = [
        {
          account: 'super',
          name: '超级管理员',
          num: 1,
          power: ['用户管理', '网站管理', '权限控制'],
          description: '系统超级管理员，拥有最高权限'
        },
        {
          account: 'admin',
          name: '管理员',
          num: 2,
          power: ['用户管理', '网站管理'],
          description: '系统管理员，拥有仅次于超级管理员的权限'
        },
        {
          account: 'user',
          name: '用户',
          num: 1,
          power: ['网站管理'],
          description: '系统普通用户，系统的主要使用者，完成功能操作'
        }
      ]
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