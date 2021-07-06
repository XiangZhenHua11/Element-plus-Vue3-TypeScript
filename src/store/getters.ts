/*
 * @Descripttion:
 * @LastEditors: xzh
 * @LastEditTime: 2021-06-24 15:36:29
 */
const getters = {
  sidebar: (state: any) => state.app.sidebar,
  language: (state: any) => state.app.language,
  token: (state: any) => state.user.token,
  userInfo: (state: any) => state.user.userInfo,
  permission_routes: (state: any) => state.permission.routes,
  sidmenuArr: (state: any) => state.permission.sidmenuArr,
};
export default getters;
