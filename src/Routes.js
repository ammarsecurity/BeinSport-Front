import Vue from "vue";
import Router from "vue-router";

import Layout from "@/components/Layout/Layout";
import Login from "@/pages/Login/Login";
import SignUp from "@/pages/SignUp/SignUp";
import Serials from "../src/pages/Admin/Serials";
import userSerials from "../src/pages/User/Serials";
import clinetSerials from "../src/pages/Clinet/Serials";
import sales from "../src/pages/Clinet/Sales";
import Stores from "../src/pages/Admin/Stores";
import Users from "../src/pages/Admin/Users";
import adminSales from "../src/pages/Admin/AdminSales";
import oldSerials from "../src/pages/Admin/OldSerials.vue";

import ErrorPage from "@/pages/Error/Error";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/signUp",
      name: "SignUp",
      component: SignUp,
    },
    {
      path: "/error",
      name: "Error",
      component: ErrorPage,
    },
    {
      path: "/logout",
      name: "logout",
    },
    {
      path: "/sys",
      name: "Layout",
      component: Layout,
      meta: {
        role: "Admin",
      },
      children: [
        {
          path: "serials",
          name: "serials",
          component: Serials,
          meta: {
            role: "Admin",
          },
        },
        {
          path: "stores",
          name: "stores",
          component: Stores,
          meta: {
            role: "Admin",
          },
        },
        {
          path: "users",
          name: "users",
          component: Users,
          meta: {
            role: "Admin",
          },
        },
        {
          path: "adminsales",
          name: "sales",
          component: adminSales,
          meta: {
            role: "Admin",
          },
        },
        {
          path: "oldserials",
          name: "sales",
          component: oldSerials,
          meta: {
            role: "Admin",
          },
        },
       
      ],
    },

    {
      path: "/sysuser",
      name: "Layout",
      component: Layout,
      meta: {
        role: "User",
      },
      children: [
        {
          path: "serials",
          name: "serials",
          component: userSerials,
          meta: {
            role: "User",
          },
        },
        {
          path: "sales",
          name: "sales",
          component: sales,
          meta: {
            role: "User",
          },
        },
   
    
       
      ],
    },
    {
      path: "/sysclinet",
      name: "Layout",
      component: Layout,
      meta: {
        role: "User",
      },
      children: [
        {
          path: "serials",
          name: "serials",
          component: clinetSerials,
          meta: {
            role: "User",
          },
        },
        {
          path: "sales",
          name: "sales",
          component: sales,
          meta: {
            role: "User",
          },
        },
   
    
       
      ],
    },
  ],
  mode: "history",
});
