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
          <MenuItem
            :name="item.name"
            v-for="item in routes"
            :key="item.name"
            @click.native="$router.replace(item)"
          >
            <span>{{ item.meta ? item.meta.title : item.name }}</span>
          </MenuItem>
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
      background: "#ccc",
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  methods: {
    changeBg() {
      this.background = this.background === "#ccc" ? "#fff" : "#ccc";
    },
    async auth() {
      const res = await axios.post(
        "http://192.168.0.85:8109/uc-web/sso/login",
        {
          appCode: "",
          orgCode: "GCBZG",
          userCode: "GCBZG_ADMIN",
          password: "e10adc3949ba59abbe56e057f20f883e",
        }
      );
      if (res.data.result === 0) {
        localStorage.setItem("token", res.data.retVal.jwtToken);
        this.$Message.success({ content: "授权成功" });
      }
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
  },
};
</script>
