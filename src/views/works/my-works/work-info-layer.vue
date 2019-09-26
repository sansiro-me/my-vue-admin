<template>
	<div>
		<el-form :model="form" label-width="80px" :rules="formRules">
			<el-form-item label="作品名称" prop="title">
				<el-input type="text" v-model="form.title"/>
			</el-form-item>

			<el-form-item label="跳转网址" prop="url">
				<el-input type="text" v-model="form.url"/>
			</el-form-item>

			<el-form-item label="海报图" prop="poster">
				<el-input v-model="form.poster" />
			</el-form-item>

			<el-form-item label="简介" prop="abstract">
				<el-input type="textarea" v-model="form.abstract" />
			</el-form-item>
		</el-form>
	</div>
</template> 

<script>
import { editWorkInfo, addWork } from '@/request/works'

export default {
	data() {
		return {
			dialogOptions: {},
			form: {},
      formRules: {
				title: [{ required: true }],
        url: [{ required: true }],
        abstract: [{ required: true }],
        poster: [{ required: true }]
			},
      loading: false,
      isedit: false
		}
	},

	mounted() {
    console.log(this.dialogOptions.data.id);

    if(this.dialogOptions.data.id) {
      this.form = this.dialogOptions.data;
      this.isedit = true;
    }
	},

	methods: {
		async dialogClickButton(button) {
			if(button == 'ok' || button == 'yes') {
        let result;
        if(this.isedit) {
          result = await this.editUserInfo();
        }
        else {
          result = await this.addNewWork()
        }

				return result;
			}
		},
		async editUserInfo() {
      const { isSuccess } = await editWorkInfo(this.form);
      
      if(isSuccess) {
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
    async addNewWork() {
      const { isSuccess } = await addWork(this.form);
      
      if(isSuccess) {
        this.$notify.success({
          title: '成功',
          message: '添加作品成功～'
				});
				
				return true;
			}
			else {
				return false;
			}
    }
	}
}
</script>