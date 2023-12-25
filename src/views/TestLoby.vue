<template>
  <div class="game-status">
    <div class="toggle" @click="isToggle = !isToggle" @keydown="isToggle = !isToggle"></div>
    <transition name="slide-fade">
      <div class="status-container" v-if="isToggle">
        <div class="times">
          CHANCE <span>{{ time_remaining }}</span>
        </div>
        <div class="buttons">
          <button class="btn btn-primary" :class="{ active: current_year === 2017 }" @click="setCurrentYear(2017)">2017</button>
          <button class="btn btn-primary" :class="{ active: current_year === 2018 }" @click="setCurrentYear(2018)">2018</button>
          <button class="btn btn-secondary" @click="restart">Restart</button>
        </div>
      </div>
    </transition>
  </div>

  <div class="lucky-wheel">
    <div class="pointer-container">
      <!-- pointer -->
      <div
        class="pointer"
        ref="pointer"
        id="pointer"
        :style="{ transform: rotate_deg, transition: prize_transition }"
        @click="rotateHandler(num)"
        @keyup="rotateHandler(num)"
      ></div>
    </div>
    <!-- lucky wheel -->
    <div :class="containerClass">
      <div v-for="item in prizes" :key="item.name" ref="item" :class="itemClass">
        <div :class="contentClass">
          <i class="material-icons">
            {{ item.icon }}
          </i>
          <span
            >{{ item.name }}
            <span :class="countClass">{{ item.count }}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- display results -->
    <transition name="slide-fade">
      <div class="prize" v-if="isShow == isClicked">
        <div class="prize-container">
          <div class="prize-title">well...DONE!</div>
          <div class="prize-title">
            YOU GET A FREE...
            <span class="prize-item">{{ prize_name }}</span>
          </div>
          <div class="prize-background">
            <!-- <template v-for="(this.prizeIcon, index) in 9">
              <i class="material-icons">
                {{ this.prize_icon }}
              </i>
            </template> -->
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  components: {
    // SwiperCarousel,
  },

  data() {
    return {
      prizes: [],
      prizes_2017: [],
      prizes_2018: [],
      prize_name: '',
      prize_icon: '',
      prize_rotate: [],
      prize_transition: '',
      each_deg: 0,
      rotate_deg: 0,
      start_deg: 0,
      current_deg: 0,
      index: 0,
      current_year: 2017,
      duration: 3000,
      time_remaining: 20,
      num: 0,
      numbers: [], // 紀錄還有獎品的編號
      isToggle: false, // 顯示隱藏按鈕
      isClicked: false, // 轉動中禁止觸發
      isShow: true,
      i: '',
    };
  },
  computed: {
    // 判斷轉盤 class
    containerClass() {
      return this.current_year === 2017 ? 'container' : 'container container-large';
    },
    itemClass() {
      return this.current_year === 2017 ? 'item item-skew' : 'item item-skew-large';
    },
    contentClass() {
      return this.current_year === 2017 ? 'item-content' : 'item-content item-content-large';
    },
    countClass() {
      return this.current_year === 2017 ? 'count' : 'count count-large';
    },
  },
  methods: {
    prizeActive() {
      // 抽到獎品後變更 item 的 css
      setTimeout(() => {
        this.$refs.item[this.index].classList.value = `${this.itemClass} active`;
      }, this.duration);
      console.log('item active');
    },
    setCurrentYear(year) {
      if (this.isClicked) return;
      this.current_year = year;
    },
    restart() {
      this.$refs.item[this.index].classList.value = this.itemClass;
      if (this.current_year === 2017) {
        this.time_remaining = 20;
        this.reset();
        this.initPrize();
      } else if (this.current_year === 2018) {
        this.time_remaining = 120;
        this.reset();
        this.initPrize_2018();
      }
    },
    reset() {
      this.isShow = true;
      this.index = 0;
      this.prize_name = '';
      this.prize_icon = '';
      this.prize_rotate = [];
      this.numbers = [];
      this.start_deg = 0;
      this.rotate_deg = 'rotate(0deg)';
      this.current_deg = 0;
      this.isClicked = false;
      this.prize_transition = 'none';
      console.log('RESET');
    },
    initPrize() {
      this.prizes_2017 = [
        {
          name: 'Wish',
          icon: 'cake',
          count: 5,
        },
        {
          name: 'Anything',
          icon: 'stars',
          count: 5,
        },
        {
          name: 'Child',
          icon: 'child_care',
          count: 4,
        },
        {
          name: 'Flight',
          icon: ' flight',
          count: 1,
        },
        {
          name: 'Wifi',
          icon: 'wifi',
          count: 5,
        },
        {
          name: 'Movie',
          icon: 'movie_filter',
          count: 0,
        },
      ];
      this.num = this.prizes_2017.length;
      this.degree(this.num);
      this.prizes = this.prizes_2017;
      this.numberArray();
    },
    initPrize_2018() {
      this.prizes_2018 = [];
      for (this.i = 1; this.i <= 120; this.i += 1) {
        const item = {};
        if (this.i === 1) {
          item.name = 1;
          item.count = 1;
          this.prizes_2018.push(item);
        } else if (this.i > 1 && this.i <= 16) {
          item.name = this.i;
          item.count = 1;
          this.prizes_2018.push(item);
        } else if (this.i === 17) {
          item.name = this.i;
          item.count = 5;
          this.prizes_2018.push(item);
        } else if (this.i === 18) {
          item.name = this.i;
          item.count = 10;
          this.prizes_2018.push(item);
        } else if (this.i === 19) {
          item.name = this.i;
          item.count = 20;
          this.prizes_2018.push(item);
        } else if (this.i === 20) {
          item.name = this.i;
          item.count = 69;
          this.prizes_2018.push(item);
        }
      }
      this.num = this.prizes_2018.length;
      this.prizes = this.prizes_2018;
      this.degree(this.num);
      this.numberArray();
    },
    degree(num) {
      // 計算每個轉盤角度

      for (this.i = 1; this.i <= num; this.i += 1) {
        const deg = 360 / num;
        this.each_deg = deg;
        const eachDeg = this.i * deg;
        this.prize_rotate.push(eachDeg);
      }
    },
    numberArray() {
      // 產生獎品 index 編號 => [0,1,2,3,4,5]

      this.numbers = this.prizes.map((prize, index) => index);
    },
    rotateHandler(num) {
      // 刪去沒有獎品的 index
      this.prizes.filter((prize, index) => {
        if (prize.count <= 0) {
          const filterArray = this.numbers.filter(() => num !== index);
          this.numbers = filterArray;
        }
        return this.numbers;
      });

      if (this.time_remaining > 0) {
        this.$refs.item[this.index].classList.value = this.itemClass;
        // 執行旋轉
        this.prize_draw(num);
      } else if (this.time_remaining <= 0) {
        this.$refs.item[this.index].classList.value = this.itemClass;
        this.restart();
      }
    },
    prize_draw(num) {
      // 執行抽獎
      console.log(num);
      if (this.isClicked) return;
      this.isShow = this.isClicked;

      // 移除抽到獎品 active 狀態
      this.$refs.item[this.index].classList.value = this.itemClass;

      // 取出 0-5之間隨機整數
      this.index = this.numbers[Math.floor(Math.random() * this.numbers.length)];
      console.log('1.剩餘牌號', this.numbers);

      // 預先旋轉四圈
      const circle = 4;
      const degree = this.start_deg + circle * 360 + this.prize_rotate[this.index] - (this.start_deg % 360);
      // degree=初始角度 + 旋轉4圈 + 獎品旋轉角度[隨機數] - 餘數

      // 將初始角度 start_deg:0度 = 旋轉後的角度 degree，下次執行從當下角度開始
      this.start_deg = degree;
      // 綁定旋轉角度到指針
      //   this.current_year === 2017 ? (this.rotate_deg = `rotate(${degree}deg)`) : (this.rotate_deg = `rotate(${degree - this.each_deg / 2}deg)`);

      this.prize_transition = `all ${this.duration / 1000}s cubic-bezier(0.42, 0, 0.2, 0.91)`;
      this.time_remaining -= 1;
      this.isClicked = true;

      // 取當下開始角度的餘數，與輪盤角度比對(除錯用)

      //   const remainder = this.start_deg % 360;
      //   if (remainder <= 0) {
      //     // 為了不產生負數或0，加360
      //     this.current_year === 2017 ? (this.current_deg = remainder + 360) : (this.current_deg = remainder + 360 - this.each_deg / 2);
      //   } else if (remainder > 0) {
      //     this.current_year === 2017 ? (this.current_deg = remainder) : (this.current_deg = remainder - this.each_deg / 2);
      //   }
      console.log('2.執行旋轉', degree, 'index', this.index);

      // 將this.index設為抽中獎品索引數，獎品抽完的索引數將不再出現，直到獎品全數抽完，重新 RESET
      const prize = this.prizes[this.index];
      this.prize_name = prize.name;
      this.prize_icon = prize.icon;
      if (this.current_year === 2018) {
        this.prize_icon = 'card_giftcard';
      }
      this.prizeActive();
      setTimeout(() => {
        prize.count -= 1;
        console.log('3.旋轉角度:', this.current_deg, '獎品:', prize.name, '剩餘數量:', prize.count, ' index', this.index);
      }, this.duration);

      // 點選動畫結束後，將"已點選"改回"未點選"
      setTimeout(() => {
        if (this.isClicked === true) {
          this.isClicked = false;
        }
      }, this.duration);
    },
  },
  mounted() {
    this.initPrize();
  },
  watch: {
    current_year: {
      handler: 'restart',
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343baa;
$primary-color-dark: #1f1172;
$secondary-color: #f0beff;
$access-color: #ff00ba;
$duration: 3s;

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

[v-cloak] {
  display: none !important;
}

// #app {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   overflow: hidden;
//   font-family: 'Roboto Condensed', sans-serif;
//   position: relative;
//   background-color: #5858b9;
//   user-select: none;
// }

.status-container {
  position: relative;
  left: 100px;
}

.toggle {
  display: flex;
  background-image: url('https://raw.githubusercontent.com/HuiyuLiz/vue-lucky-wheel/306abe15b78c71c3cd25ed8eaf97554101fd405e/svg/toggle.svg');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100px;
  height: 120px;
  position: absolute;
  left: calc;
  top: -3%;
  transition: all 0.3s ease-in;
  filter: drop-shadow(-3px 5px 0px $primary-color);
  cursor: pointer;

  &:hover {
    transform: rotate(360deg) scale(0.8);
  }
}

.game-status {
  position: absolute;
  left: 2%;
  top: 4%;
  font-size: 2rem;
  color: $secondary-color;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  margin: 0 auto;
  flex-direction: column-reverse;
  font-weight: 700;
  text-transform: uppercase;
  width: 250px;
  height: 600px;
}

button:focus {
  outline: 0;
}

.times {
  font-size: 2.5rem;
  line-height: 0.9;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 5px 0px;
  position: relative;
  color: $primary-color-dark;

  &::after {
    position: absolute;
    content: 'x';
    font-size: 2.3rem;
    font-weight: normal;
    left: 150px;
    top: 3px;
    color: $secondary-color;
  }

  > span {
    text-align: right;
    color: $primary-color-dark;
    margin-left: 40px;
  }
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.btn {
  cursor: pointer;
  font-family: 'Roboto Condensed', sans-serif;
  width: 100px;
  padding: 5px 10px;
  margin: 10px 5px;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s;

  &.btn-primary {
    border: 3px solid #1f1172;
    color: $secondary-color;
    background-color: $primary-color;
  }

  &.active {
    border: 3px solid $access-color;
    color: $access-color;
    background-color: $primary-color-dark;
  }

  &.btn-secondary {
    border: 3px solid #1f1172;
    color: $primary-color;
    background-color: $secondary-color;

    &:hover {
      border: 3px solid $secondary-color;
      color: $secondary-color;
      background-color: $primary-color-dark;
    }
  }
}

.lucky-wheel {
  display: flex;
  width: 550px;
  height: 550px;
  border-radius: 550px;
  justify-content: center;
  align-items: center;
  z-index: 3;

  &::after {
    content: '';
    width: 540px;
    height: 549px;
    background-image: url('https://raw.githubusercontent.com/HuiyuLiz/vue-lucky-wheel/306abe15b78c71c3cd25ed8eaf97554101fd405e/svg/wheel-outside.svg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
  }

  .container {
    display: block;
    width: 520px;
    height: 520px;
    border-radius: 520px;
    overflow: hidden;
    position: relative;
    transform: rotate(-30deg);

    &.container-large {
      transform: rotate(-18deg);
    }
  }
}

.pointer-container {
  display: flex;
  width: 128px;
  height: 208px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  position: absolute;
  color: $access-color;
  font-size: 2rem;

  &::after {
    display: block;
    content: 'PRESS';
    width: 120px;
    height: 120px;
    border-radius: 120px;
    background-color: #1f1172;
    line-height: 120px;
    text-align: center;
    font-weight: bold;
  }

  .pointer {
    width: 128px;
    height: 208px;
    display: block;
    background-image: url('https://raw.githubusercontent.com/HuiyuLiz/vue-lucky-wheel/306abe15b78c71c3cd25ed8eaf97554101fd405e/svg/hand.svg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 39.7px;
    transform-origin: 64px 144px;
    cursor: pointer;
  }
}

.item {
  position: absolute;
  display: flex;
  width: 50%;
  height: 50%;
  border: 1px solid #1f1172;
  top: 0;
  right: 0;
  transform-origin: 0% 100%;
  justify-content: center;
  align-items: center;
}

//$n:輪盤數量；$deg每個項目角度
$n: 6;
// $i: 10;

@for $i from 1 through $n {
  $deg: 360deg / $n;

  .item-skew:nth-child(#{$i}) {
    transform: rotate($deg * $i) skewY($deg - 90);
  }
}

$num: 20;

@for $i from 1 through $num {
  $deg: 360deg / $num;

  .item-skew-large:nth-child(#{$i}) {
    transform: rotate($deg * $i) skewY($deg - 90);
  }
}

.item-content {
  display: flex;
  width: 100px;
  align-items: center;
  flex-direction: column;
  font-size: 2rem;
  font-weight: bold;
  transform-origin: center center;
  // 16輪盤
  transform: skewY(30deg) rotate(30deg) translate(-95px, 62px);
  position: absolute;
  right: 0;
  bottom: 0;

  &.item-content-large {
    // 20輪盤
    transform: skewY(72deg) rotate(9deg) translate(-22px, -10px);
    position: absolute;
    left: 0;
    top: 200px;
  }

  .count {
    position: absolute;
    left: 28px;
    top: 112px;
    font-size: 1.2rem;
    text-align: center;
    width: 45px;
    line-height: 25px;
    border-radius: 30px;
    display: block;

    &.count-large {
      left: 39px;
      top: 40px;
      font-size: 1rem;
      width: 25px;
      line-height: 25px;
      border-radius: 25px;
    }
  }

  > i {
    font-size: 4rem;
  }
}

.item:nth-child(odd) {
  background-color: $primary-color;

  .item-content {
    color: $secondary-color;
  }

  .count {
    color: $primary-color;
    background-color: $secondary-color;
  }
}

.item:nth-child(even) {
  background-color: $secondary-color;

  .item-content {
    color: $primary-color;
  }

  .count {
    color: $secondary-color;
    background-color: $primary-color;
  }
}

.item {
  &.active {
    background-color: $access-color;
    transition: 0.2s ease-in;

    .item-content {
      color: white;
      transition: 0.2s ease-in;
    }
  }
}

.prize {
  display: flex;
  position: absolute;
  width: 100%;
  height: 237px;
  background-color: $primary-color;
  overflow: hidden;
  z-index: -5;

  .prize-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1280px;
    margin: 0 auto;
    position: relative;
  }

  .prize-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 25%;
    height: 157px;
    font-size: 72px;
    color: white;
    font-weight: bold;
    padding-left: 11%;
    z-index: 999;
  }

  .prize-title:nth-child(2) {
    width: 26%;
    padding-left: 0px;
    font-size: 32px;
  }

  .prize-item {
    font-size: 72px;
    color: $access-color;
    text-decoration: underline;
  }
}

.prize-background {
  width: 1280px;
  height: 237px;
  position: absolute;

  i {
    font-size: 4rem;
    color: #22299b;
    position: absolute;
  }

  i:nth-child(1) {
    bottom: 30px;
    left: -40px;
    transform: rotate(0deg);
  }

  i:nth-child(2) {
    top: 40px;
    left: 30px;
    transform: rotate(20deg);
  }

  i:nth-child(3) {
    bottom: -40px;
    left: 130px;
    transform: rotate(-20deg);
  }

  i:nth-child(4) {
    top: -25px;
    left: 270px;
    transform: rotate(-30deg);
  }

  i:nth-child(5) {
    bottom: 20px;
    left: 340px;
    transform: rotate(0deg);
  }

  i:nth-child(6) {
    top: -20px;
    right: 300px;
    transform: rotate(0deg);
  }

  i:nth-child(7) {
    bottom: -35px;
    right: 260px;
    transform: rotate(40deg);
  }

  i:nth-child(8) {
    bottom: 35px;
    right: 50px;
    transform: rotate(-20deg);
  }

  i:nth-child(9) {
    top: 10px;
    right: -25px;
    transform: rotate(20deg);
  }
}

@for $i from 1 through 9 {
  $size: random(100) + 100;

  .prize-background i:nth-child(odd) {
    animation: move 3s alternate infinite ease-in-out;
    animation-delay: $i * 0.2s;
  }

  .prize-background i:nth-child(even) {
    animation: move 2s alternate-reverse infinite ease-in-out;
  }
}

// @keyframes move {
//   @for $i from 1 through 9 {
//     #{($i*10)}% {
//       transform: rotate((random(10) * 1deg)) scale(random(1) * 0.8);
//     }
//   }
// }

.slide-fade-enter-active {
  transition: all 1s ease;
  transition-delay: ($duration - 1) s;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
