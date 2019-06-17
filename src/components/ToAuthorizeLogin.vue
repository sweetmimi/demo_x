<template>
  <div class="bgc">

    <!-- <div class="loading"
         v-if="!infoData">Loading....
    </div> -->
    <!-- <div class="top-tips"
         style="background: none;color: #999;">Mohon verifikasi menggunakan data asli Anda.</div> -->
    <van-notice-bar mode="closeable" style="background: none;color: #999;">Mohon verifikasi menggunakan data asli Anda.</van-notice-bar>

    <div class='login_fun_div'>

      <div class='login_fun_inp'>
        <span class='left'>
          <i><img src="../assets/toauth_img4.png"
                 alt=""></i>

          <input type="tel"
                 v-model="mobile"
                 :disabled=showVerCode
                 :placeholder=accountText></span>

        <span class='codebtn'
              v-show="showGetCode"
              @click="tosendcode"
              v-if="codeflag">Kode Verifikasi</span>
        <span class='codebtn'
              v-else>{{times}} s</span>
      </div>

      <div class="br"></div>

      <div class='login_fun_inp'>
        <span class='left'><i>
            <img v-if="!showGetCode"
                 src="../assets/toauth_img9.png"
                 alt="">
            <img v-else
                 src="../assets/toauth_img5.png"
                 alt="">
          </i>
          <input :type='showGetCode?"text":"password"'
                 v-model="smscode"
                 :disabled=showVerCode
                 :placeholder=passWordText>
        </span>
      </div>

      <div class="br"
           v-show="showVerCode"></div>

      <div class='login_fun_inp'
           v-show="showVerCode">
        <span class='left'><i><img src="../assets/toauth_img5.png"
                 alt=""></i>
          <input type="text"
                 v-model="vercode"
                 placeholder="Verification code">
        </span>
      </div>

    </div>

    <div class="confirm-rule">
      <label for="checkboxFlag">
        <input type="checkbox"
               id="checkboxFlag"
               v-model="checkboxFlag"
               style="display:none">
        <i :class="[checkboxFlag?'active':'']"
           style="top: -2px;">
          <img src="../assets/toauth_img7.png"
               width="100%"
               alt=""
               style="display: block;"
               v-if="checkboxFlag">
        </i>
        Agree to
      </label>
      <span @click="showTextFun()">Otorisasi dan Perjanjian Penggunaan Data</span>
    </div>

    <div class="sub-btn-out"
         @click="tosubmit">
      <span class="sub-btn"
            v-if="mobile&&smscode&&checkboxFlag&&!showVerCode">Lanjut</span>
      <span class="sub-btn"
            v-else-if="mobile&&smscode&&checkboxFlag&&showVerCode&&vercode">Lanjut</span>
      <span class="sub-btn"
            v-else
            style="background: #ccc;">Lanjut</span>
    </div>

    <div style="font-size: 12px; color: #aaa;margin-top: -10px; padding: 0px 20px;text-align: center;margin-bottom: 20px;">Informasi hanya di pakai untuk verifikasi, kami menjamin kerahasiaan data Anda.</div>

    <x-dialog v-model="textPopTag"
              dialog-transition
              :dialog-style="{'max-width': '95%', width: '100%', height: '90%'}">
      <div class="xiyi-title">
        <!-- <p>{{infoData.url_desc}}</p> -->
        <p style="text-align: center">Perjanjian pinjaman Tunai</p>
        <i @click="textPopTag=false"
           class="iconfont icon-cuowu"></i>
      </div>
      <div style="height: 90%;overflow-x: scroll;">
        <!-- <iframe :src="infoData.url"
                style="width:100%;height:100%"
                frameborder="0"></iframe> -->
        <ToAuthorizeRule></ToAuthorizeRule>
      </div>
    </x-dialog>

  </div>
</template>



<script>
import { XDialog, Confirm } from "vux";
import axios_spider from '../request/index_spider'
import ToAuthorizeRule from './ToAuthorizeRule'
const vm = {
  name: "ToAuthorizeLogin",
  components: {
    XDialog,
    ToAuthorizeRule,
    Confirm
  },
  data() {
    return {
      infoData: '',

      accountText: '',
      passWordText: '',

      times: 120,
      codeflag: true,

      mobile: '',
      smscode: '',
      vercode: '',
      taskid: '',

      checkboxFlag: false,

      textPopTag: false,

      showGetCode: true,
      showVerCode: false,
    };
  },

  created() {

    this.toPageView()

  },
  mounted() {

    // 退出提示
    try {
      Cashcash.doShowBack(true, 'Hanya 1 tahap verifikasi lagi, yakin keluar?');
    } catch (e) {
      try {
        Cashcash.doShowBack(true)
      } catch (error) {

      }
    }
  },
  methods: {

    toPageView() {
      let authid = this.$route.query.authid;
      let html_type = this.$route.query.html_type;
      if (authid == 2001 || html_type == '0') {
        this.accountText = 'Nomor telepon';
        this.passWordText = 'Verification code';
      } else if (authid == 4001 || html_type == '1') {
        this.accountText = 'Nomor ponsel';
        this.passWordText = 'Kata sandi';
        this.showGetCode = false;
      } else {
        this.accountText = 'Telkomsel / XL / Indosat';
        this.passWordText = 'Verification code';
      }

      gtag('event', `toauthorize_login_${this.$route.query.authid}`, {
        value: 1,
      });
    },


    // 消息提示
    showmsg(msg) {
      this.$vux.toast.show({
        text: msg,
        type: "text",
        position: "middle",
        width: "80%"
      });
    },

    // 协议弹窗
    showTextFun() {
      this.textPopTag = true;
    },


    async tosendcode() {
      gtag('event', `toauthorize_login_${this.$route.query.authid}_tosendcode`, {
        value: 1,
      });
      if (!this.mobile) {
        this.showmsg('Ketik no. ponsel')
        return
      }
      if (!/^[0-9]*$/g.test(this.mobile)) {
        this.showmsg('Nomor ponsel salah')
        return
      }
      if (!/^[0][8][0-9]{6,11}$/g.test(this.mobile)) {
        this.showmsg('Hanya berlaku untuk Telkomsel, XL, Indosat')
        return
      }
      this.$vux.loading.show({ text: "Loading" });
      let info = await axios_spider.post('/talang-v1/send-sms', {
        account: this.mobile,
        auth_code: this.$route.query.authid,

        // userid: this.$route.query.user_id, // 测试userid
      })
      this.$vux.loading.hide()
      if (info && info.code === 0) {
        this.showmsg('Berhasil Dikirim');
        this.codeflag = false;
        let timer = setInterval(() => {
          this.times--;
          if (this.times < 1) {
            clearInterval(timer)
            this.codeflag = true;
            this.times = 120;
          }
        }, 1000)
      } else {
        this.showmsg('' + info.code + info.message)
      }

    },


    async tosubmit() {
      if (!this.mobile) {
        this.showmsg('Silakan ketik nomor ponsel dan kode verifikasi Anda, lalu kirim')
        return
      }
      // if (!/^[0-9]*$/g.test(this.mobile)) {
      //   this.showmsg('Nomor ponsel salah')
      //   return
      // }
      // if (!/^[0][8][0-9]{6,11}$/g.test(this.mobile)) {
      //   this.showmsg('Hanya berlaku untuk Telkomsel, XL, Indosat')
      //   return
      // }
      if (!this.smscode || this.showVerCode && !this.vercode) {
        this.showmsg('Silakan ketik nomor akun dan kata sandi Anda, lalu kirim')
        return
      }

      gtag('event', `toauthorize_login_${this.$route.query.authid}_phonecode`, {
        value: 1,
      });  // 输入验证码和手机号提交人数
      if (!this.checkboxFlag) {
        this.showmsg('Mohon baca dan centang sebagai persetujuan, lalu kirim')
        return
      }

      this.$vux.loading.show({ text: "Otorisasi" });
      let info = await axios_spider.post("/talang-v1/auth-login", {
        account: this.mobile,
        auth_code: this.$route.query.authid,
        password: this.smscode,

        code: this.vercode,
        task_id: this.taskid,
        // userid: this.$route.query.user_id, // 测试userid
      });
      this.$vux.loading.hide();
      if (info.code === 0) {
        this.$vux.toast.show({
          text: 'Otorisasi berhasil'
        })
        gtag('event', `toauthorize_login_${this.$route.query.authid}_success`, {
          value: 1,
        });  // 成功统计
        this.$router.replace({
          path: '/ToAuthorize',
          query: {
            order_no: this.$route.query.order_no || '',

            // user_id: this.$route.query.user_id // 测试userid
          }
        });
      }
      //akulaku 需要输入验证码
      if (info.code === 30003) {
        this.showVerCode = true;
        this.taskid = info.data.task_id;
      }
      else {
        gtag('event', `toauthorize_login_${this.$route.query.authid}_faild`, {
          value: 1,
        }); // 失败统计
        // this.showmsg('' + info.code + info.message)
        // setTimeout(() => {
        this.$vux.toast.show({
          text: 'Otorisasi gagal',
          type: 'cancel',
          time: 2000
        })
        // }, 2000);
      }
    },
  }
};
export default vm;
</script>
<style scoped>
body,
html,
#app,
.bgc {
  height: auto;
}
.bgc {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  min-height: 100%;
}
.confirm-rule {
  width: auto;
  margin-right: 10px;
  margin-left: 32px;
  text-align: left;
  margin-top: 15px;
}
.confirm-rule label i.active::after {
  display: none;
}
.confirm-rule label i.active {
  border-color: #3cc374;
}
.login_fun_div {
  background-color: #fff;
  padding: 0px 10px;
}
.login_fun_inp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
}
.login_fun_inp .left {
  display: flex;
  align-items: center;
  flex: 1;
}

.login_fun_inp .left i {
  width: 18px;
  display: block;
}
.login_fun_inp .left i img {
  width: 100%;
  display: block;
}
.login_fun_inp .left input {
  border: none;
  height: 40px;
  margin-left: 10px;
  outline: none;
  width: 100%;
  font-size: 16px;
}
.login_fun_inp .left input::placeholder {
  font-size: 14px;
  color: #999;
}
</style>

