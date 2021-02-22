<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 手机模式-遮盖层 -->
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <div class="main-box flex">
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <navbar />
        <app-main />
      </div>
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
    //获取不同模式状态
    let classObj = computed((): any => {
      return {
        hideSidebar: !sidebar.opened,
        openSidebar: sidebar.opened,
        mobile: false,
      };
    });
    //手机模式-点击遮盖层收起菜单
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

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
