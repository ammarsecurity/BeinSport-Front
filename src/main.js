// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VueTouch from "vue-touch";
import Trend from "vuetrend";
import Toasted from "vue-toasted";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store";
import router from "./Routes";
import App from "./App";
import layoutMixin from "./mixins/layout";
import Widget from "./components/Widget/Widget";
import OtpInput from "@bachdgvn/vue-otp-input";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};
Vue.component("v-otp-input", OtpInput);

Vue.use(BootstrapVue);
Vue.use(VueTouch);
Vue.use(Trend);
Vue.component("Widget", Widget);
Vue.mixin(layoutMixin);
Vue.use(Toasted, { duration: 10000 });
Vue.use(VueAxios, axios);

Vue.use(VueSweetalert2, options);
// seeting baseUrl in axios
axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
 //  config.baseURL = "http://localhost:53269/api/";
      config.baseURL = "https://beinapi.tatwer.tech/api/";
 //   config.baseURL = "https://messagebackend.alufiq.com/api/";
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);
const rolePage = {
  User: "/sys/addAffiliate",
  Admin: "/sys/serials",
  Client: "/sysclinet/serials",
};
router.beforeEach((to, form, next) => {
  const role =
    localStorage.getItem("token") && localStorage.getItem("role")
      ? localStorage.getItem("role")
      : null;
  if (to.path === "/" && role) return next();
  if (to.path === "/sys" && role) return next();
  if (to.path === "/sys" && role) return next();
  if (to.path === "/sysclinet/serials" && role) return next();
  if (to.path === "/sysclinet/sales" && role) return next();
  if (to.path === "/sys/serials" && role) return next();
  if (to.path === "/" && !role) return next();
  if ((to.path === "/" && !role) || (to.path === "/" && role)) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return next();
  }
  if (to.path === "/logout") {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    next("/");
  }

  if (to.meta.role) {
    if (to.meta.role === role) {
      next();
    } else {
      next("/");
    }
  } else {
    if (role) return next(rolePage[role]);
    next("/");
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  render: (h) => h(App),
});
