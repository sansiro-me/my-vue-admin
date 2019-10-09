<template>
  <div :class="{navCollapsed:isSidebarNavCollapse}">
    <el-menu :collapse="isSidebarNavCollapse" background-color="#304156" text-color="#eee" active-text-color="#4dbcff" :default-active="currentMenu" class="sidebar">
      
      <side-menu :menu="menuList"/>
    </el-menu>

    <div class="main-container">
      <topnav-bar/>
      <router-view class="content"></router-view>
    </div>
  </div>
</template>

<script>
import TopnavBar from '@/components/TopnavBar';
import SideMenu from '@/components/SideMenu';

import { mapState } from 'vuex'

export default {
  components: { TopnavBar, SideMenu },

  computed: {
    ...mapState(['isSidebarNavCollapse']),
    ...mapState('permission', ['currentMenu', 'menuList'])
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  min-height: 100vh;
  background-color: #f0f0f0;
}
.content {
  text-align: left;
}
</style>
