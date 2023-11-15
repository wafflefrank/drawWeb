<template>
  <!-- <SwiperCarousel /> -->
  <div class="mt-5"><img src="../assets/banner/Banner_1.png" alt="#" /></div>
  <div>
    <div class="d-flex justify-content-center">
      <button class="line_btn me-3"><img src="../assets/banner/line_logo.png" alt="" /><span class="ms-2 text-white">Line活動專員</span></button>
      <button class="game_btn"><img src="../assets/banner/line_logo.png" alt="" /><span class="ms-2 text-white">娛樂城</span></button>
    </div>
  </div>

  <div class="my-5 d-flex flex-column align-items-center">
    <!-- 幸運轉盤 -->
    <LuckyWheel ref="myLucky" width="900px" height="900px" :prizes="prizes" :blocks="blocks" :buttons="buttons" @start="startCallback" @end="endCallback" />

    <!-- 中獎說明 -->
    <div class="directionBox">
      <div class="D_title"><img src="../assets/banner/win_des.png" alt="" /></div>
      <div class="D_Word">
        <p>1.為避免【會員瀏覽器問題】所有得獎者獎項一律以LEO娛樂城抽獎系統歷史記錄為主。</p>
        <p>2.中獎禮金將於21號後依序轉入會員的遊戲帳戶。</p>
        <p>3.本活動最終解釋權歸LEO娛樂城所有。</p>
      </div>
    </div>
    <!-- 活動說明 -->
    <div class="directionBox">
      <div class="D_title"><img src="../assets/banner/act_des.png" alt="" /></div>
      <div class="D_Word">
        <p>1.LEO娛樂城EX與KU經銷專屬幸運大抽獎，僅有EX與KU旗下會員才可參加抽獎活動，非EX與KU旗下會員將不符合資格。</p>
        <p>2.會員當月存款金額累計滿10000點(含)以上且需一倍流水，獲得抽獎次數1次，最多儲值滿30000點(含)以上且需一倍流水，獲得抽獎次數3次。</p>
        <p>3.次月1號至10號經審查合格後，將於隔日11號可獲得抽獎驗證碼，會員需自行至抽獎活動網址進行抽獎。</p>
        <p>4.審核合格後，當月20號以前未自行前往抽獎則視為放棄資格。</p>
        <p>5.任何參與資格都以LEO娛樂城抽獎系統判斷為主，不得有爭議。<br />&nbsp;</p>
      </div>
    </div>
  </div>

  <el-dialog class="drawModel_style" v-model="dialogFormVisible" title="抽獎資格驗證" width="40%" center>
    <el-form :model="getCode_Form">
      <el-form-item label="抽獎驗證碼:" :label-width="formLabelWidth">
        <el-input class="codeInput_style" v-model="getCode_Form.code" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
// import SwiperCarousel from '../components/Swiper/Carousel.vue';
import borderImg from '../assets/backGround/zp2_bg.png';
import startBtn from '../assets/backGround/startBtn.png';
import selectBtn from '../assets/backGround/zp3_btn2.png';

export default {
  components: {
    // SwiperCarousel,
  },
  data() {
    return {
      // 驗證碼
      memberCode: {
        code: '',
      },
      // 驗證表單
      dialogFormVisible: false,
      // 抽獎驗證碼表單
      getCode_Form: {
        code: '',
      },
      lotteryMsg: '',
      blocks: [{ padding: '55px', background: '#869cfa', imgs: [{ src: borderImg, width: '100%', rotate: true }] }],
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
              background: '#00ffee',
            },
            {
              src: selectBtn,
              width: '40%',
              top: '-450px',
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
    postLottery() {
      this.$http.post('http://localhost:3000/users/lottery', this.memberCode).then((res) => {
        console.log(res.data.data);
        if (res.data.data.code === 200) {
          console.log('抽獎成功');
          this.lotteryMsg = res.data.data.msg;
        } else {
          console.log('驗證碼有誤');
          this.lotteryMsg = res.data.data.msg;
        }
      });
    },
    // 点击抽奖按钮会触发star回调
    startCallback() {
      this.dialogFormVisible = true;
      this.postLottery();
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
    this.postLottery();
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
.directionBox {
  max-width: 935px;
  width: 90%;
  margin-top: 50px;
  border: 3px solid #ffa1a1;
  background: transparent;
  // background: rgba(0, 0, 0, 0.5);
  padding: 30px 30px 20px;
  z-index: 1;
  border-radius: 10px;
  box-sizing: border-box;
  position: relative;
  & img {
    position: absolute;
    top: -26px;
    left: 40px;
    height: 45px;
    width: auto;
  }
  & .D_Word {
    text-align: left;
    padding-left: 20px;
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
}
// 輸入驗證碼樣式
.codeInput_style {
  // width: 80%;
  --el-input-focus-border-color: #faa30d;
  padding: 10px 200px;
  // & :deep(.el-input__inner) {
  //   padding: 25px 0 25px 0px;
  //   // border-radius: 50px;
  // }
  & :deep(.el-input__wrapper) {
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    padding-left: 10px;
  }
  & :deep(.el-input-group__prepend) {
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }
}
</style>

<style lang="scss">
// 抽獎彈窗
.drawModel_style {
  background: #fff !important;
  font-size: 20px;
  font-weight: bold;
  border-radius: 20px;
  & .el-dialog__header {
    background: linear-gradient(90deg, rgba(238, 149, 179, 1) 17%, rgba(244, 82, 96, 0.770920868347339) 52%, rgba(201, 142, 244, 0.8073354341736695) 100%);
    margin-right: 0;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  & .el-dialog__title {
    font-size: 30px;
    font-weight: bold;
    color: #fff;
  }
}
</style>
