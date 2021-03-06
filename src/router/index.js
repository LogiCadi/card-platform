import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: {
          title: "首页",
          icon: "dashboard"
        }
      }
    ]
  }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: "/card",
    component: () => import("@/layout"),
    redirect: "noRedirect",
    alwaysShow: true,
    meta: {
      title: "卡片管理",
      icon: "documentation"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/card/list"),
        meta: {
          title: "卡片列表",
          icon: "peoples"
        }
      },
      {
        path: "create",
        component: () => import("@/views/card/create"),
        meta: {
          title: "卡片录入",
          icon: "peoples"
        }
      },
      {
        path: "assign",
        component: () => import("@/views/card/assign"),
        meta: {
          title: "卡片划拨",
          icon: "peoples"
        }
      },
      {
        path: "bindmeal",
        component: () => import("@/views/card/bindmeal"),
        meta: {
          title: "套餐绑定",
          icon: "peoples"
        }
      },
      {
        path: "info/:id",
        component: () => import("@/views/card/info"),
        hidden: true,
        meta: {
          title: "卡片详情",
          icon: "peoples"
        }
      }
    ]
  },

  {
    path: "/agent",
    component: () => import("@/layout"),
    redirect: "noRedirect",
    alwaysShow: true,
    meta: {
      title: "代理商管理",
      icon: "documentation"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/agent/list"),
        meta: {
          title: "代理商列表",
          icon: "peoples"
        }
      },
      {
        path: "create",
        component: () => import("@/views/agent/create"),
        meta: {
          title: "添加代理商",
          icon: "peoples"
        }
      }
    ]
  },

  {
    path: "/meal",
    component: () => import("@/layout"),
    redirect: "noRedirect",
    alwaysShow: true,
    meta: {
      title: "套餐管理",
      icon: "documentation"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/meal/list"),
        meta: {
          title: "套餐列表",
          icon: "peoples"
        }
      },
      {
        path: "create",
        component: () => import("@/views/meal/create"),
        hidden: true,
        meta: {
          title: "添加套餐",
          icon: "peoples"
        }
      },
      {
        path: "allot",
        component: () => import("@/views/meal/allot"),
        meta: {
          title: "分配套餐",
          icon: "peoples"
        }
      },
      {
        path: "allotSetting/:id",
        component: () => import("@/views/meal/allotSetting"),
        hidden: true,
        meta: {
          title: "分配设置",
          icon: "peoples"
        }
      },
      {
        path: "package",
        component: () => import("@/views/meal/package"),
        meta: {
          title: "加油包",
          icon: "peoples"
        }
      },
      {
        path: "packageCreate",
        component: () => import("@/views/meal/packageCreate"),
        hidden: true,
        meta: {
          title: "添加加油包",
          icon: "peoples"
        }
      }
    ]
  },

  {
    path: "/user",
    component: () => import("@/layout"),
    redirect: "noRedirect",
    alwaysShow: true,
    meta: {
      title: "用户管理",
      icon: "documentation"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/user/list"),
        meta: {
          title: "用户列表",
          icon: "peoples"
        }
      },
      {
        path: "create",
        component: () => import("@/views/user/create"),
        meta: {
          title: "添加用户",
          icon: "peoples"
        }
      }
    ]
  },
  {
    path: "/order",
    component: () => import("@/layout"),
    children: [
      {
        path: "list",
        component: () => import("@/views/order/list"),
        meta: {
          title: "订单管理",
          icon: "documentation"
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
