<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="!item.redirect || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter, RouteRecordRaw } from "vue-router";
export default defineComponent({
  name: "Breadcrumb",
  setup() {
    let router = useRouter();
    let levelList = computed(
      (): Array<RouteRecordRaw> => {
        //获取路由记录
        let matched: Array<RouteRecordRaw> = router.currentRoute.value.matched.filter(
          (item) =>
            !!item.meta && !!item.meta.title && item.meta.breadcrumb !== false
        );
        //判断第一个是否为固定的主页
        if (!isConsole(matched[0])) {
          let homePageArr: Array<RouteRecordRaw> = [
            { path: "/homePage", meta: { title: "主页" }, redirect: "/" },
          ];
          matched = homePageArr.concat(matched);
        }
        return matched;
      }
    );
    //判断是否为主页
    let isConsole = (route: RouteRecordRaw) => {
      let name = <string>route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === "homepage".toLocaleLowerCase();
    };
    //点击面包屑跳转
    let handleLink = (item: any): void => {
      const { redirect, path } = item;
      if (redirect) {
        router.push(redirect);
        return;
      }
      router.push(path);
      return;
    };
    return {
      levelList,
      handleLink,
    };
  },
});
</script>
<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
