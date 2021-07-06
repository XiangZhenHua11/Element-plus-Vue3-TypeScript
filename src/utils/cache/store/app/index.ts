/*
 * @Descripttion:app store统一操作
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-05 11:57:36
 */
import store from "@/store";
import { sidebar_Inf } from "@store/app/index.d";
/**
 * @Author: xzh
 * @Descripttion:首页菜单
 * @Param:
 */
export const sidebar: sidebar_Inf = store.getters.sidebar;
/**
 * @Author: xzh
 * @Descripttion:切换菜单收起/展开状态
 * @Param:
 */
export const toggleSideBar = (): void => {
  store.dispatch("app/toggleSideBar");
};
/**
 * @Author: xzh
 * @Descripttion:切换语言
 * @Param:
 * @param {string} language-语言
 */
export const toggleLanguage = (language: string): void => {
  store.dispatch("app/toggleLanguage", language);
};
