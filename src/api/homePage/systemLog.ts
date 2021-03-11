import request from "@/utils/request";

//获取系统日志表格数据
export const getPageList = (data: any) =>
  request({
    url: "/SystemLog/GetPageList",
    method: "post",
    data,
  });

//清空日志
export const removeLog = (logType: string, keepTime: string) =>
  request({
    url: "/SystemLog/RemoveLog",
    method: "get",
    params: { logType: logType, keepTime: keepTime },
  });
