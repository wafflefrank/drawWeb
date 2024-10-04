<template>
  <router-view> </router-view>
  <!--  v-slot="{ Component }" -->
  <!-- <transition name="fade" mode="out-in">
    <component :is="Component" :key="$route.path" />
  </transition> -->
</template>

<script>
export default {
  provide() {
    return {
      reloadPage: this.reloadPage,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    // 畫面重新整理
    reloadPage() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="scss">
@import 'assets/SideBar/sideBar.css';
@import './assets/all.scss';
body {
  background-image: url('../src//assets/backGround/event_bg2.jpg');
  // background-size: 50% 100%;
  background-size: cover;
  background-attachment: fixed;
  background-position: bottom;
  background-repeat: no-repeat;
  transition: background 0.2s;
}
// 模糊化
body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: inherit; /* 繼承背景圖 */
  background-size: inherit;
  background-attachment: inherit;
  background-position: inherit;
  background-repeat: inherit;
  filter: blur(5px); /* 模糊效果 */
  z-index: -1; /* 放在背景下 */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
// 滑出動畫特效
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease;
}
</style>
