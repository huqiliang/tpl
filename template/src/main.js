import Vue from "vue";
import iView from "view-design"; // step 1:import view-design
import "view-design/dist/styles/iview.css";
import proIview from "pro_iview"; // step 2:import pro_iview
import "pro_iview/lib/pro-iview.css";
import http from "./libs/http";
import AppPrd from "./App.vue";
import AppDev from "./AppDevelopment.vue";

const App = process.env.NODE_ENV === "local" ? AppDev : AppPrd;

Vue.use(iView); // step 3:use iView
Vue.use(proIview, {
  http
}); // step 4:use proIview

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
