import Vue from "vue";
import Router from "vue-router";
import routes from "vue-auto-routing";
import myRoutes from "./routes";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [...routes, ...myRoutes],
});
