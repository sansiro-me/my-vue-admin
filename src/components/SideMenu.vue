<template>
  <div class="menu-container">
    <template v-for="todo in menu">
      <el-submenu v-if="todo.children && todo.children.length > 0" :key="todo.name" :index="todo.name">
        <template slot="title">
          <span v-if="todo.meta && todo.meta.icon" class="side-icon" :class="'icon-' + todo.meta.icon"></span>
          <span class="sidemenu-title">{{ todo.meta.name }}</span>
        </template>

        <el-menu-item-group>
          <my-nav :menu="todo.children"></my-nav>
        </el-menu-item-group>
      </el-submenu>

      <router-link v-else-if="!todo.meta.hidden || todo.meta.hidden == false" tag="a" :to="{ name: todo.name }" :key="todo.name">
        <el-menu-item :index="todo.name">
          <span v-if="todo.meta && todo.meta.icon" class="side-icon" :class="'icon-' + todo.meta.icon"></span>
          <span class="sidemenu-title">{{ todo.meta.name }}</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'my-nav',
  props: {
    menu: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-item,
.el-submenu {
  text-align: left;
  font-weight: bold;

  .side-icon {
    display: inline-block;
    width: 24px;
    // margin-right: 10px;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
  }
}

.sidemenu-title {
  margin-left: 8px;
}
</style>
