/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-06-24 11:32:39
 */
import Cookies from "js-cookie";

/**
 * @Author: xzh
 * @Descripttion:用户token
 * @Param:
 */
const tokenKey = "xzh_token";
export const getToken = () => Cookies.get(tokenKey) || "";
export const setToken = (token: string) => Cookies.set(tokenKey, token);
export const removeToken = () => Cookies.remove(tokenKey);

/**
 * @Author: xzh
 * @Descripttion:语言
 * @Param:
 */
const languageKey = "xzh_language";
export const getLanguage = () => Cookies.get(languageKey) || "zh";
export const setLanguage = (language: string) =>
  Cookies.set(languageKey, language);

/**
 * @Author: xzh
 * @Descripttion:侧边栏状态
 * @Param:
 */
const sidebarStatusKey = "xzh_sidebar_status";
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey);
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(sidebarStatusKey, sidebarStatus);
