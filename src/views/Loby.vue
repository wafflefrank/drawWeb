<template>
  <!-- <SwiperCarousel /> -->
  <div class="mt-5"><img src="../assets/banner/Banner_1.png" alt="#" /></div>
  <div>
    <div class="d-flex justify-content-center">
      <button class="line_btn me-3"><img src="../assets/banner/line_logo.png" alt="" /><span class="ms-2 text-white">Line活動專員</span></button>
      <button class="game_btn"><img src="../assets/banner/line_logo.png" alt="" /><span class="ms-2 text-white">娛樂城</span></button>
    </div>
  </div>
</template>

<script>
// import SwiperCarousel from '../components/Swiper/Carousel.vue';

export default {
  components: {
    // SwiperCarousel,
  },
  data() {
    return {
      body: {
        phone: '0866682480' || '',
        message: '短信助手自动转发来自:\nTechcombank时间:2021-10-27 03:12:56\n内容:TK 19037155539013\nSo tien GD:\nSo du:',
      },
    };
  },
  methods: {
    postApi() {
      this.$http.post('https://pay.zaza.one/robot/vietnamBanksSMS', this.body).then((res) => {
        console.log(res);
      });
    },
  },
  created() {
    this.postApi();
  },
};
</script>

<style lang="scss" scoped>
.line_btn {
  min-width: 255px;
  background-color: #1e8449;
  font-size: 20px;
  font-weight: 700;
  border-radius: 15px;
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;
  // background: url(../assets/backGround/line_bg.png) no-repeat center;
  // background-size: 100%;
  border: 0;
  &:hover {
    background-color: rgba(39, 174, 96);
  }
  &:focus {
    background-color: rgba(39, 174, 96);
  }
}
.game_btn {
  /* CSS */
  min-width: 255px;
  background-color: #ea4c89;
  font-size: 20px;
  font-weight: 700;
  border-radius: 15px;
  cursor: pointer;
  border: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  &:hover {
    background-color: #f082ac;
  }
  &:focus {
    background-color: #f082ac;
  }
}
</style>
