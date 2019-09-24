<template>
  <transition name="msgbox-fade">
    <div class="el-message-box__wrapper" v-show="visible">
      <div class="el-message-box dialog-self-width" :class="classSize">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>{{ title }}</span>
          </div>
          <button type="button" class="el-message-box__headerbtn" @click="close">
            <i class="el-message-box__close el-icon-close"></i>
          </button>
        </div>

        <hr class="el-message-dialog-hr">

        <div class="el-message-box__content">
          <div class="el-message-box__message">
            <!-- 相当于调用引入的组件 -->
            <dialog-content ref="body"></dialog-content>
          </div>
        </div>

        <hr class="el-message-dialog-hr">

        <div class="el-message-box__btns">
          <template v-if="Array.isArray(buttons)">
            <el-button
              v-for="(item, index) in buttons"
              :key="index"
              :type="item.type ? item.type : (item.name == 'ok' || item.name == 'yes' ? 'primary' : 'default')"
              :disabled="disabled"
              @click="handleAction(item.name)"
            >{{ item.text }}</el-button>
          </template>

          <template v-else>
            <el-button
              v-for="(item, index) in buttons"
              :key="index"
              :type="index == 'ok' || index == 'yes' ? 'primary' : 'default'"
              :disabled="disabled"
              @click="handleAction(index)"
            >{{ item }}</el-button>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DialogComponent',

  props: {
    title: {
      type: String,
      default: ''
    },
    hideClose: {
      type: Boolean,
      default: false
    },
    buttons: {
      type: Object
    },
    size: {
      type: String
    }
  },

  data() {
    return {
      visible: false,
      disabled: false
    }
  },

  computed: {
    classSize() {
      // if(this.size == small)
      return this.size;
    }
  },

  mounted() {

  },

  methods: {
    open() {
      this.visible = true;
    },
    handleAction(button) {
      this.$emit('action', button);
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
    &.dialog-self-width {

      &.small {
        width: 500px;
      }

      &.medium {
        width: 600px;
      }

      &.large {
        width: 700px;
      }
    }

    .el-message-dialog-hr {
      margin: 5px 15px;
      border: 1px solid #f9f9f9;
    }
  }
}
</style>