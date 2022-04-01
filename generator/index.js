module.exports = (api, options, rootOptions) => {
  // 复制并用 ejs 渲染 `./template` 内所有的文件

  api.render("../template");
  api.render(files => {
    Object.keys(files)
      .filter(item => {
        item == "src/components/HelloWorld.vue";
      })
      .forEach(path => delete files[path]); // 删除键等同于删除对应的文件
  });
  // 修改 `package.json` 里的字段
  api.extendPackage({
    dependencies: {
      pro_iview: "^1.4.12"
    },
    devDependencies: {
      "git-cz": "^4.7.6",
      "webpack-bundle-analyzer": "^4.5.0"
    },
    scripts: {
      serve: "vue-cli-service serve",
      build: "vue-cli-service build",
      lint: "vue-cli-service lint",
      commit: "git add . && npx git-cz",
      analyze: "npm_config_report=true vue-cli-service build --mode analyze"
    },
    config: {
      commitizen: {
        path: "./node_modules/git-cz"
      }
    },
    gitHooks: {
      "commit-msg": "node scripts/verifyCommitMsg.js"
    }
  });
};
