let error404 = [
  {
    path: "/*",
    name: "error",
    meta: {
      title: "404页面",
    },
    component: () =>
      import(/* webpackChunkName: "error" */ "@/pages/system/error.vue"),
  },
];

export default error404;
