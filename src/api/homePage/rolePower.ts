import request from "@/utils/request";

//获取懒加载系统功能数据源
export const getRoleTableList = (data: any) =>
  request({
    url: "/RolePower/GetRoleTableList",
    method: "post",
    data,
  });

//获取菜单树形数据
export const getMenuTreeList = () =>
  request({
    url: "/SystemFunction/GetMenuTreeList",
    method: "get",
    params: {},
  });

//保存菜单form
export const saveForm = (data: any) =>
  request({
    url: "/RolePower/SaveForm",
    method: "post",
    data,
  });

//根据主键删除
export const deleteForm = (keyValue: string) =>
  request({
    url: "/RolePower/DeleteForm",
    method: "get",
    params: { keyValue: keyValue },
  });
