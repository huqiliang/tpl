<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}
.vh {
  min-height: 100vh;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Sider
        class="vh"
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
      >
        <Menu
          :active-name="$route.name"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
        >
          <template v-for="(menu, index) in routes">
            <Submenu
              :name="index"
              :key="index"
              v-if="menu.children && menu.children.length > 0"
            >
              <template slot="title">
                {{ menu.meta ? menu.meta.title : menu.name }}
              </template>
              <MenuItem
                :name="menu.name"
                v-for="menu in menu.children"
                :key="menu.name"
                @click.native="$router.replace(menu)"
              >
                <span>{{ menu.meta ? menu.meta.title : menu.name }}</span>
              </MenuItem>
            </Submenu>
            <MenuItem
              v-else
              :name="menu.name"
              :key="index"
              @click.native="$router.replace(menu)"
            >
              <span>{{ menu.meta ? menu.meta.title : menu.name }}</span>
            </MenuItem>
          </template>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{ padding: 0 }" class="layout-header-bar">
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{ margin: '0 20px' }"
            type="md-menu"
            size="24"
          ></Icon>
          <Button :style="{ margin: '0 20px 0 0' }" @click="auth" type="success"
            >授权</Button
          >
          <Button @click="changeBg" :style="{ background }">切换背景</Button>
        </Header>
        <Content
          id="#app"
          :style="{ padding: '20px', background, minHeight: '260px' }"
        >
          <router-view />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import axios from "axios";
import { routes } from "./router/index";

export default {
  data() {
    return {
      routes,
      isCollapsed: false,
      background: "#ccc"
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    changeBg() {
      this.background = this.background === "#ccc" ? "#fff" : "#ccc";
    },
    async auth() {
      const res = await axios.post("http://183.129.215.114:8222/sso/login", {
        appCode: "",
        orgCode: "GCBZG",
        userCode: "GCBZG_ADMIN",
        password: "e10adc3949ba59abbe56e057f20f883e"
      });
      if (res.result === 0) {
        localStorage.setItem("token", res.retVal.jwtToken);
        this.$Message.success({ content: "授权成功" });
      } else {
        this.$Modal.info({
          render() {
            return (
              <div>
                <p style="padding:5px 0">模拟账号无法登陆,请按以下操作:</p>
                <p style="padding:5px 0">
                  1.请打开{" "}
                  <a target="_blank" href="http://192.168.0.85:8180/sso">
                    测试服
                  </a>{" "}
                  登陆后复制 token
                </p>
                <p style="padding:5px 0">
                  2.打开 f12 查找任意接口,复制 header 中的 Authorizatio n的值
                </p>
                <p style="padding:5px 0">
                  3.在当前 url 后加入 ?token=复制的值 ，即可使用
                </p>
              </div>
            );
          }
        });
      }
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    }
  }
};
</script>
