<!--
 * @Descripttion: 首页选项卡
 * @LastEditors: xzh
 * @LastEditTime: 2021-09-29 19:14:06
-->
<template>
  <el-tabs
    v-model="activeName"
    closable
    type="card"
    @tab-remove="handleTabRemove"
    @tab-click="handleTabChange"
  >
    <el-tab-pane
      v-for="(routerHistory, index) in routerHistoryArr"
      :key="index"
      :label="routerHistory.meta.title"
      :name="routerHistory.name"
    ></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useRouter } from "vue-router";
import { object_Inf } from "@/utils/index.d";
export default defineComponent({
  name: "tabBar",
  components: {},
  setup() {
    let router = useRouter();
    let activeName = ref<string>("console");
    let routerHistoryArr = reactive<Array<object_Inf>>([
      {
        name: "console",
        meta: {
          title: "控制台",
        },
      },
    ]);
    /**
     * @Author: xzh
     * @Descripttion:监听路由,记录路径
     * @Param:
     */
    onBeforeRouteUpdate((to: object_Inf) => {
      let { name } = to;
      //判断路由是否以存在
      if (!routerHistoryArr.find((x: object_Inf) => x.name == name)) {
        routerHistoryArr.push(to);
        activeName.value = name;
      }
    });
    /**
     * @Author: xzh
     * @Descripttion: 删除选项卡
     * @Param:
     */
    let handleTabRemove = (name: string) => {
      let index = routerHistoryArr.findIndex((x: object_Inf) => x.name == name);
      if (index > -1) {
        routerHistoryArr.splice(index, 1);
        activeName.value = routerHistoryArr.find(
          (x: object_Inf, index: number) => index == index - 1
        )!.name;
      }
    };
    /**
     * @Author: xzh
     * @Descripttion: 切换选项卡
     * @Param:
     */
    let handleTabChange = ({ paneName }: object_Inf) => {
      debugger;
      router.push(paneName);
    };
    return {
      activeName,
      handleTabRemove,
      handleTabChange,
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
