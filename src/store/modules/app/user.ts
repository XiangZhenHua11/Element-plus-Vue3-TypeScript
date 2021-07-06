/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-05 11:51:32
 */
import router from "@/router/index";
import { getToken, setToken, removeToken } from "@/utils/cache/cookies";
import { login, logout, getUserInfo } from "@/api/app/users";
import { userStroe_Inf, user_Inf } from "./user.d";

const getDefaultState = (): userStroe_Inf => {
  return {
    token: getToken(),
    userInfo: {
      name: "",
      headImg: "",
    },
  };
};
const state = getDefaultState();

const mutations = {
  SET_TOKEN: (state: userStroe_Inf, token: string) => {
    state.token = token;
  },
  SET_USERINFO: (state: userStroe_Inf, userInfo: any) => {
    Object.assign(state.userInfo, userInfo);
  },
  RESET_STATE: (state: userStroe_Inf) => {
    Object.assign(state, getDefaultState());
  },
};
const actions = {
  /**
   * @Author: xzh
   * @Descripttion:登录
   * @Param:
   */
  async login({ commit }: any, userInfo: user_Inf) {
    const { username, password } = userInfo;
    const { data } = await login({ username, password });
    commit("SET_TOKEN", data.token);
    setToken(data.token);
    return Promise.resolve(true);
  },

  /**
   * @Author: xzh
   * @Descripttion:根据token获取用户信息
   * @Param:
   * @param {any} param1
   */
  async getUserInfo({ commit, state }: any) {
    const { data } = await getUserInfo(state.token);
    const { userName, headImg } = data;
    commit("SET_USERINFO", {
      userName,
      headImg,
    });
    return Promise.resolve(data);
  },
  /**
   * @Author: xzh
   * @Descripttion:退出登录
   * @Param:
   * @param {any} param1
   */
  async logout({ commit, state }: any) {
    await logout();
    removeToken();
    commit("SET_TOKEN", "");
    router.push("/login");
    return Promise.resolve(true);
  },
  /**
   * @Author: xzh
   * @Descripttion:移除token
   * @Param:
   * @param {any} param1
   */
  resetToken({ commit }: any) {
    removeToken(); // must remove  token  first
    commit("RESET_STATE");
    return Promise.resolve(true);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
