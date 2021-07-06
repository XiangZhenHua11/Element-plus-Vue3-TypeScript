import router from "@/router";
import { loadSideMenu } from "@/api/app/home";
import Layout from "@/layout/index.vue";
import { state_Inf, resData_Inf, routerMenu_Inf } from "./permission.d";
/**
 * @Author: xzh
 * @Descripttion:后台查询的菜单数据拼装成路由格式的数据
 * @Param:
 * @param {any} data
 */
const generaMenu = (data: any): Array<routerMenu_Inf> => {
  // 按照排序进行排序
  data = data.sort();
  // 查询根节点
  var rootMenu = data.filter(
    (x: resData_Inf) =>
      x.isChild === true && x.parentGuid === null && x.isEnable === true
  );
  var menuArr: Array<routerMenu_Inf> = [];
  rootMenu.forEach((item: resData_Inf) => {
    const menu: routerMenu_Inf = {
      path:
        "/" +
        item.liDataName.replace(
          item.liDataName[0],
          item.liDataName[0].toLowerCase()
        ), //首字母替换换成小写,
      component: Layout,
      // guid: item.guid, // 父节点唯一标识
      name: item.liDataName,
      children: [],
      meta: {
        title: item.liName,
        title_en: item.liName_en,
        id: item.guid,
        roles: ["system"],
        icon: item.liIcon,
      },
    };
    //获取子节点
    menu.children = joinChildMemu(menu, data);
    menuArr.push(menu);
  });
  //重定向默认主页
  let first = menuArr.findIndex((x: routerMenu_Inf) => x.children.length > 0);
  menuArr[first].redirect =
    menuArr[first].path +
    "/" +
    menuArr[first].children.find((x: routerMenu_Inf) => x.children.length == 0)
      .path;

  // 404 page must be placed at the end !!!
  // menuArr.push({ path: "*", redirect: "/404", meta: { hidden: true }});
  return menuArr;
};
/**
 * @Author: xzh
 * @Descripttion:获取菜单子节点数据
 * @Param:
 * @param {routerMenu_Inf} menu
 * @param {Array} data
 */
function joinChildMemu(menu: routerMenu_Inf, data: Array<any>) {
  const rootMenu = data.filter(
    (x: resData_Inf) => x.parentGuid === menu.meta.id && x.isEnable === true
  );
  const childMenuArr: Array<routerMenu_Inf> = [];
  rootMenu.forEach((item: resData_Inf) => {
    const chlidMenu: routerMenu_Inf = {
      path:
        (item.isChild ? "/" : "") +
        item.liDataName.replace(
          item.liDataName[0],
          item.liDataName[0].toLowerCase()
        ), //首字母替换换成小写
      component: item.isChild
        ? Layout
        : () => import(`@/views/${item.element_liHref}`),
      // guid: item.guid, // 父节点唯一标识
      name: item.liDataName,
      children: [],
      meta: {
        title: item.liName,
        title_en: item.liName_en,
        id: item.guid,
        roles: ["system"],
        icon: item.liIcon,
        affix:
          item.guid == "1E8F313A-BE70-A7AF-6706-135A646B9F52" ? true : false, //固定页签
      },
    };
    chlidMenu.children = joinChildMemu(chlidMenu, data);
    if (chlidMenu.children.length > 0) {
      //重定向
      chlidMenu.redirect =
        chlidMenu.path +
        "/" +
        chlidMenu.children.find((x) => x.children.length == 0).path;
    }
    childMenuArr.push(chlidMenu);
  });
  return childMenuArr;
}

const state: state_Inf = {
  routes: [],
  addRoutes: [],
  sidmenuArr: [],
};

const mutations = {
  /**
   * @Author: xzh
   * @Descripttion:设置路由
   * @Param:
   * @param {state} state
   * @param {Array} routes
   */
  SET_ROUTES: (state: state_Inf, routes: Array<any>) => {
    state.addRoutes = routes;
    state.routes = router.getRoutes().concat(routes);
  },
  /**
   * @Author: xzh
   * @Descripttion:设置菜单
   * @Param:
   * @param {state} state
   * @param {Array} sidmenuArr
   */
  SET_SIDEMENU: (state: state_Inf, sidmenuArr: Array<resData_Inf>) => {
    state.sidmenuArr = sidmenuArr;
  },
};
const actions = {
  /**
   * @Author: xzh
   * @Descripttion:格式化菜单
   * @Param:
   */
  async generateRoutes({ commit }: any) {
    // 获取菜单数据,把数据添加到路由
    const { data } = await loadSideMenu();
    // 获取格式化后菜单数据
    var routMenu: Array<routerMenu_Inf> = generaMenu(data);
    commit("SET_ROUTES", routMenu);
    commit("SET_SIDEMENU", routMenu);
    return Promise.resolve(routMenu);
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
