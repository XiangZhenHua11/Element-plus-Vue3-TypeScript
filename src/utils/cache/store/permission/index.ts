/*
 * @Descripttion:路由store操作类
 * @LastEditors: xzh
 * @LastEditTime: 2021-06-24 17:01:04
 */
import store from "@/store";
/**
 * @Author: xzh
 * @Descripttion:切换菜单收起/展开状态
 * @Param:
 */
export const generateRoutes = (account: string): any => {
  return store.dispatch("permission/generateRoutes", account);
};
