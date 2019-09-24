<template>
	<div>
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
		</el-form>
	</div>
</template> 

<script>
import { addNewUser } from '@/request/permission/'

export default {
	data() {
		return {
			dialogOptions: {
				title: '哈哈哈'
			},
			form: {},
      formRules: {
        name: [{ required: true }],
        avatar: [{ required: true }],
        power: [{ required: true }]
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
				
				return true;
			}
			else {
				return false;
			}
    },
	}
}
</script>