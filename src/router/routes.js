let error404 = [
  {
    path: "/*",
    name: "error",
    meta: {
      title: "404-页面不存在",
    },
    component: () =>
      import(/* webpackChunkName: "error" */ "@/pages/error.vue"),
  },
];

export default error404;
