<template>
	<div>
		<el-form :model="form" label-width="60px" :rules="formRules">
			<el-form-item label="账号" prop="account">
				<el-input type="text" v-model="form.account" disabled/>
			</el-form-item>

			<el-form-item label="昵称" prop="nickname">
				<el-input type="text" v-model="form.nickname" maxlength="10" show-word-limit/>
			</el-form-item>

			<el-form-item label="头像" prop="avatar">
				<el-input v-model="form.avatar" />
			</el-form-item>
		</el-form>
	</div>
</template> 

<script>
import { editUserInfo } from '@/request/permission/'

export default {
	data() {
		return {
			dialogOptions: {
				title: '修改用户信息'
			},
			form: {},
      formRules: {
        nickname: [{ required: true }],
        avatar: [{ required: true }]
			},
			loading: false
		}
	},

	mounted() {
    this.form = this.dialogOptions.data;
	},

	methods: {
		async dialogClickButton(button) {
			if(button == 'ok' || button == 'yes') {
				const result = await this.editUserInfo();

				return result;
			}
		},
		async editUserInfo() {
      this.isloading = false;
      const { isSuccess } = await editUserInfo({
        nickname: this.form.nickname,
        avatar: this.form.avatar,
        from: 'center'
      });
      
      if(isSuccess) {
        this.isloading = false;

        this.$notify.success({
          title: '成功',
          message: '修改信息成功～'
				});
				
				return true;
			}
			else {
				return false;
			}
    },
	}
}
</script>