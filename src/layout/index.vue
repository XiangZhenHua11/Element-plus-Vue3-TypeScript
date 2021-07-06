<!--
 * @Descripttion: 
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-05 11:58:22
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
import { sidebar, toggleSideBar } from "@storeAction/app/index";
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "Layout",
  components: {
    Sidebar,
    AppMain,
    Navbar,
  },
  setup() {
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
      toggleSideBar();
    };
    return {
      classObj,
      sidebar,
      handleClickOutside,
    };
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
