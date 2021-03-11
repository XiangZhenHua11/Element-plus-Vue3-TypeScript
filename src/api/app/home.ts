import request from "@/utils/request";

// 获取菜单数据源
export const loadSideMenu = () =>
  request({
    url: "/Home/LoadSideMenu",
    method: "post",
  });
