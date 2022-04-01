let error404 = [
  {
    path: "/*",
    name: "error",
    meta: {
      title: "全局错误页"
    },
    component: () =>
      import(/* webpackChunkName: "error" */ "@/views/system/__error__.vue")
  }
];

export default error404;
