<template>
	<div>
		<el-form :model="form" label-width="100px" :rules="formRules">
			<el-form-item label="旧密码" prop="oldpasswd">
				<el-input type="text" v-model="form.oldpasswd" show-password maxlength="20" show-word-limit/>
			</el-form-item>

			<el-form-item label="新密码" prop="newpasswd">
				<el-input type="text" v-model="form.newpasswd" show-password maxlength="20" show-word-limit/>
			</el-form-item>

			<el-form-item label="确认新密码" prop="repasswd">
				<el-input type="text" v-model="form.repasswd" show-password maxlength="20" show-word-limit/>
			</el-form-item>
		</el-form>
	</div>
</template> 

<script>
import { changePasswd } from '@/request/permission/'

export default {
	data() {
		return {
			dialogOptions: {
				title: '修改密码'
			},
			form: {},
      formRules: {
        oldpasswd: [{ required: true }],
        newpasswd: [{ required: true }],
        repasswd: [{ required: true }]
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
				const result = await this.changeByUser();

				return result;
			}
		},
		async changeByUser() {
      this.isloading = false;
      const { isSuccess } = await changePasswd(this.form);
      
      if(isSuccess) {
        this.isloading = false;				
				return true;
			}
			else {
				return false;
			}
    },
	}
}
</script>