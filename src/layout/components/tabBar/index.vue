<!--
 * @Descripttion: 首页选项卡
 * @LastEditors: xzh
 * @LastEditTime: 2021-09-25 19:04:29
-->
<template>
  <el-tabs v-model="activeName" closable type="card">
    <el-tab-pane label="User" name="first" :closable="true"></el-tab-pane>
    <el-tab-pane
      v-for="(routerHistory, index) in routerHistoryArr"
      :key="index"
      :label="routerHistory.meta.title"
      :name="routerHistory.name"
    ></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, toRef } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
export default defineComponent({
  name: "tabBar",
  components: {},
  setup() {
    let activeName = "first";
    let routerHistoryArr = reactive<Array<object>>([]);
    /**
     * @Author: xzh
     * @Descripttion:监听路由,记录路径
     * @Param:
     */
    onBeforeRouteUpdate((to) => {
      debugger;
      routerHistoryArr.push(to);
    });
    return {
      activeName,
      routerHistoryArr,
    };
  },
});
</script>
<style lang="scss" scoped>
.el-tabs {
  background: #fff;
  ::v-deep(.el-tabs__header) {
    margin: 0;
  }
}
</style>
