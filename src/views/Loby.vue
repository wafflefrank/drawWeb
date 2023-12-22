<template>
  <!-- <SwiperCarousel /> -->
  <div class="mt-5"><img src="../assets/banner/Banner_1.png" alt="#" /></div>
  <div>
    <div class="d-flex justify-content-center">
      <button class="line_btn me-3"><img src="../assets/banner/line_logo.png" alt="" /><span class="ms-2 text-white">Line活動專員</span></button>
      <button class="game_btn"><img src="../assets/banner/line_logo.png" alt="" /><span class="ms-2 text-white">娛樂城</span></button>
    </div>
  </div>

  <!-- 輪播畫面 -->
  <!-- <el-carousel class="mt-5" height="50px" :autoplay="true" indicator-position="none">
    <el-carousel-item v-for="item in translate_News" :key="item">
      <div class="d-flex justify-content-center">
        <div class="announce-icon d-flex">
          <span style="color: #faa30d" class="me-1 material-icons-outlined">campaign</span>
          <h5 justify="center" style="color: #ae92e1">{{ item.memberID }}</h5>
          <h5 justify="center" style="color: #ae92e1">{{ item.memberID }}</h5>
          <h5 justify="center" style="color: #ae92e1">{{ item.memberID }}</h5>
        </div>
        <div class="div-menu">
          <span style="color: #faa30d" class="material-icons-outlined">menu</span>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel> -->
  <div class="marquee_style my-5 d-flex align-items-center">
    <img class="boadcast_style" src="../assets/banner/broadcast-icon-png.webp" alt="#" />
    <div class="borderStyle">
      <Vue3Marquee :duration="8">
        <span class="text-white my-3" v-for="(item, index) in translate_News" :key="index">
          {{ item.memberID }}
        </span>
      </Vue3Marquee>
    </div>
  </div>

  <!-- 帳戶 -->
  <div class="d-flex align-items-center justify-content-center mb-5">
    <!-- <span class="text-white me-5 fs-4">帳戶: {{ this.memberAccount }}</span> -->
    <span class="text-white me-5 text-start"
      ><span class="fs-4"
        >剩餘抽獎次數: <span class="drawNums_style">{{ this.drawNum }}</span></span
      >
      <br />(若卡在抽獎過程,刷新不減抽獎次數！</span
    >
    <button class="button-72 me-2" @click="inputCode()">輸入序號</button>
    <button class="button-73" @click="inputCode()">抽獎紀錄</button>
  </div>

  <div class="mb-5 d-flex flex-column align-items-center">
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

  <el-dialog class="drawModel_style" v-model="dialogFormVisible" title="抽獎序號驗證" width="40%" center>
    <el-form :model="getDrawNums">
      <el-form-item label="抽獎驗證碼:" class="codeForm_style">
        <el-input class="codeInput_style" v-model="getDrawNums.code" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button class="cancelBtn" color="#a3a3a3" @click="dialogFormVisible = false">取消</el-button>
        <el-button class="verifyBtn" color="#c71e2d" @click="doVarify()">認證</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
// import SwiperCarousel from '../components/Swiper/Carousel.vue';
// import _ from 'lodash';
import borderImg from '../assets/backGround/zp2_bg.png';
import startBtn from '../assets/backGround/startBtn.png';
import selectBtn from '../assets/backGround/zp3_btn2.png';
import coinImg from '../assets/backGround/goldCoin.png';
import coinBag from '../assets/backGround/goldcoins_bag.png';
import greenBag from '../assets/backGround/greenBag.png';
import treasureImg from '../assets/backGround/treasure.png';

export default {
  components: {
    // SwiperCarousel,
  },

  data() {
    return {
      // 驗證碼
      getDrawNums: {
        code: '',
      },
      // 驗證表單
      dialogFormVisible: false,
      // 抽獎驗證碼表單
      getCode_Form: {
        code: '',
      },
      // 使用者帳戶(測試用)
      memberAccount: 'frank',
      // 剩餘抽獎次數(測試用)
      drawNum: 0,
      // 暫存抽獎次數
      storedDrawNums: 0,
      // 最新消息列表(測試用)
      translate_News: [
        { memberID: '12345', money: 1000 },
        { memberID: '13579', money: 2000 },
        { memberID: '24688', money: 3000 },
      ],
      // 返回獎項索引值
      prizeIndex: 0,
      // 獎項名稱
      prizeName: '禮金8888',
      lotteryMsg: '',
      blocks: [{ padding: '55px', background: '#869cfa', imgs: [{ src: borderImg, width: '100%', rotate: true }] }],
      prizes: [
        // 0
        {
          background: '#ee95a9',
          imgs: [{ src: coinImg, width: '20%', top: '60%' }],
          fonts: [
            {
              text: '禮金500',
              fontSize: '24px',
              top: '30%',
              fontWeight: '600',
            },
          ],
        },
        // 1
        {
          background: '#c98ef4',
          imgs: [{ src: coinImg, width: '20%', top: '60%' }],
          fonts: [
            {
              text: '禮金2000',
              fontSize: '24px',
              top: '30%',
              fontWeight: '600',
            },
          ],
        },
        // 2
        {
          background: '#ee95a9',
          imgs: [{ src: coinBag, width: '40%', top: '40%' }],
          fonts: [
            {
              text: '禮金35000',
              fontSize: '24px',
              top: '30%',
              fontWeight: '600',
            },
          ],
        },
        // 3
        {
          background: '#c98ef4',
          imgs: [{ src: coinImg, width: '20%', top: '60%' }],
          fonts: [
            {
              text: '禮金550',
              fontSize: '24px',
              top: '30%',
              fontWeight: '600',
            },
          ],
        },
        // 4
        {
          background: '#ee95a9',
          imgs: [{ src: treasureImg, width: '40%', top: '55%' }],
          fonts: [
            {
              text: '禮金60000',
              fontSize: '24px',
              top: '30%',
              fontWeight: '600',
            },
          ],
        },
        // 5
        {
          background: '#c98ef4',
          imgs: [{ src: coinImg, width: '20%', top: '60%' }],
          fonts: [
            {
              text: '禮金2500',
              fontSize: '24px',
              top: '30%',
              fontWeight: '600',
            },
          ],
        },
        // 6
        {
          background: '#ee95a9',
          imgs: [{ src: coinImg, width: '20%', top: '60%' }],
          fonts: [
            {
              text: '禮金1500',
              fontSize: '24px',
              top: '30%',
              fontWeight: '600',
            },
          ],
        },
        // 7
        {
          background: '#c98ef4',
          imgs: [{ src: greenBag, width: '40%', top: '55%' }],
          fonts: [
            {
              text: '禮金5000',
              fontSize: '24px',
              top: '30%',
              fontWeight: '600',
            },
          ],
        },
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
      this.$http.post('/users/drawing', this.getDrawNums).then((res) => {
        if (res.data.code === 200) {
          // this.$swal.fire('抽獎成功', `恭喜獲取 :${res.data.data.award}`, 'success');
          this.drawNum = res.data.data.count;
          this.prizeIndex = res.data.data.award;
          localStorage.setItem('storedDrawNums', JSON.stringify(this.drawNum));
          this.dialogFormVisible = false;
        } else {
          this.$swal.fire('抽獎失敗', `${res.data.msg}`, 'error');
        }
      });
    },
    // 確認驗證碼
    doVarify() {
      // api
      this.$http.post('/users/startLottery', this.getDrawNums).then((res) => {
        if (res.data.code === 200) {
          this.drawNum = res.data.count;
          this.$swal.fire('輸入成功', `${res.data.msg}`, 'success');
          this.dialogFormVisible = false;
          localStorage.setItem('storedDrawNums', JSON.stringify(this.drawNum));
        } else {
          this.$swal.fire('輸入失敗', `${res.data.msg}`, 'error');
        }
      });

      // test
      // if (this.getCode_Form.code !== '') {
      //   this.$swal.fire('驗證成功', '驗證成功', 'success');
      //   this.dialogFormVisible = false;
      //   this.drawNum = 7;
      // } else {
      //   this.$swal.fire('驗證失敗', '驗證失敗', 'error');
      // }
      this.getCode_Form.code = '';
    },
    reloadSavedForm() {
      // 使用JSON.parse()將LocalStorange中的資料轉回可利用的object
      const stored = JSON.parse(localStorage.getItem('storedDrawNums'));
      console.log(stored);
      if (stored !== null) {
        this.drawNum = stored;
      }
    },
    // 点击抽奖按钮会触发star回调
    startCallback() {
      if (this.drawNum === 0) {
        this.dialogFormVisible = true;
      }
      if (this.drawNum > 0) {
        this.postLottery();
        // 调用抽奖组件的play方法开始游戏
        this.$refs.myLucky.play();
        // 模拟调用接口异步抽奖
        setTimeout(() => {
          // 假设后端返回的中奖索引是0
          // const index = 0;

          // 调用stop停止旋转并传递中奖索引
          this.$refs.myLucky.stop(this.prizeIndex);
        }, 3000);
      }
    },
    // 抽奖结束会触发end回调
    endCallback(prize) {
      console.log(prize);
      if (this.prizeIndex !== '') {
        this.$swal.fire('抽獎成功', `恭喜獲取 :${this.prizes[this.prizeIndex].fonts[0].text}`, 'success');
      }
    },
    // 輸入序號彈窗
    inputCode() {
      this.dialogFormVisible = true;
    },
  },
  created() {
    // this.postLottery();
    this.reloadSavedForm();
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
  --el-input-focus-border-color: #f082ac;
  // padding: 10px 200px;
  // & :deep(.el-input__inner) {
  //   padding: 25px 0 25px 0px;
  //   // border-radius: 50px;
  // }
  & :deep(.el-input__wrapper) {
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    background: #eee;
    // padding-left: 10px;
  }
  & :deep(.el-input-group__prepend) {
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }
}

// 取消按鈕
.cancelBtn {
  color: #fff;
  font-weight: bold;
  padding: 20px;
  font-size: 25px;
}
// 驗證按鈕
.verifyBtn {
  color: #fff;
  font-weight: bold;
  padding: 20px;
  font-size: 25px;
}
.marquee_style {
  width: 700px;
  margin: auto;
  position: relative;
  & .borderStyle {
    max-width: 700px;
    width: 100%;
    height: 55px;
    // margin: 20px 0 23px 65px;
    background: transparent;
    border: 3px solid #ffa1a1;
    border-radius: 25px;
    padding-left: 100px;
  }
}
// 廣播樣式
.boadcast_style {
  width: 207px;
  width: 200px;
  position: absolute;
  left: -70px;
  top: -80px;
  bottom: 0;
}
// 抽獎次數文字樣式
.drawNums_style {
  color: rgb(255, 243, 14);
  font-weight: bold;
  font-size: 30px;
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

.codeForm_style {
  display: block;
  & .el-form-item__label {
    font-size: 18px !important;
  }
}

/*輸入序號Btn CSS */
.button-72 {
  align-items: center;
  background-color: initial;
  background-image: linear-gradient(rgba(179, 132, 201, 0.84), rgba(119, 71, 181, 0.84) 50%);
  border-radius: 42px;
  border-width: 0;
  box-shadow: rgba(57, 31, 91, 0.24) 0 2px 2px, rgba(179, 132, 201, 0.4) 0 8px 12px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  font-family: Quicksand, sans-serif;
  font-size: 18px;
  font-weight: 700;
  justify-content: center;
  letter-spacing: 0.04em;
  line-height: 16px;
  margin: 0;
  padding: 18px 18px;
  text-align: center;
  text-decoration: none;
  text-shadow: rgba(255, 255, 255, 0.4) 0 0 4px, rgba(255, 255, 255, 0.2) 0 0 12px, rgba(57, 31, 91, 0.6) 1px 1px 4px, rgba(57, 31, 91, 0.32) 4px 4px 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
}

.button-72:hover {
  background-image: linear-gradient(#b384c9, #391f5b 50%);
  transition: 0.5ms;
}

@media (min-width: 768px) {
  .button-72 {
    font-size: 21px;
    padding: 18px 34px;
  }
}
/*歷史紀錄Btn CSS */
.button-73 {
  align-items: center;
  background-color: initial;
  background-image: linear-gradient(90deg, rgba(238, 149, 179, 1) 0%, rgba(199, 30, 45, 0.770920868347339), rgba(71, 1, 15, 0.8073354341736695) 100%);
  border-radius: 42px;
  border-width: 0;
  box-shadow: rgba(57, 31, 91, 0.24) 0 2px 2px, rgba(179, 132, 201, 0.4) 0 8px 12px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  font-family: Quicksand, sans-serif;
  font-size: 18px;
  font-weight: 700;
  justify-content: center;
  letter-spacing: 0.04em;
  line-height: 16px;
  margin: 0;
  padding: 18px 18px;
  text-align: center;
  text-decoration: none;
  text-shadow: rgba(255, 255, 255, 0.4) 0 0 4px, rgba(255, 255, 255, 0.2) 0 0 12px, rgba(59, 5, 13, 1) 56% 1px 1px 4px, rgba(129, 15, 25, 0.770920868347339) 4px 4px 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
}

.button-73:hover {
  background-image: linear-gradient(#b384c9, #3b050d 50%);
  transition: 0.5ms;
}

@media (min-width: 768px) {
  .button-73 {
    font-size: 21px;
    padding: 18px 34px;
  }
}
</style>
