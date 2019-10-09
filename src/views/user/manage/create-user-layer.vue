<template>
	<div>
		<el-form :model="form" label-width="80px" :rules="formRules">
			<el-form-item label="账号" prop="account">
				<el-input type="text" v-model="form.account" maxlength="20" show-word-limit />
			</el-form-item>

			<el-form-item label="用户昵称" prop="nickname">
				<el-input type="text" v-model="form.nickname" maxlength="10" show-word-limit />
			</el-form-item>

			<el-form-item label="用户头像" prop="avatar">
        <upload-img v-model="form.avatar" preview type="avatar" tips="支持png、jpg、jpeg格式，最大限制50kb">点击上传头像</upload-img>
			</el-form-item>

			<el-form-item label="用户角色" prop="power">
				<el-select v-model="form.power">
					<el-option label="管理员" value="admin"></el-option>
					<el-option label="用户" value="user"></el-option>
				</el-select>
			</el-form-item>

      <el-form-item label="登陆密码" prop="passwd">
				<el-input type="text" v-model="form.passwd" show-password maxlength="20" show-word-limit />
			</el-form-item>

      <el-form-item label="确认密码" prop="repasswd">
				<el-input type="text" v-model="form.repasswd" show-password maxlength="20" show-word-limit />
			</el-form-item>

			<el-form-item label="备注">
				<el-input type="textarea" v-model="form.desc" />
			</el-form-item>
		</el-form>
	</div>
</template> 

<script>
import { addNewUser } from '@/request/permission/'

export default {
	data() {
		return {
			dialogOptions: {
				title: '新增用户'
			},
			form: {},
      formRules: {
				account: [{ required: true }],
        nickname: [{ required: true }],
        avatar: [{ required: true }],
        power: [{ required: true }],
        passwd: [{ required: true }],
        repasswd: [{ required: true }]
			},
			loading: false
		}
	},

	mounted() {

	},

	methods: {
		async dialogClickButton(button) {
			if(button == 'ok' || button == 'yes') {
				const result = await this.addNewUser();

				return result;
			}
		},
		async addNewUser() {
      this.isloading = false;

      const { isSuccess } = await addNewUser(this.form);
      
      if(isSuccess) {
        this.isloading = false;

        this.$notify.success({
          title: '成功',
          message: '添加新用户成功～'
				});
      }
      
      return isSuccess;
    },
    uploadAvatar() {
      console.log(arguments)
    }
	}
}
</script>

<style lang="scss" scoped>
.normal-lineh {
  line-height: 30px;
}
</style>