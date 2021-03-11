const getters = {
  sidebar: (state: any) => state.app.sidebar,
  language: (state: any) => state.app.language,
  token: (state: any) => state.user.token,
  name: (state: any) => state.user.name,
  headImg: (state: any) => state.user.headImg,
  permission_routes: (state: any) => state.permission.routes,
  sidmenuArr: (state: any) => state.permission.sidmenuArr,
};
export default getters;
