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

import menus from '@/filter/real-menu'

export default {
  data() {
    return {
      menuList: menus
    }
  },

  components: { TopnavBar, SideMenu },

  computed: {
    // ...mapState(['isSidebarNavCollapse']),
    ...mapState(['isSidebarNavCollapse']),
    ...mapState('permission', ['sidebarMenu', 'currentMenu'])
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
