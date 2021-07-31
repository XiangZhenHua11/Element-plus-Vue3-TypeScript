<!--
 * @Descripttion: 
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-31 18:01:48
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
      <el-submenu
        v-for="rootMenu in sidmenuArr"
        :key="rootMenu.path"
        :index="rootMenu.path"
      >
        <template #title>
          <i :class="[rootMenu.meta.icon, 'span-icon']"></i>
          <span v-if="!!rootMenu.meta">{{ rootMenu.meta[field] }}</span>
        </template>
        <el-menu-item
          v-for="childMenu in rootMenu.children"
          :key="childMenu.path"
          :index="childMenu.path"
        >
          <template #title>
            <i :class="[childMenu.meta.icon, 'span-icon']"></i>
            <span v-if="!!childMenu.meta">{{ childMenu.meta[field] }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import storeAction_app from "@storeAction/app";
import { useRouter } from "vue-router";
import variables from "@/styles/variables.scss";
export default defineComponent({
  name: "SideBar",
  setup() {
    let router = useRouter();
    //获取缓存菜单
    let sidmenuArr = reactive(storeAction_app.getSidmenuArr());
    //获取当前语言字段
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
      sidmenuArr,
      isCollapse,
      activeMenu,
      variableArr,
      field,
    };
  },
});
</script>

<style lang="scss" scoped>
.span-icon {
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
</style>
