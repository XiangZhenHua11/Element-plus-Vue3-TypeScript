import request from "@/utils/request";

//获取懒加载系统功能数据源
export const getLazyMenuTable = (data: any) =>
  request({
    url: "/SystemFunction/getLazyMenuTable",
    method: "post",
    data,
  });

//更具节点guid，获取子节点数据源
export const getChildMenuTable = (guid: string) =>
  request({
    url: "/SystemFunction/GetChildMenuTable",
    method: "get",
    params: { guid: guid },
  });

//获取树形菜单数据源
export const getLazyTreeData = (guid: string) =>
  request({
    url: "/SystemFunction/GetLazyTreeData",
    method: "get",
    params: { guid: guid },
  });

//保存菜单form
export const saveForm = (data: any) =>
  request({
    url: "/SystemFunction/SaveForm",
    method: "post",
    data,
  });

//根据主键删除
export const deleteForm = (keyValue: string) =>
  request({
    url: "/SystemFunction/DeleteForm",
    method: "get",
    params: { keyValue: keyValue },
  });
