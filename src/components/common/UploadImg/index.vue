<template>
  <div class="avatar-container" v-if="type == 'avatar'">

    <el-avatar v-if="preview" :src="imageUrl" class="preview"></el-avatar>
    
    <label class="el-button el-button--primary el-button--small" :class="{ disabled: isloading }">
      <input class="file-input" type="file" @change="handleChange" ref="file" />
      <i class="el-icon-loading" v-if="isloading"></i>
      <span v-if="isloading">正在上传中...</span>
      <span v-else><slot>选择文件</slot></span>
    </label>

    <span v-if="tips" class="tips">{{ tips }}</span>
  </div>

  <div class="image-container" v-else>
    <div>
      <label class="el-button el-button--primary el-button--small" :class="{ disabled: isloading }">
        <input class="file-input" type="file" @change="handleChange" ref="file" />
        <i class="el-icon-loading" v-if="isloading"></i>
        <span v-if="isloading">正在上传中...</span>
        <span v-else><slot>选择文件</slot></span>
      </label>

      <span v-if="tips" class="tips">{{ tips }}</span>
    </div>

    <div class="image-pre" v-if="preview && imageUrl">
      <img class="preview-img" :src="imageUrl" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadImg',

  props: {
    value: '',
    tips: {
      type: String,
      default: ''
    },
    preview: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'image'
    }
  },

  data() {
    return {
      imageUrl: "",
      isloading: false
    }
  },

  watch: {
    value(val) {
      console.log(val);
      this.imageUrl = val;
    }
  },

  methods: {
    async handleChange() {
      if(this.isloading) {
        return;
      }

      const ele = this.$refs.file;
      const file = ele.files[0];

      ele.value = null;
      ele.disabled = true;
      this.isloading = true;

      let requestUrl = '/public/uploadImage';

      if(this.type == 'avatar') {
        requestUrl = '/permission/uploadAvatar';
      }

      const { isSuccess, data } = await this.$fetch(requestUrl, {
        method: 'post',
        upload: true,
        data: {
          file: file,
          type: this.type
        }
      });

      ele.disabled = false;
      this.isloading = false;

      if(isSuccess) {
        this.imageUrl = data;
        this.$emit('input', data);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-container {
  display: flex;
  align-items: center;
  justify-content: left;
}

.file-input {
  display: none;
}

.tips {
  margin-left: 10px;
  font-size: 13px;
  color: #bbb;
  line-height: 1;
}

.preview {
  margin-right: 10px;
}

.disabled {
  cursor: not-allowed;
  background-color: #a0cfff;
  border-color: #a0cfff;
}

.image-container {
  .preview-img {
    max-width: 150px;
    max-height: 100px;
  }
}
</style>