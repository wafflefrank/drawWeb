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
              <h4 class="card-title text-start fw-bold">註冊 <span class="text-success">|</span></h4>
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
            <el-form ref="addBank_Form" :model="regist_Form" :rules="rules">
              <el-form-item class="input_style" prop="account">
                <el-input class="addInfo_style mt-3" v-model="regist_Form.account" placeholder="請輸入帳號" prop="account">
                  <template #prepend><i class="fa-solid fa-user fs-5 ms-1"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item class="input_style" prop="pwd">
                <el-input class="addInfo_style mt-3" v-model="regist_Form.pwd" placeholder="請輸入密碼" type="password">
                  <template #prepend><i class="fa-solid fa-lock fs-5 ms-1"></i></template>
                </el-input>
              </el-form-item>
            </el-form>
            <div class="d-flex justify-content-center mt-5">
              <el-button @click="goLogin()" round class="py-4" color="#909399" plain>已有帳號，去登入</el-button>
              <el-button color="#faa30d" :disabled="regist_Form.account && regist_Form.pwd === ''" round class="next_able px-5 py-4" @input="handleEmpty()"
                >下一步</el-button
              >
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
      regist_Form: {
        account: '',
        pwd: '',
      },
      // 新增銀行卡規則
      rules: {
        // 銀行選項
        bank_code: [
          //   {
          //     type: 'number',
          //     validator: checkBet_value, // 驗證質押金額範圍
          //     trigger: 'blur',
          //     // message: '委託金額需大於0,不可超過可用餘額',
          //   },
          {
            required: true,
            message: '請選擇一項銀行',
            trigger: 'change',
          },
        ],
        // 帳戶
        account: [
          {
            required: true,
            message: '會員帳戶必須填寫',
            trigger: 'blur',
          },
        ],
        // 銀行姓名
        pwd: [
          {
            required: true,
            message: '會員密碼必須填寫',
            trigger: 'blur',
          },
        ],
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
    // 跳轉登入頁
    goLogin() {
      this.$router.push('/login');
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
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    padding-left: 10px;
  }
  & :deep(.el-input-group__prepend) {
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
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
</style>
<style lang="scss">
.input_style {
  // display: block;
  width: 500px;
  & .el-form-item__error {
    left: 13%;
  }
}
</style>
