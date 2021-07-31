/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-30 10:22:58
 */
import { createStore } from "vuex";
import Cookies from "js-cookie";
import user from "./modules/app/user";
import app from "./modules/app";
import permission from "./modules/router/permission";
import getters from "./getters";
import createPersistedState from "vuex-persistedstate";

export const store = createStore({
  modules: {
    app,
    user,
    permission,
  },
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      // storage: {
      //   getItem: (key) => Cookies.get(key),
      //   setItem: (key, value) => Cookies.set(key, value, { expires: 1 }),
      //   removeItem: (key) => Cookies.remove(key),
      // },
    }),
  ],
});

export default store;
