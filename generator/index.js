module.exports = (api, options, rootOptions) => {
  // 复制并用 ejs 渲染 `./template` 内所有的文件
  const removeFiles = [
    "src/pages/about.vue",
    "src/pages/index.vue",
    "src/layouts/default.vue",
    "src/views/Home.vue",
    "src/views/About.vue"
  ];
  api.render("../template");
  api.render(files => {
    Object.keys(files)
      .filter(item => {
        return removeFiles.includes(item);
      })
      .forEach(path => delete files[path]); // 删除键等同于删除对应的文件
  });
  // 修改 `package.json` 里的字段
  api.extendPackage({
    dependencies: {
      "view-design": "^4.7.0",
      pro_iview: "^1.4.12"
    },
    devDependencies: {
      husky: "^7.0.4",
      "release-it": "^15.0.0",
      "git-cz": "^4.7.6",
      "webpack-bundle-analyzer": "^4.5.0",
      "@commitlint/cli": "^16.2.3",
      "@commitlint/config-conventional": "^16.2.1",
      "@release-it/conventional-changelog": "^5.0.0"
    },
    scripts: {
      serve: "vue-cli-service serve --open --mode local",
      build: "vue-cli-service build",
      lint: "vue-cli-service lint",
      commit: "git add . && npx git-cz  && git push",
      analyze: "npm_config_report=true vue-cli-service build --mode analyze",
      release:
        "npx release-it --no-npm --no-git.requireUpstream --git.pushRepo=origin"
    },
    config: {
      commitizen: {
        path: "./node_modules/git-cz"
      }
    },
    gitHooks: {
      "commit-msg": "commitlint --edit"
    }
  });
};
