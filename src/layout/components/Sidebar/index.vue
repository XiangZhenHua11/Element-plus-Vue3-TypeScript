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
            <i :class="[childMenu.meta.icon, 'span-icon']"></i>
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
import { defineComponent, reactive, computed } from "vue";
import variables from "@/styles/variables.scss";
import store from "@/store";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "SideBar",
  setup() {
    let router = useRouter();
    //获取缓存菜单
    let sidmenuArr = reactive(store.getters.sidmenuArr);
    //scss变量
    let variableArr = reactive(variables);
    //获取路由设置默认选择菜单
    let activeMenu = computed((): string => {
      const { meta, name } = router.currentRoute.value;
      if (!!meta.activeMenu) {
        return meta.activeMenu;
      }
      return <string>name;
    });
    let isCollapse = computed((): boolean => {
      return !store.getters.sidebar.opened;
    });
    return {
      sidmenuArr,
      isCollapse,
      activeMenu,
      variableArr,
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
