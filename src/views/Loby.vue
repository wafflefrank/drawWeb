<template>
  <!-- <SwiperCarousel /> -->
  <div class="mt-5"><img src="../assets/banner/Banner_1.png" alt="#" /></div>
  <div>
    <div class="d-flex justify-content-center">
      <button class="line_btn me-3"><img src="../assets/banner/line_logo.png" alt="" /><span class="ms-2 text-white">Line活動專員</span></button>
      <button class="game_btn"><img src="../assets/banner/line_logo.png" alt="" /><span class="ms-2 text-white">娛樂城</span></button>
    </div>
  </div>
  <div class="my-5 d-flex justify-content-center">
    <!-- <lee-luck-grid ref="LuckDraw" :config="config" :prizes="prizes" :btnConfig="btnConfig" @start="startCallBack" @end="endCallBack"></lee-luck-grid> -->
    <LuckyWheel ref="myLucky" width="700px" height="700px" :prizes="prizes" :blocks="blocks" :buttons="buttons" @start="startCallback" @end="endCallback" />
  </div>
</template>

<script>
// import SwiperCarousel from '../components/Swiper/Carousel.vue';
import borderImg from '../assets/backGround/zp2_bg.png';
import startBtn from '../assets/backGround/zp3_btn1.png';
import selectBtn from '../assets/backGround/zp3_btn2.png';

export default {
  components: {
    // SwiperCarousel,
  },
  data() {
    return {
      blocks: [{ padding: '40px', background: '#869cfa', imgs: [{ src: borderImg, width: '100%', rotate: true }] }],
      prizes: [
        { background: '#ee95a9', fonts: [{ text: '0' }] },
        { background: '#c98ef4', fonts: [{ text: '1' }] },
        { background: '#ee95a9', fonts: [{ text: '2' }] },
        { background: '#c98ef4', fonts: [{ text: '3' }] },
        { background: '#ee95a9', fonts: [{ text: '4' }] },
        { background: '#c98ef4', fonts: [{ text: '5' }] },
      ],
      buttons: [
        {
          radius: '30%',
          // background: '#617df2',
          pointer: true,
          imgs: [
            {
              src: startBtn,
              width: '100%',
              top: '-100%',
            },
            {
              src: selectBtn,
              width: '50%',
              top: '-350px',
            },
          ],
        },
        // {
        //   radius: '30%',
        //   background: '#869cfa',
        //   pointer: true,
        //   fonts: [{ text: '開始', top: '-10px' }],
        // },
      ],
    };
  },
  methods: {
    postApi() {
      this.$http.post('https://pay.zaza.one/robot/vietnamBanksSMS', this.body).then((res) => {
        console.log(res);
      });
    },
    // 点击抽奖按钮会触发star回调
    startCallback() {
      // 调用抽奖组件的play方法开始游戏
      this.$refs.myLucky.play();
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        const index = 0;
        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop(index);
      }, 3000);
    },
    // 抽奖结束会触发end回调
    endCallback(prize) {
      console.log(prize);
    },
  },
  created() {
    this.postApi();
  },
};
</script>

<style lang="scss" scoped>
// 扇形顏色
.section_color {
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(244, 82, 96, 0.770920868347339) 24%, rgba(179, 0, 255, 1) 100%);
}
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
