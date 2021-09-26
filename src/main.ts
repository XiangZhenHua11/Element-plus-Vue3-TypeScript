/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-09-15 17:53:54
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//路由守卫
import "@/router/permission";

//全局css
import "@/styles/index.scss";

// iconfont 图标样式库
import "@/assets/iconfont/iconfont.css";

// 引用Element-Plus
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

//引入i18n，国际化语言包
import i18n from "@/international/i18n";

import login from "@/views/login/index.vue";

export default login;

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(ElementPlus, {
    i18n: i18n.global.t,
  })
  .mount("#app");
