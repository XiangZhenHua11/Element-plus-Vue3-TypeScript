<!--
 * @Descripttion: 菜单item
 * @LastEditors: xzh
 * @LastEditTime: 2021-09-01 10:20:42
-->
<template>
  <el-menu-item
    v-if="menuItem.children && menuItem.children.length == 0"
    :index="menuItem.path"
  >
    <template #title>
      <i :class="[menuItem.meta.icon, 'span-icon']"></i>
      <span v-if="!!menuItem.meta">{{ menuItem.meta[field] }}</span>
    </template>
  </el-menu-item>
  <el-submenu v-else :index="menuItem.path">
    <template #title>
      <i :class="[(menuItem || {}).meta.icon, 'span-icon']"></i>
      <span v-if="!!menuItem.meta">{{ menuItem.meta[field] }}</span>
    </template>
    <menuItem
      v-for="item in menuItem.children"
      :key="item.path"
      :menuItem="item"
    ></menuItem>
  </el-submenu>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from "vue";
import storeAction_app from "@storeAction/app";

export default defineComponent({
  name: "menuItem",
  props: {
    menuItem: {
      required: true,
      type: Object,
      default: {},
    },
  },
  setup(props) {
    let menuItem = reactive<any>(props.menuItem);
    //获取当前语言字段
    let field = computed(() => {
      return "title" + storeAction_app.getLanguage().suffix;
    });
    return {
      field,
      ...toRefs(menuItem),
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
