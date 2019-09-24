<template>
  <transition name="msgbox-fade">
    <div class="el-message-box__wrapper" v-show="visible">
      <div class="el-message-box" >
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>标题名称</span>
          </div>
          <button type="button" class="el-message-box__headerbtn" @click="close">
            <i class="el-message-box__close el-icon-close"></i>
          </button>
        </div>
        <div class="el-message-box__content">
          <div class="el-message-box__message">
            <p>这是一段内容</p>
            <p>这是一段内容</p>
            <p>这是一段内容</p>
            <p>这是一段内容</p>
            <p>这是一段内容</p>
            <p>这是一段内容</p>
            <p>这是一段内容</p>
            <p>这是一段内容</p>
            <p>这是一段内容</p>
            <p>这是一段内容</p>
            <p>这是一段内容</p>
            <p>这是一段内容</p>
            <p>这是一段内容</p>
            <!-- <slot></slot> -->
            <dialog-content></dialog-content>
          </div>
          <!-- <div class="el-message-box__input" style="display: none;">
            <div class="el-input">
              <input type="text" autocomplete="off" placeholder="" class="el-input__inner">
            </div>
            <div class="el-message-box__errormsg" style="visibility: hidden;">
            </div>
          </div> -->
        </div>
        <div class="el-message-box__btns">
          <button type="button" class="el-button el-button--default el-button--small el-button--primary ">
            <span>确定</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },

  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;

      setTimeout(() => {
        this.$emit('close');
      }, 300);
    }
  }
}
</script>

<style lang="scss" scoped>
.el-message-box__wrapper {
  background: rgba(0, 0, 0, 0.5);
  z-index: 1100;
  box-sizing: content-box;
  padding-bottom: 20px;
  bottom: -20px;

  .el-message-box {

  }
}
</style>