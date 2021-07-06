/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-07-05 11:50:14
 */
/**
 * @Author: xzh
 * @Descripttion:用户缓存接口
 * @Param:
 */
export interface userStroe_Inf {
  token: string; //token
  userInfo: user_Inf;
}
/**
 * @Author: xzh
 * @Descripttion:用户接口
 * @Param:
 */
export interface user_Inf {
  name?: string; // 用户名
  headImg?: string; //头像
  username?: string; //账号
  password?: string; //密码
}
