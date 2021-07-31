/*
 * @Descripttion:路由store操作
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-31 18:21:43
 */
import store from "@/store";
/**
 * @Author: xzh
 * @Descripttion:路由store操作类
 * @Param:
 */
class storeAction_router {
  /**
   * @Author: xzh
   * @Descripttion:获取菜单
   * @Param:
   * @param {string} account-账号
   */
  static generateRoutes = async (account: string) => {
    return await store.dispatch("permission/generateRoutes", account);
  };
}

export default storeAction_router;
