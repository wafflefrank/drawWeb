<template>
  <div v-if="isRouterAlive" class="d-flex align-items-center justify-content-center" style="margin-top: 300px">
    <div class="card mb-3" style="max-width: 1024px">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="../assets/regist/soccer.jpg" class="rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <!-- 關閉紐 -->
          <i class="fa-solid fa-xmark fs-3 text-end w-100 px-4 py-3" @click="closeRegist()" @keydown="closeRegist()"></i>
          <div class="card-body px-5">
            <div class="d-flex justify-content-between">
              <h4 class="card-title text-start fw-bold">登入<span class="text-success">|</span></h4>
              <!-- 語言選擇 -->
              <el-dropdown class="me-4" trigger="click">
                <span class="el-dropdown-link text-white d-flex">
                  <img :src="imgSrc" alt="#" class="language_chooseImg me-2" />
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="tw_version()"
                      ><img src="../assets/flag/zh_TW.jpeg" alt="#" class="language_img me-2" /><span>{{ this.$t('Traditional_Chinese') }}</span></el-dropdown-item
                    >
                    <el-dropdown-item @click="cn_version()"
                      ><img src="../assets/flag/zh_CN.jpeg" alt="#" class="language_img me-2" /><span>{{ this.$t('Simplified_Chinese') }}</span></el-dropdown-item
                    >
                    <el-dropdown-item @click="en_version()"
                      ><img src="../assets/flag/en_US.jpeg" alt="#" class="language_img me-2" /><span>{{ this.$t('English') }}</span></el-dropdown-item
                    >
                    <el-dropdown-item @click="vn_version()"
                      ><img src="../assets/flag/vi_VN.jpeg" alt="#" class="language_img me-2" /><span>{{ this.$t('Vietnamese') }}</span></el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <el-input class="addInfo_style mt-3" v-model="login_Form.phone" placeholder="請輸入手機號碼">
              <template #prepend>
                <div class="w-100">
                  <!-- <i class="fa-solid fa-lock fs-5 ms-1"></i> -->
                  <el-select class="chooseBank_style" v-model="login_Form.country" style="width: 115px">
                    <template #prefix>
                      <i class="fa-solid fa-mobile-screen-button fs-5 ms-2"></i>
                    </template>
                    <el-option label="+86中國" value="1" />
                    <el-option label="+81日本" value="2" />
                    <el-option label="+852香港" value="3" />
                  </el-select>
                </div>
              </template>
            </el-input>
            <el-input class="addInfo_style mt-3" v-model="login_Form.pwd" placeholder="請輸入密碼" type="password">
              <template #prepend><i class="fa-solid fa-lock fs-5 ms-1"></i></template>
            </el-input>
            <div class="d-flex flex-column">
              <el-button round class="py-4 mt-4 mb-3" color="#909399" plain>登入</el-button>
              <el-button color="#faa30d" :disabled="login_Form.phone && regist_Form.pwd === ''" round class="next_able py-4" @input="handleEmpty()">註冊</el-button>
            </div>

            <p class="card-text mt-3"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TW from '../assets/flag/zh_TW.jpeg';
import CN from '../assets/flag/zh_CN.jpeg';
import EN from '../assets/flag/en_US.jpeg';
import VN from '../assets/flag/vi_VN.jpeg';

export default {
  data() {
    return {
      // 圖片來源
      imgSrc: TW,
      isRouterAlive: true,
      // 註冊表單
      login_Form: {
        country: '+886',
        phone: '',
        pwd: '',
      },
      isEmpty: true,
    };
  },
  methods: {
    closeRegist() {
      this.$router.push('/');
    },
    // 中文版
    tw_version() {
      this.reloadRegist();
      this.$i18n.locale = 'tw';
      this.imgSrc = TW;
    },
    // 簡體中文
    cn_version() {
      this.reloadRegist();
      this.$i18n.locale = 'cn';
      this.imgSrc = CN;
    },
    // 英文版
    en_version() {
      this.reloadRegist();
      this.$i18n.locale = 'en';
      this.imgSrc = EN;
    },
    // 越南版
    vn_version() {
      this.reloadRegist();
      this.$i18n.locale = 'vn';
      this.imgSrc = VN;
    },
    // 畫面重新整理
    reloadRegist() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    // 切換顯示樣式
    handleEmpty() {
      if (this.regist_Form.account && this.regist_Form.pwd !== '') {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  & img {
    // object-fit: contain;
    background-size: cover;
    width: 300px;
    height: auto;
    display: block;
    border-radius: 10px;
    box-shadow: 1px 1px 3px 1px #e7e3e334;
  }
  .language_chooseImg {
    width: 30px;
    height: 20px;
    border-radius: 0px;
  }
}
.language_img {
  width: 30px;
  height: 20px;
}
.el-icon--right svg {
  color: black;
}
// 表單框樣式
.addInfo_style {
  width: 100%;
  --el-input-focus-border-color: #faa30d;
  & :deep(.el-input__inner) {
    padding: 25px 0 25px 0px;
    // border-radius: 50px;
  }
  & :deep(.el-input__wrapper) {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    padding-left: 10px;
  }
  & :deep(.el-input-group__prepend) {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    // border: none !important;
    & .el-input__wrapper {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      background-color: white;
    }
  }
}
.next_able {
  background: #faa30d;
  color: rgb(243, 239, 239);
  font-weight: bold;
}
.next_able.is-disabled {
  background: #dcdcde;
  color: #959597;
  border: 1px solid #dcdcde;
}
.el-button + .el-button {
  margin-left: 0;
}
</style>
