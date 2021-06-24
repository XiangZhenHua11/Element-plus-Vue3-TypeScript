/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-06-24 11:42:11
 */
import {
  getLanguage,
  setLanguage,
  setSidebarStatus,
  getSidebarStatus,
} from "@/utils/cache/cookies";

interface app_Inf {
  sidebar: sidebar_Inf; //菜单
  language: language_Inf; //语言
}
//菜单接口
interface sidebar_Inf {
  opened: boolean;
}
//语言接口
interface language_Inf {
  current: string;
  suffix: string;
}
const state: app_Inf = {
  sidebar: {
    opened: !!eval(<string>getSidebarStatus() || "true") ? true : false,
  },
  language: {
    //当前语言
    current: getLanguage(),
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
    setLanguage(language);
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
