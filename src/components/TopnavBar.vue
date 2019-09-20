<template>
  <aside class="aside__top">
    <span class="icon-arrow-left toggleNavCollapse" :class="{active:isSidebarNavCollapse}" @click="toggleNavCollapse" >
    </span>

    <el-breadcrumb separator="/" class="el-breadcrumb">
      <!-- <transition-group name="breadcrumb"> -->
        <template v-for="(todo, index) in crumbList">
          <el-breadcrumb-item :key="index" v-if="todo.name != 'container'"> {{todo.meta.name}} </el-breadcrumb-item>
        </template>
        <!-- <el-breadcrumb-item>人才</el-breadcrumb-item>
        <el-breadcrumb-item>管理</el-breadcrumb-item> -->
      <!-- </transition-group> -->
    </el-breadcrumb>

    <div class="aside-top-right">
      <div class="user-msg">
        <el-dropdown trigger="click" placement="top" @command="handleCommand">
          <span class="el-dropdown-link">
            <img class="user-img" :src="avatar" alt="">
            <span class="user-name">{{ name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="user">
              <span class="icon-user"> 个人中心</span>
            </el-dropdown-item>
            <el-dropdown-item command="passwd">
              <span class="icon-lock"> 修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item command="exit">
              <span class="icon-power"> 退出登陆</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['isSidebarNavCollapse']),
    ...mapState('permission', ['avatar', 'name', 'crumbList'])
  },
  methods: {
    toggleNavCollapse() {
      this.$store.commit('toggleNavCollapse')
    },
    handleCommand(str) {
      switch(str) {
        case 'user':
          break;
        case 'passwd':
          break;
        case 'exit':
          this.loginOut();
          break;
      }
    },
    loginOut() {
      this.$store.commit('permission/logout')
      /* 防止切换角色时addRoutes重复添加路由导致出现警告 */
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.aside__top {
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  height: 50px;
  line-height: 50px;
  position: fixed;
  left: 200px;
  top: 0;
  right: 0;
  background: #f8f8f8;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  transition: left 0.25s;

  .toggleNavCollapse {
    display: inline-block;
    margin-left: 8px;
    padding: 0 10px;
    font-size: 26px;
    vertical-align: middle;
    color: #333;
    cursor: pointer;
    transition: all 0.4s;

    &.active {
      transform: rotate(180deg);
    }
  }

  .aside-top-right {
    > div {
      position: relative;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      margin-left: 10px;
      padding: 0 15px;
      cursor: pointer;

      &:hover::after {
          transform-origin: 0 0;
          transform: scaleX(1);
      }

      &:first-child:before {
          border: none;
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: #ef4747;
        transform: scaleX(0);
        transform-origin: right 0;
        transition: transform 0.5s;
      }

      &::before {
        content: '';
        position: absolute;
        height: 20px;
        top: 50%;
        left: -8px;
        margin-top: -10px;
        border-left: 1px solid #ccc;
      }

      &.user-msg {
        .user-img {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .user-name {
          color: #272f3c;
          padding: 0 4px;
        }
      }
    }
  }
}

.el-breadcrumb {
  flex-grow: 1;
  margin-top: 2px;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
    transition: all 0.6s;
}

.breadcrumb-leave-active {
    position: absolute;
}

.quit-system {
  .icon-power {
    font-size: 20px;
    color: #758eb5;
  }
}

.el-dropdown-link {
  display: inline-block;
  height: 100%;
  user-select: none;
}
</style>
