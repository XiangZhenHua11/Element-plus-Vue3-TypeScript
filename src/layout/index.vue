<!--
 * @Descripttion: 
 * @LastEditors: xzh
 * @LastEditTime: 2021-06-24 11:43:23
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 手机模式-遮盖层 -->
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { AppMain, Sidebar, Navbar } from "./components";
import store from "@/store";
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "Layout",
  setup() {
    let sidebar = store.getters.sidebar;
    /**
     * @Author: xzh
     * @Descripttion:获取不同模式状态
     * @Param:
     */
    let classObj = computed((): any => {
      return {
        hideSidebar: !sidebar.opened,
        openSidebar: sidebar.opened,
        mobile: false,
      };
    });
    /**
     * @Author: xzh
     * @Descripttion:手机模式-点击遮盖层收起菜单
     * @Param:
     * @param {*} void
     */
    let handleClickOutside = (): void => {
      store.dispatch("app/toggleSideBar");
    };
    return {
      classObj,
      sidebar,
      handleClickOutside,
    };
  },
  components: {
    Sidebar,
    AppMain,
    Navbar,
  },
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  // @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
