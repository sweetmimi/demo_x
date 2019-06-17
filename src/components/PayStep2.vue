<template>
  <div class="bgc">
    <div class="loading"
         v-if="!infoData">Loading....</div>
    <!-- <div class="top-tips" v-if="infoData.status==170">Pinjam di Cashcash, bisa dapat voucher bebas bunga</div> -->

    <!--使用免息券借款的订单，放款成功详情页增加按时还款奖励说明-->
    <div v-if="infoData.status==170">
    <van-notice-bar v-if="infoData.coupon.text" mode="closeable">Anda telah meminjam kupon bebas bunga dan Anda dapat membayar bunga tepat waktu.</van-notice-bar>
    <van-notice-bar v-else mode="closeable">Bayar sekarang dan dapatkan Voucher bebas bunga.</van-notice-bar>

      <!-- <div class="top-tips"
           v-if="infoData.coupon.text">Anda telah meminjam kupon bebas bunga dan Anda dapat membayar bunga tepat waktu.</div>
      <div class="top-tips"
           v-else>Bayar sekarang dan dapatkan Voucher bebas bunga</div> -->
    </div>
    <van-notice-bar v-if="infoData.status==180" mode="closeable">{{infoData.expiry_message||'Bayar sekarang, dapat kesempatan raih Pinjaman Tanpa Pengembalian'}}</van-notice-bar>
    <van-notice-bar v-if="infoData.status==200" mode="closeable">Pinjaman berikutnya langsung cair !</van-notice-bar>
    
    <!-- <div class="top-tips"
         v-if="infoData.status==180"
         style="color: #f00">{{infoData.expiry_message||'Bayar sekarang, dapat kesempatan raih Pinjaman Tanpa Pengembalian'}}</div>
    <div class="top-tips"
         v-if="infoData.status==200">Pinjaman berikutnya langsung cair !</div> -->
    <div class="pay-num-info"
         :class="[infoData.status==180 ? 'pay-num-info-yq':'',infoData.status==200 ? 'pay-num-info-success':'']">
      <p v-if="infoData.status==200">Telah Dibayar</p>
      <p v-else>Pembayaran Aktual</p>

      <h2>Rp {{infoData.repay_amount||0}}</h2>

      <span v-if="infoData.status==180">Status:Keterlambatan Sudah {{infoData.overdue_day||0}} Hari</span>

      <span v-if="infoData.status==200&&infoData.coupon"
            style=" font-size: 14px;">
        <p style="    text-align: center;margin-bottom: 5px;">
          <i style="    font-style: normal;text-decoration: line-through;color: #afafaf;">{{infoData.coupon.value}}</i>
        </p>
        {{infoData.coupon.text}}
      </span>

      <span v-if="infoData.status==170"
            style="text-align: center;">Status:Belum Dilunasi
        <p style="color: #999; margin-top: 8px;font-size: 14px;"
           v-if="infoData.coupon">
          {{infoData.coupon.text}}
          <i style="color: #ff8000;font-style: normal;">{{infoData.coupon.value}}</i>
        </p>
      </span>
    </div>

    <div class="step-mid-info">
      <!-- <div class="title">informasi pinjaman</div>
      <div class="br"></div>-->
      <div class="info-list">
        <li>
          <i class="left">Jumlah pinjaman</i>
          <i class="right">Rp {{infoData.loan_amount}}</i>
        </li>

        <li>
          <i class="left">Durasi pinjaman</i>
          <i class="right">{{infoData.loan_term}} {{dayUnit[infoData.term_unit]}}</i>
        </li>

        <li>
          <i class="left">Tanggal Pembayaran</i>
          <i class>{{infoData.expiry_time}}</i>
        </li>

        <li>
          <!-- <i class="left">Bunga({{infoData.interest_rate||0}}%)</i> -->
          <i class="left">Bunga</i>
          <i class="right">Rp {{infoData.interest_amount||0}}</i>
        </li>

        <li>
          <i class="left">Biaya administrasi</i>
          <i class="right">Rp {{infoData.admin_amount||0}}</i>
        </li>

        <li v-if="infoData.expiry_amount">
          <i class="left">Denda keterlambatan</i>
          <i class="right">Rp {{infoData.expiry_amount}}</i>
        </li>

        <router-link v-if="infoData.delay_info"
                     :to='{path:"/Paydelaylist",query:{order_no:$route.query.order_no}}'
                     tag='li'>

          <i class="left">Pembayaran (max.{{infoData.delay_info.delay_total_num}})</i>
          <i class="right">{{infoData.delay_info.delay_num}} Waktu<i class=" right-iconstyle iconfont icon-youjiantou"></i></i>

        </router-link>

      </div>
    </div>

    <div class="step-mid-voucher"
         v-if="(infoData.award&&infoData.award.is_popup>0&&showcair)||(infoData.award&&infoData.award.enter)"
         :class="[showcair?'step-mid-voucher-active':'']"
         @click="toProductLoan(infoData.award.coupon_appid)">

      <span class="left"
            v-if="infoData.award&&(infoData.award.coupon_appid)">
        <i class
           :class="[showcair?'scale-active':'',(infoData.award&&infoData.award.enter)?'scale-normal':'']">
          <img src="/static/images/v_icon1.png"
               height="100%"
               alt>
        </i>
        <p>Pinjam lagi pakai voucher</p>
      </span>

      <span class="left"
            v-if="infoData.award&&(!infoData.award.coupon_appid)">
        <i class
           :class="[showcair?'scale-active':'',(infoData.award&&infoData.award.enter)?'scale-normal':'']">
          <img src="/static/images/v_icon2.png"
               height="100%"
               alt>
        </i>
        <p>Ambil Voucher bebas bunga</p>
      </span>

      <i class="right iconfont icon-youjiantou right-active"></i>
    </div>

    <div class="step-mid-voucher"
         v-if="infoData.status==180"
         @click="toRecommendLoanPage()">
      <span class="left">
        <i class="scale-normal">
          <img src="/static/images/v_icon3.png"
               height="100%"
               alt>
        </i>
        <p>Dapatkan lebih banyak pinjaman</p>
      </span>
      <i class="right iconfont icon-youjiantou"></i>
    </div>

    <div class="sub-btn-out"
         v-if="infoData.status==180||infoData.status==170||infoData.status==175">
      <span class="sub-btn"
            v-if="infoData.repay_status===1"
            style="background: #ccc;"
            @click="showmsg('Anda belum bisa bayar dikarenakan belum tiba masa jatuh tempo.')">Belum Saatnya Pembayaran</span>

      <span v-else
            style="display: flex;height: 40px;">

        <span class="sub-btn"
              v-if="infoData.delay_status===0&&infoData.delay_pay_status===0"
              style="background: #ccc;"
              @click="showmsg('Ajuan tunda pembayaran diterima, lakukan pembayaran awal')">Bayar Pinjaman</span>

        <span class="sub-btn"
              v-else
              @click="tourl()">Bayar Pinjaman</span>

        <span class="sub-btn-line"
              v-if="infoData.delay_status===1"
              style=" margin-left: 15px;"
              @click="tourl('delay')">Tunda</span>

        <span class="sub-btn-line"
              v-if="infoData.delay_status===0&&infoData.delay_pay_status===0"
              style=" margin-left: 15px;"
              @click="tourl('delaying')">Tunda</span>

        <!-- <span class="sub-btn-line"
              v-if="infoData.delay_status===0"
              style=" margin-left: 15px;"
              @click="tourl('delaying')">Tunda</span> -->

      </span>

    </div>

    <!--结清状态，在接一笔-->
    <div class="sub-btn-out"
         v-if="infoData.status==200"
         @click="toLoanPage(infoData.appid)">
      <span class="sub-btn">Pinjam lagi dana segera cair</span>
    </div>

    <BottomTips></BottomTips>
    <!-- <Kefuicon></Kefuicon> -->

    <div class="mask"
         v-if="infoData.award&&infoData.award.is_popup>0&&!showcair"></div>
    <div class="mask-msg"
         v-if="infoData.award&&infoData.award.is_popup>0"
         @click="tocoupon(infoData.award.is_popup*1)"
         :class="[toscale ? 'toscale':'']">
      <img v-if="infoData.status==200"
           :src="`/static/images/voucher_img_${infoData.award.is_popup}0_1.png`"
           width="100%"
           alt>
      <img v-else
           :src="`/static/images/voucher_img_${infoData.award.is_popup}0.png`"
           width="100%"
           alt>
    </div>

    <!--到选填页面 -->
    <div class="confirm-kap confirm-kapover">
      <confirm v-model="topageflag"
               :show-confirm-button="false"
               :show-cancel-button="false"
               hide-on-blur
               @on-hide="topageflag=false">
        <div class="confirm-kapdiv">
          <span style="display: block;width: 35%;margin: 0 auto;margin-top: -50px;">
            <img v-if="infoData.delay_pay_status===1"
                 src="/static/images/delay_success_icon.png"
                 width="100%"
                 alt>
            <img v-if="infoData.delay_pay_status===2"
                 src="/static/images/delay_fail_icon.png"
                 width="100%"
                 alt>
            <!-- <em>Selamat, info pinjaman
              <br>sudah lengkap.
            </em> -->
          </span>
          <p v-if="infoData.delay_pay_status===0">
            Selama pameran
          </p>
          <p v-if="infoData.delay_pay_status===1">
            <!-- //成功-->
            Pengajuan penundaan pembayaran berhasil, waktu pembayaran telah diperpanjang
          </p>
          <p v-if="infoData.delay_pay_status===2">
            <!-- //失败-->
            Maaf, pengajuan penundaan pembayaran gagal. Mohon coba lagi
          </p>
          <span class="sub-btn"
                style="    border-radius: 50px;    margin-bottom: 20px;"
                @click="topageflag=false">Saya Mengerti</span>
        </div>
      </confirm>
    </div>

  </div>
</template>
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

.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 998;
  background: rgba(0, 0, 0, 0.6);
}
.mask-msg {
  position: absolute;
  z-index: 999;
  width: 100%;
  max-width: 280px;
  transform-origin: 0 100%;

  top: 50%;
  left: 50%;
  transform: scale(1) translate(-50%, -50%);
}

.toscale {
  animation: toscale 2s 1 forwards cubic-bezier(0.68, 0.25, 0.35, 1.2);
}

@keyframes toscale {
  0% {
    top: 50%;
    left: 50%;
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
  20% {
    opacity: 1;
    transform: scale(0.7) translate(-40%, -180%);
  }
  /* 40% {
    opacity: 1;
    transform: scale(0.6) translate(-30%, -80%);
  }
  60% {
    opacity: 1;
    transform: scale(0.4) translate(-20%, -60%);
  }
  80% {
    opacity: 1;
    transform: scale(0.2) translate(-10%, -40%);
  } */
  90% {
    opacity: 1;
  }

  100% {
    top: 18%;
    left: 3%;
    opacity: 0;
    transform: scale(0) translate(0%, 0%);
  }
}
.step-mid-voucher {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #ffffff;
  margin-top: -10px;
}
.step-mid-voucher-active {
  margin-top: -10px;
  /* transition: all 1s linear; */
}
.step-mid-voucher .left {
  display: flex;
  align-items: center;
}
.step-mid-voucher .left i {
  display: block;
  height: 45px;
  transform: scale(0);
}
.step-mid-voucher .left i.scale-normal {
  transform: scale(1);
}
.scale-active {
  animation: scale-1 1s 2s 1 forwards cubic-bezier(0.68, 0.25, 0.35, 1.2);
}
@keyframes scale-1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.step-mid-voucher .left p {
  font-size: 16px;
  color: #333;
  margin-left: 10px;
}
.step-mid-voucher .right {
  font-size: 25px;
  color: #c8c8c8;
  position: relative;
  top: 1px;
  right: -7px;
}
.right-active {
  animation: right-1 1s infinite backwards cubic-bezier(0.68, 0.25, 0.35, 1.2);
}
@keyframes right-1 {
  0% {
    right: 20px;
    opacity: 0;
  }
  100% {
    right: -8px;
    opacity: 1;
  }
}
</style>

<script>
import { Confirm } from "vux";

export default {
  name: "Step",
  components: {
    Confirm
  },

  data() {
    return {
      infoData: "",
      dayUnit: ["", "Hari", "Bulan", "Tahun"],


      toscale: false,

      showcair: false,

      topageflag: false

    };
  },

  created() {
    // if (this.$route.query.type == 1) {
    //   location.href = `Cashcash://Cashcashclient/openapp?loan_type=2&order_no=${
    //     this.$route.query.order_no
    //   }&appid=${this.$route.query.appid}`;
    //   return;
    // }
    this.getDataPage();
    try {
      Cashcash.eventTrack('Repay_view');
    } catch (e) {
    }
  },
  mounted() { },
  methods: {
    // 消息提示
    showmsg(msg) {
      this.$vux.toast.show({
        text: msg,
        type: "text",
        position: "middle",
        width: "80%"
      });
    },
    async getDataPage() {
      let info = await this.axios.post("/order/get-repay-plan", {
        order_no: this.$route.query.order_no
      });
      if (info.code === 0) {
        this.infoData = info.data;
        console.log(info.data)
        if (this.infoData.delay_pay_status) {
          let cc = parseInt(localStorage.getItem(`${this.infoData.order_no}-${this.infoData.delay_info.delay_num}dealypopp`) || 0) + 1
          localStorage.setItem(`${this.infoData.order_no}-${this.infoData.delay_info.delay_num}dealypopp`, cc);
          if (localStorage.getItem(`${this.infoData.order_no}-${this.infoData.delay_info.delay_num}dealypopp`) < 2) {
            this.topageflag = true
          }
        }
      } else {
        this.$vux.toast.show({ text: info.code + info.message, type: "text" });
      }
      this.$vux.loading.hide();
    },


    async tocoupon(type) {
      this.$vux.loading.show()
      if (type === 1) {
        gtag('event', 'lottery_page_ticket_10', {
          value: 1,
        });
      }
      if (type === 2) {
        gtag('event', 'lottery_page_ticket_20', {
          value: 1,
        });
      }
      if (type === 3) {
        gtag('event', 'lottery_page_ticket_30', {
          value: 1,
        });
      }
      if (type === 4) {
        gtag('event', 'lottery_page_ticket_turn', {
          value: 1,
        });
      }
      if (0 < type && type < 4) {
        let info = await this.axios.post("/order/add-coupon", {
          coupon_id: this.infoData.award.coupon_id,
          coupon_appid: this.infoData.award.coupon_appid, // 跳转借款页 appid
          voucher_appid: this.infoData.award.voucher_appid || '', // 特定优惠券 appid 当为通用券得时候没有值
        });
        if (info.code === 0) {
          this.$vux.loading.hide();
          this.toscale = true;
          this.showcair = true
        } else {
          this.$vux.loading.hide();
          this.$vux.toast.show({ text: info.code, type: "text" });
        }
      } else {
        this.$vux.loading.hide();
        this.toscale = true;
        this.showcair = true
      }
    },
//跳转免息券
    toProductLoan(coupon_appid) {
      if (!coupon_appid) {
        let name = location.origin
        location.href = `${name}/loss_activity`
        return;
      }
      this.toMyCouponPage()
    },

    //跳转我的免息券
    toMyCouponPage() {
      try {
        if (typeof eval(Cashcash.startMyCouponRecord) == "function") {
          Cashcash.startMyCouponRecord();
        }
      } catch (e) {
        this.showmsg("Versi anda sekarang versi rendah, tidak bisa menggunakan fitur memilih nomor dari kontak");
      }
    },

    //跳转推荐机构借款页面（不推荐机构本身）
    async toRecommendLoanPage() {
      this.$vux.loading.show({ text: "Loading" });
      let info = await this.axios.post("/featured-product/shop-window", { order_no: this.infoData.order_no, page_path: 'order_reject' });
      try {
        if (info.code === 0 && info.data) {
          this.$vux.loading.hide();
          this.toLoanPage(info.data[1].appid);
        } else {
          this.$vux.loading.hide();
          this.$vux.toast.show({ text: `${info.code}${info.message}`, type: "text" });
        }
      } catch (e) {
        this.$vux.loading.hide();
      }
    },

    //跳转借款页面
    toLoanPage(appid) {
      try {
        if (typeof eval(Cashcash.startProductLoan) == "function") {
          Cashcash.startProductLoan(appid + '');
        }
      } catch (e) {
        alert("Versi anda sekarang versi rendah, tidak bisa menggunakan fitur memilih nomor dari kontak");
      }
    },

    tohappywheel() {
      let name = location.origin
      location.href = `${name}/loss_activity`
      // alert(name)
      // alert(name == 'loan.luno.id')
      // if (name == 'devloan.luno.id') {
      //   location.href = 'http://devshare.luno.id/happywheel_voucher'
      // }
      // if (name == 'testloan.luno.id') {
      //   location.href = 'http://testshare.luno.id/happywheel_voucher'
      // }
      // if (name == 'loan.luno.id') {
      //   location.href = 'http://share.luno.id/happywheel_voucher'
      // }
    },

    tourl(name) {
      // 埋点统计上报
      try {
        Cashcash.eventTrack('Repay_next_click');
      } catch (e) {

      }
      if (name === 'delay') {
        this.$router.push({
          path: "/Paydelay",
          query: {
            order_no: this.infoData.order_no,
            // repay_amount: this.infoData.repay_amount,
            // status: this.infoData.status
          }
        });
        return
      }
      if (name === 'delaying') {
        this.$router.push({
          path: "/Paydelaying",
          query: {
            order_no: this.infoData.order_no,
            delay_pay_status: this.infoData.delay_pay_status,
            // status: this.infoData.status
          }
        });
        return
      }
      this.$router.push({
        path: "/PayStep3",
        query: {
          order_no: this.infoData.order_no,
          repay_amount: this.infoData.repay_amount,
          status: this.infoData.status
        }
      });
    }
  }
  // methods end
};
</script>
