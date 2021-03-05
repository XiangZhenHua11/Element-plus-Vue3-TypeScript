import router from "@/router";
import { loadSideMenu } from "@/api/home";
import Layout from "@/layout/index.vue";

interface state {
  routes: Array<any>;
  addRoutes: Array<any>;
  sidmenuArr: Array<resData_Inf>;
}
//返回数据类型接口
interface resData_Inf {
  id: string; //主键
  guid: string; //唯一主键
  parentGuid: string; //父节点主键
  liName: string; //节点名称
  liEnglishName: string; //节点名称
  liDataName: string; //节点数据名称
  liIcon: string; //节点图标
  isChild: boolean; //是否有子级
  isEnable: boolean; //是否有效
  element_liHref: string; //节点地址
}
//路由节点接口
interface routerMenu_Inf {
  path?: string;
  component?: any;
  guid?: string;
  name?: string;
  children: Array<any>;
  meta?: any;
  redirect?: string;
}
/**
 * 后台查询的菜单数据拼装成路由格式的数据
 */
const generaMenu = (data: any) => {
  // 按照排序进行排序
  data = data.sort();
  // 查询根节点
  var rootMenu = data.filter(
    (x: resData_Inf) =>
      x.isChild === true && x.parentGuid === null && x.isEnable === true
  );
  var menuArr: Array<any> = [];
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
        titleEnglish: item.liEnglishName,
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

// 获取菜单子节点数据
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
        titleEnglish: item.liEnglishName,
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

const state: state = {
  routes: [],
  addRoutes: [],
  sidmenuArr: [],
};

const mutations = {
  //设置路由
  SET_ROUTES: (state: state, routes: Array<any>) => {
    state.addRoutes = routes;
    state.routes = router.getRoutes().concat(routes);
  },
  //设置菜单
  SET_SIDEMENU: (state: state, sidmenuArr: Array<resData_Inf>) => {
    state.sidmenuArr = sidmenuArr;
  },
};
const actions = {
  async generateRoutes({ commit }: any) {
    // 获取菜单数据,把数据添加到路由
    const { data } = await loadSideMenu();
    // 获取格式化后菜单数据
    var routMenu = generaMenu(data);
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
