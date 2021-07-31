<!--
 * @Descripttion: 首页工具栏
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-31 17:46:29
-->
<template>
  <div class="navbar">
    <!-- 收缩/展开 -->
    <span class="hamburger-container" @click="storeAction_app.toggleSideBar">
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
                <el-dropdown-item divided @click="handleLogout">
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
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import storeAction_app from "@storeAction/app";
import storeAction_user from "@storeAction/app/user";
import Breadcrumb from "@/components/breadcrumb/index.vue";
export default defineComponent({
  name: "navbar",
  components: { Breadcrumb },
  setup() {
    let router = useRouter();
    const I18n = useI18n();
    //获取语种数组
    let languageArr = reactive<Array<string>>(I18n.availableLocales);
    /**
     * @Author: xzh
     * @Descripttion: 获取当前语言
     * @Param:
     */
    let currentLanguage = computed((): string => {
      return I18n.locale.value;
    });
    /**
     * @Author: xzh
     * @Descripttion:获取菜单展开/收起状态
     * @Param:
     */
    let menuState = computed((): boolean => {
      return storeAction_app.getSidebar().opened;
    });
    /**
     * @Author: xzh
     * @Descripttion:退出登录
     * @Param:
     */
    let handleLogout = async () => {
      await storeAction_user.logout();
      router.push(`/login?redirect=${router.currentRoute.value.fullPath}`);
    };
    /**
     * @Author: xzh
     * @Descripttion:切换语言
     * @Param:
     * @param {*} language
     */
    let changeLanguage = (language: string) => {
      I18n.locale.value = language;
      storeAction_app.toggleLanguage(language);
    };
    return {
      handleLogout,
      storeAction_app,
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
