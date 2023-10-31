<template>
  <div class="common-layout">
    <el-container>
      <!-- <el-header height="200px"><HeadBar></HeadBar></el-header> -->
      <el-container>
        <!-- <el-aside width="250px"><SideBar></SideBar></el-aside> -->
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import SideBar from '../components/SideBar/SideBar.vue';
// import HeadBar from '../components/HeadBar/HeadBar.vue';

export default {
  components: {
    // SideBar,
    // HeadBar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
// .el-container {
//   position: relative;
// }
// .el-aside {
//   box-shadow: 13px 1px 13px -6px rgba(0, 0, 0, 0.75);
// }
.el-header {
  padding: 0;
  z-index: 1;
}
.el-main {
  padding: 0px;
  z-index: 0;
}
</style>
