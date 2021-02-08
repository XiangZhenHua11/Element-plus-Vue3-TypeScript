import Cookies from "js-cookie";

interface app_Inf {
  sidebar: sidebar_Inf;
}
//菜单接口
interface sidebar_Inf {
  opened: boolean;
}
const state: app_Inf = {
  sidebar: {
    opened: !!eval(<string>Cookies.get("sidebarStatus")) ? true : false,
  },
};
const mutations = {
  //设置菜单收起/展开状态
  TOGGLE_SIDEBAR: (state: app_Inf) => {
    state.sidebar.opened = !state.sidebar.opened;
    Cookies.set("sidebarStatus", !!state.sidebar.opened ? "true" : "false");
  },
};
const actions = {
  //切换菜单展开/收起状态
  toggleSideBar: ({ commit }: any) => {
    commit("TOGGLE_SIDEBAR");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
