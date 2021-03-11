import router from "@/router/index";
import { getToken, setToken, removeToken } from "@/utils/cookies";
import { login, logout, getUserInfo } from "@/api/app/users";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    headImg: "",
  };
};
interface state {
  token: string;
  name: string;
  headImg: string;
}

const state = getDefaultState();

const mutations = {
  SET_TOKEN: (state: state, token: string) => {
    state.token = token;
  },
  SET_HEADIMG: (state: state, headImg: string) => {
    state.headImg = headImg;
  },
  SET_NAME: (state: state, name: string) => {
    state.name = name;
  },
  RESET_STATE: (state: state) => {
    Object.assign(state, getDefaultState());
  },
};
const actions = {
  // 登录
  async login(
    { commit }: any,
    userInfo: { username: string; password: string }
  ) {
    const { username, password } = userInfo;
    const { data } = await login({ username, password });
    commit("SET_TOKEN", data.token);
    setToken(data.token);
    return Promise.resolve(true);
  },

  // 根据token获取用户信息
  async getInfo({ commit, state }: any) {
    const { data } = await getUserInfo(state.token);
    const { userName, headImg } = data;
    commit("SET_NAME", userName); // 用户名
    commit("SET_HEADIMG", headImg); // 头像地址
    return Promise.resolve(data);
  },

  // 退出登录
  async logout({ commit, state }: any) {
    await logout();
    removeToken();
    commit("SET_TOKEN", "");
    router.push("/login");
    return Promise.resolve(true);
  },
  // remove token
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
