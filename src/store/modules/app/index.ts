/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-06-24 15:20:41
 */
import { setSidebarStatus, getSidebarStatus } from "@/utils/cache/cookies";
import { app_Inf } from "./index.d";

const state: app_Inf = {
  sidebar: {
    opened: !!eval(<string>getSidebarStatus() || "true") ? true : false,
  },
  language: {
    //当前语言
    current: "zh",
    //后缀
    suffix: "",
  },
};
const mutations = {
  /**
   * @Author: xzh
   * @Descripttion:设置菜单收起/展开状态
   * @Param:
   * @param {app_Inf} state
   */
  TOGGLE_SIDEBAR: (state: app_Inf) => {
    state.sidebar.opened = !state.sidebar.opened;
    setSidebarStatus(!!state.sidebar.opened ? "true" : "false");
  },
  /**
   * @Author: xzh
   * @Descripttion:设置语言
   * @Param:
   * @param {app_Inf} state
   * @param {string} language
   */
  TOGGLE_LANGUAGE: (state: app_Inf, language: string) => {
    state.language.current = language;
    state.language.suffix = language == "zh" ? "" : "_" + language;
  },
};
const actions = {
  /**
   * @Author: xzh
   * @Descripttion:切换菜单展开/收起状态
   * @Param:
   * @param {any} param1
   */
  toggleSideBar: ({ commit }: any) => {
    commit("TOGGLE_SIDEBAR");
  },
  /**
   * @Author: xzh
   * @Descripttion:切换语言
   * @Param:
   * @param {any} param1
   * @param {string} language-语言
   */
  toggleLanguage: ({ commit }: any, language: string) => {
    commit("TOGGLE_LANGUAGE", language);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
