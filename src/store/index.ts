import { App } from "vue";
import { createStore } from "vuex";
import user from "./modules/user";
import permission from "./modules/permission";
import getters from "./getters";

export const store = createStore({
  modules: {
    user,
    permission,
  },
  getters,
});

export default store;
