import Vue from "vue";
import Router from "vue-router";
import autoRoutes from "vue-auto-routing";
import myRoutes from "./routes";
import _ from "lodash";

Vue.use(Router);

export const routes = [...autoRoutes, ...myRoutes];

const router = new Router({
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const { token } = to.query;
  if (!_.isEmpty(token)) {
    localStorage.setItem("token", token);
  }
  next();
});

export default router;
