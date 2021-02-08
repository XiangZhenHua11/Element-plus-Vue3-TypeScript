import { createStore } from "vuex";
import user from "./modules/user";
import app from "./modules/app";
import permission from "./modules/permission";
import getters from "./getters";

export const store = createStore({
  modules: {
    app,
    user,
    permission,
  },
  getters,
});

export default store;
