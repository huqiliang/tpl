import Vue from "vue";
import Router from "vue-router";
import autoRoutes from "vue-auto-routing";
import myRoutes from "./routes";

Vue.use(Router);
export const routes = [...autoRoutes, ...myRoutes];

export default new Router({
  base: process.env.BASE_URL,
  routes,
});
