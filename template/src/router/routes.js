let error404 = [
  {
    path: "/*",
    name: "error",
    meta: {
      title: "404页面"
    },
    component: () =>
      import(/* webpackChunkName: "error" */ "@/views/system/__error__.vue")
  }
];

export default error404;
