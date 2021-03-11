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
      <el-menu mode="horizontal">
        <el-menu-item>
          <!-- 切换语言 -->
          <el-dropdown @command="changeLanguage">
            <span class="el-dropdown-link">
              {{ $t("language." + currentLanguage)
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in languageArr"
                  :key="item"
                  :disabled="currentLanguage == item"
                  :command="item"
                  >{{ $t("language." + item) }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-menu-item>
        <el-menu-item>
          <!-- 头像 -->
          <el-dropdown>
            <el-avatar
              :size="40"
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
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
import store from "@/store";
import { useRouter } from "vue-router";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "console",
  components: { Breadcrumb },
  setup() {
    let router = useRouter();
    const I18n = useI18n();
    //获取语种数组
    let languageArr = reactive<Array<string>>(I18n.availableLocales);
    //获取当前语言
    let currentLanguage = computed((): string => {
      return I18n.locale.value;
    });
    //获取菜单展开/收起状态
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
    //切换语言
    let changeLanguage = (item: string) => {
      I18n.locale.value = item;
      store.dispatch("app/toggleLanguage", item);
    };
    return {
      logout,
      toggleSideBar,
      menuState,
      languageArr,
      currentLanguage,
      changeLanguage,
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
    .el-dropdown-link,
    .el-dropdown-selfdefine {
      display: block;
      font-size: 16px;
      color: #888;
      margin-bottom: 10%;
    }
  }
}
</style>
