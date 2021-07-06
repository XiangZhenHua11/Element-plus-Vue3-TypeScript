/*
 * @Descripttion:用户store统一操作
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-05 11:55:24
 */
import store from "@/store";
import { user_Inf } from "@/store/modules/app/user.d";
/**
 * @Author: xzh
 * @Descripttion:用户信息
 * @Param:
 */
export const userInfo: user_Inf = store.getters.userInfo;
/**
 * @Author: xzh
 * @Descripttion:token
 * @Param:
 */
export const token: string = store.getters.token;
/**
 * @Author: xzh
 * @Descripttion:获取token
 * @Param:
 */
export const getToken = (): string => {
  return store.getters.token;
};
/**
 * @Author: xzh
 * @Descripttion:获取用户信息
 * @Param:
 */
export const getUserInfo = () => {
  return store.dispatch("user/getUserInfo");
};
/**
 * @Author: xzh
 * @Descripttion:退出登录
 * @Param:
 */
export const login = (userInfo: user_Inf): void => {
  store.dispatch("user/login", userInfo);
};
/**
 * @Author: xzh
 * @Descripttion:退出登录
 * @Param:
 */
export const logout = (): void => {
  store.dispatch("user/logout");
};

/**
 * @Author: xzh
 * @Descripttion:清除token
 * @Param:
 */
export const resetToken = (): void => {
  store.dispatch("user/resetToken");
};
