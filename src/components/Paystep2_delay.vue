<template>
  <div class="bgc">
    <div class="loading"
         v-if="!infoData">Loading....</div>
    <!-- <div class="top-tips">Jumlah yang harus dibayarkan saat ini, segera perpanjang waktu</div> -->
    <van-notice-bar  mode="closeable">Jumlah yang harus dibayarkan saat ini, segera perpanjang waktu</van-notice-bar>

    <div class='show_more'
         @click="showmore1=!showmore1"
         :class="showmore1?'step-mid-info-actve':''">
      <div class='paydelay_num'>
        <span>Bayar sekarang</span>
        <span class='righttext'>
          <i class='righttext1'>Rp {{infoData.amount}}</i>
          <i class="right-iconstyle iconfont icon-youjiantou"></i>
        </span>
      </div>

      <div class="step-mid-info"
           style="margin: 0;overflow: hidden;">
        <div class="br"></div>
        <div class="info-list">
          <li>
            <i class="left">Waktu</i>
            <i class="right">{{infoData.start_time}}--{{infoData.end_time}}</i>
          </li>
          <li>
            <i class="left">Bunga</i>
            <i class="right">Rp {{infoData.interest_amount}}</i>
          </li>
          <li>
            <i class="left">Biaya Administrasi</i>
            <i class="right">Rp {{infoData.admin_amount}}</i>
          </li>
          <li v-if="infoData.expiry_amount">
            <i class="left">Jumlah biaya</i>
            <i class="right">Rp {{infoData.expiry_amount}}</i>
          </li>
          <li>
            <i class="left">Total</i>
            <i class="right">Rp {{infoData.amount}}</i>
          </li>
        </div>
      </div>
    </div>

    <div class="step-mid-info">
      <div class="info-list">
        <li>
          <i class="left">Pembayaran Tertunda</i>
          <i class="right">Rp {{infoData.loan_amount}} <i style="visibility: hidden;"
               class=" right-iconstyle iconfont icon-youjiantou"></i></i>
        </li>
        <li>
          <i class="left">Tanggal jatuh tempo</i>
          <i class="right">{{infoData.expiry_time}} <i style="visibility: hidden;"
               class=" right-iconstyle iconfont icon-youjiantou"></i></i>
        </li>
        <li>
          <i class="left">Penambahan waktu</i>
          <i class="right right-delay-select">
            <popup-picker style="position: absolute;text-align: right; left: 10px;right: 10px;     z-index: 9;"
                          value-text-align="right"
                          :data="tremvalArr"
                          cancel-text="Batal"
                          confirm-text="Konfirmasi"
                          v-model="tremval"
                          @on-change="getDataPage(1)"
                          show-name></popup-picker><i style="z-index: 4;"
               class=" right-iconstyle iconfont icon-youjiantou"></i>
          </i>
        </li>

        <div class='show_more'
             @click="showmore2=!showmore2"
             :class="showmore2?'step-mid-info-actve':''">
          <li>
            <i class="left">Total pembayaran</i>
            <i class="right">Rp {{infoData.repay_amount}}<i class=" right-iconstyle iconfont icon-youjiantou"></i></i>
          </li>
          <div class="step-mid-info"
               style="margin: 0;overflow: hidden;padding: 0px;">
            <div class="br"></div>
            <div class="info-list">
              <li>
                <i class="left">Pembayaran Tertunda</i>
                <i class="right">Rp {{infoData.loan_amount}}</i>
              </li>

              <li>
                <i class="left">Bunga</i>
                <i class="right">Rp {{infoData.interest_amount}}</i>
              </li>

              <li>
                <i class="left">Biaya Administrasi</i>
                <i class="right">Rp {{infoData.admin_amount}}</i>
              </li>

              <li>
                <i class="left">Total pembayaran</i>
                <i class="right">Rp {{infoData.repay_amount}}</i>
              </li>
            </div>
            <div class="br"></div>
          </div>
        </div>

        <router-link :to='{path:"/Paydelaylist",query:{order_no:$route.query.order_no}}'
                     tag='li'>
          <i class="left">Catatan penundaan (max.{{infoData.delay_total_num}})</i>
          <i class="right">{{infoData.delay_num}} Waktu<i class=" right-iconstyle iconfont icon-youjiantou"></i></i>
        </router-link>

      </div>
    </div>

    <div class="sub-btn-out">
      <span class="sub-btn"
            @click="toSubmit()">
        Hanya Bayar Rp {{infoData.amount}}
      </span>
    </div>

    <BottomTips></BottomTips>
    <!-- <Kefuicon></Kefuicon> -->

    <!-- pop -->
    <!-- <div class=''
         v-transfer-dom>
      <popup v-model="show1"
             is-transparent>
        <div class="popup1"
             style="width: 95%;background-color:#fff;margin:10px auto;border-radius:5px;overflow: hidden;">

          <div class="step-mid-info"
               style="margin: 0">
            <div class="info-list">

              <li v-if="show1kind===2">
                <i class="left">Jumlah penundaan pembayaran</i>
                <i class="right">Rp {{infoData.loan_amount}}</i>
              </li>

              <li v-if="show1kind===1">
                <i class="left">Waktu</i>
                <i class="right">{{infoData.start_time}}--{{infoData.end_time}}</i>
              </li>
              <li>
                <i class="left">Bunga</i>
                <i class="right">{{infoData.interest_amount}}</i>
              </li>
              <li>
                <i class="left">Biaya Administrasi</i>
                <i class="right">{{infoData.admin_amount}}</i>
              </li>
              <li v-if="infoData.expiry_amount&&show1kind===1">
                <i class="left">Jumlah biaya</i>
                <i class="right">Rp {{infoData.expiry_amount}}</i>
              </li>
              <li v-if="show1kind===1">
                <i class="left">Total</i>
                <i class="right">{{infoData.amount}}</i>
              </li>

              <li v-if="show1kind===2">
                <i class="left">Total pembayaran</i>
                <i class="right">{{infoData.repay_amount}}</i>
              </li>

            </div>
          </div>

          <div class="sub-btn-out"
               style="margin-top: 20px">
            <span class="sub-btn"
                  @click="show1=false">
              Saya Mengerti
            </span>
          </div>

        </div>
      </popup>

    </div> -->

  </div>
</template>

<script>
import { TransferDom, PopupPicker, Popup } from "vux";
export default {
  name: 'paydelay',
  components: {
    PopupPicker,
    Popup
  },
  directives: {
    TransferDom
  },
  props: {},
  data() {
    return {
      infoData: '',
      dayUnit: ["", "Hari", "Bulan", "Tahun"],

      show1: false,
      show1kind: 1,
      tremval: [],
      tremvalArr: [],

      showmore1: false,
      showmore2: false,

    }
  },
  created() {
    this.getDataPage()
  },
  mounted() { },
  watch: {},
  computed: {},
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

    async toSubmit() {
      let data = {};
      data = this.infoData;
      let info = await this.axios.post("/order/delay-confirmation", data);
      if (info.code === 0) {
        this.$router.replace({
          path: "/PayStep3",
          query: {
            order_no: this.infoData.order_no,
            repay_amount: this.infoData.amount,
            status: this.infoData.status,
            delay_term: this.tremval[0],
            request_type: 2
          }
        });
      } else {
        this.showmsg(info.code + info.message);
      }

    },

    // showpop(n) {
    //   this.show1 = true;
    //   this.show1kind = n;
    // },

    async getDataPage(name) {
      let data = {}
      if (name === 1) {
        data.delay_term = this.tremval[0]
        data.term_unit = this.infoData.term_unit
      }
      data.order_no = this.$route.query.order_no;
      console.log(data)
      let info = await this.axios.post("/order/delay-details-info", data);
      if (info.code === 0) {
        this.tremvalArr = [];
        this.infoData = info.data;
        this.tremval = [info.data.delay_term.default_value]
        let cc = [];
        info.data.delay_term.delay_list.forEach(e => {
          cc.push({ value: e, name: `${e} ${this.dayUnit[info.data.term_unit]}` })
        });
        this.tremvalArr.push(cc)
      } else {
        this.showmsg(info.code + info.message);
      }
    },

  },
}
</script>
<style  scoped>
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
.show_more .step-mid-info {
  height: 0;
  transform: translateY(-20%);
  transition: all 0.5s ease-out;
}
.step-mid-info-actve .step-mid-info {
  height: auto;
  transform: translateY(0%);
}
/* .show_more .right-iconstyle {
  transform: rotate(90deg);
  right: -4px;
} */
.step-mid-info-actve .right-iconstyle {
  transform: rotate(90deg);
  right: -4px;
}
</style>
