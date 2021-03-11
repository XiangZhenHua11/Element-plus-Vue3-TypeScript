import request from "@/utils/request";

//获取用户信息
export const getUserInfo = (token: string) =>
  request({
    url: "/User/GetUserInfo",
    method: "get",
    params: { token },
  });

//登录
export const login = (data: any) =>
  request({
    url: "/User/Login",
    method: "post",
    data,
  });

//退出登录
export const logout = () =>
  request({
    url: "/User/Logout",
    method: "post",
  });
