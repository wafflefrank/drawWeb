<template>
  <!-- <SwiperCarousel /> -->
  <div>test</div>
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

<style lang="scss" scoped></style>
