<template>
  <el-container>
    <el-main>
      <el-form :model="form" label-width="100px">
        <el-form-item label="我的头像：">
          <el-avatar :src="form.avatar"></el-avatar>
        </el-form-item>

        <el-form-item label="我的账号：">
          <span>{{ form.account }}</span>
        </el-form-item>

        <el-form-item label="我的昵称：">
          <span>{{ form.nickname }}</span>
        </el-form-item>

        <el-form-item label="我的角色：">
          <span>{{ form.power }}</span>
        </el-form-item>

        <el-form-item label="创建时间：">
          <span>{{ form.createtime }}</span>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="handleEdit">修改信息</el-button>
      <el-button @click="handleChange">修改密码</el-button>
    </el-main>
  </el-container>
</template>

<script>
import { getOwnInfo } from "@/request/permission"

export default {
  data() {
    return {
      form: {}
    }
  },

  mounted() {
    this.getOwnInfo();
  },

  methods: {
    async getOwnInfo() {
      const { isSuccess, data } = await getOwnInfo();

      if(isSuccess) {
        this.form = data;
      }
    },
    async handleEdit() {
      const { button, data } = await this.$dialog('user/center/edit-center-layer', {
        data: JSON.parse(JSON.stringify(this.form))
      });

      if(button == 'ok' && data) {
        this.getOwnInfo();
      }
    },
    async handleChange() {
      const { button, data } = await this.$dialog('user/center/change-passwd-layer', {
        data: JSON.parse(JSON.stringify(this.form))
      });

      if(button == 'ok' && data) {
        this.$notify.success({
          title: '成功',
          message: '修改成功～'
				});
      }
    }
  }
}
</script>