<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu default-active="2" :router="true">
      <el-submenu
        v-for="rootMenu in sidmenuArr"
        :key="rootMenu.path"
        :index="rootMenu.path"
      >
        <template #title>
          <span class="svg-container">
            <i :class="rootMenu.meta.icon"></i>
          </span>
          <span v-if="rootMenu.meta && rootMenu.meta.title">{{
            rootMenu.meta.title
          }}</span>
        </template>
        <el-menu-item
          v-for="childMenu in rootMenu.children"
          :key="childMenu.path"
          :index="childMenu.path"
        >
          <template #title>
            <span class="svg-container">
              <i :class="childMenu.meta.icon"></i>
            </span>
            <span v-if="childMenu.meta && childMenu.meta.title">{{
              childMenu.meta.title
            }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import store from "@/store";
export default defineComponent({
  name: "SideBar",
  setup() {
    //获取缓存菜单
    let sidmenuArr = reactive(store.getters.sidmenuArr);
    // let activeMenu = (): void => {
    //   // const route = this.$route;
    //   // const { meta, path } = route;
    //   // if (meta.activeMenu) {
    //   //   return meta.activeMenu;
    //   // }
    //   // return path;
    // };
    // let isCollapse = (): void => {
    //   // return !this.sidebar.opened;
    // };
    return {
      sidmenuArr,
    };
  },
});
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
.svg-container {
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
