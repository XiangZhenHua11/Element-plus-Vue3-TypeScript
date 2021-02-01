import { App } from "vue";
import { createStore } from "vuex";
import user from "./modules/user";
import getters from "./getters";

export const store = createStore({
  modules: {
    user,
  },
  getters,
});

export default store;
