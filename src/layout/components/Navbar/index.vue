<template>
  <div class="navbar">
    <!-- 收缩/展开 -->
    <span class="hamburger-container" @click="toggleSideBar">
      <i
        :class="['iconfont', 'icon-' + (menuState ? 'menuOpen' : 'menuClose')]"
      ></i>
    </span>

    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown>
        <el-avatar
          :size="45"
          :src="
            'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
          "
        ></el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided @click="logout">
              <span style="display: block"> {{ $t("navbar.logout") }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import store from "@/store";
import { useRouter } from "vue-router";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
export default defineComponent({
  name: "console",
  components: { Breadcrumb },
  setup() {
    let router = useRouter();
    //菜单展开/收起状态
    let menuState = computed((): boolean => {
      return store.getters.sidebar.opened;
    });
    //退出登录
    let logout = async () => {
      await store.dispatch("user/logout");
      router.push(`/login?redirect=${router.currentRoute.value.fullPath}`);
    };
    //切换菜单收起/展开状态
    let toggleSideBar = () => {
      store.dispatch("app/toggleSideBar");
    };
    return {
      logout,
      toggleSideBar,
      menuState,
    };
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    padding: 0px 15px;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
