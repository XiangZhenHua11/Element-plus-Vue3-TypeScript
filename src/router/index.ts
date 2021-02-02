import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    meta: {
      hidden: true,
      title: "登录",
    },
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/404",
    component: () => import("@/views/404.vue"),
    meta: { hidden: true },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/homePage",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes,
});

export default router;
