import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//路由守卫
import "@/router/permission";

//引用样式
import "@/styles/index.css";

// iconfont 图标样式库
import "@/assets/iconfont/iconfont.css";

// 引用Element-Plus
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn";

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { locale })
  .mount("#app");
