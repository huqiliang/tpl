import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import autoRoutes from "./auto_routes";
Vue.use(VueRouter);

const routes = [
  ...autoRoutes,
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
