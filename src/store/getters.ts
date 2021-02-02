const getters = {
  token: (state: any) => state.user.token,
  name: (state: any) => state.user.name,
  headImg: (state: any) => state.user.headImg,
  permission: (state: any) => state.permission.routes,
};
export default getters;
