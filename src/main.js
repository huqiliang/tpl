import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iView from "view-design"; // step 1:import view-design
import "view-design/dist/styles/iview.css";
import proIview from "pro_iview"; // step 1:import pro_iview
import "pro_iview/lib/pro-iview.css";
import http from "./libs/http";

Vue.use(iView); // step 3:use iView
Vue.use(proIview, {
  http,
}); // step 4:use proIview

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
