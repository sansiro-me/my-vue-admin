<template>
	<div>
		<el-form :model="form" label-width="80px" :rules="formRules">
			<el-form-item label="用户名称" prop="name">
				<el-input type="text" v-model="form.nickname" disabled/>
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
				<el-input type="textarea" v-model="form.description" />
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
        avatar: [{ required: true }],
        power: [{ required: true }]
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
      const { isSuccess } = await editUserInfo(this.form);
      
      if(isSuccess) {
        this.isloading = false;

        this.$notify.success({
          title: '成功',
          message: '修改用户信息成功～'
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