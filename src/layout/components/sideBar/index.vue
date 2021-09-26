<!--
 * @Descripttion: 菜单
 * @LastEditors: xzh
 * @LastEditTime: 2021-09-07 20:22:35
-->
<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :router="true"
      :text-color="variableArr.menuText"
      :active-text-color="variableArr.menuActiveText"
      :background-color="variableArr.menuBg"
    >
      <menuItem
        v-for="item in routeMenuArr"
        :key="item.path"
        :menuItem="item"
      ></menuItem>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import storeAction_app from "@storeAction/app";
import variables from "@/styles/variables.scss";
import menuItem from "./sideBarItem/index.vue";

export default defineComponent({
  name: "sideBar",
  components: {
    menuItem,
  },
  setup() {
    let router = useRouter();
    //获取缓存菜单
    let routeMenuArr = reactive(storeAction_app.getRouteMenuArr());
    /**
     * @Author: xzh
     * @Descripttion:获取当前语言字段
     * @Param:
     */
    let field = computed(() => {
      return "title" + storeAction_app.getLanguage().suffix;
    });
    //scss变量
    let variableArr = reactive(variables);
    /**
     * @Author: xzh
     * @Descripttion:获取路由设置默认选择菜单
     * @Param:
     */
    let activeMenu = computed((): string => {
      const { meta, name } = router.currentRoute.value;
      if (!!meta.activeMenu) {
        return meta.activeMenu;
      }
      return <string>name;
    });
    /**
     * @Author: xzh
     * @Descripttion:是否收缩
     * @Param:
     */
    let isCollapse = computed((): boolean => {
      return storeAction_app.getSidebar().opened;
    });
    return {
      routeMenuArr,
      isCollapse,
      activeMenu,
      variableArr,
      field,
    };
  },
});
</script>
