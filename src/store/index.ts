/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-06-24 11:17:02
 */
import { createStore } from "vuex";
import user from "./modules/user";
import app from "./modules/app";
import permission from "./modules/permission";
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
    }),
  ],
});

export default store;
