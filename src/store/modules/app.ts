import Cookies from "js-cookie";

interface app_Inf {
  sidebar: sidebar_Inf;
  language: string;
}
//菜单接口
interface sidebar_Inf {
  opened: boolean;
}
const state: app_Inf = {
  sidebar: {
    opened: !!eval(<string>Cookies.get("sidebarStatus") || "true")
      ? true
      : false,
  },
  language: "",
};
const mutations = {
  //设置菜单收起/展开状态
  TOGGLE_SIDEBAR: (state: app_Inf) => {
    state.sidebar.opened = !state.sidebar.opened;
    Cookies.set("sidebarStatus", !!state.sidebar.opened ? "true" : "false");
  },
  //设置语言
  TOGGLE_LANGUAGE: (state: app_Inf, language: string) => {
    state.language = language;
    Cookies.set("setLanguage", language);
  },
};
const actions = {
  //切换菜单展开/收起状态
  toggleSideBar: ({ commit }: any) => {
    commit("TOGGLE_SIDEBAR");
  },
  //切换语言
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
