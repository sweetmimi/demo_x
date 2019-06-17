<template>
  <div class="bgc">
    <div class="loading"
         v-if="!infoData">Loading....</div>
    <!-- <div class="top-tips">Selesaikan pembayaran. penundaan pembayaran berhenti</div> -->
    <van-notice-bar  mode="closeable">Selesaikan pembayaran. penundaan pembayaran berhenti</van-notice-bar>

    <div class='paydelay_num'>
      <span>Bayar sekarang</span>
      <span class='righttext'>
        <i class='righttext1'>Rp {{infoData.amount}}</i>
        <i style="visibility: hidden;"
           class=" right-iconstyle iconfont icon-youjiantou"></i>
      </span>
    </div>
    <div class="step-mid-info">
      <div class="info-list">
        <li>
          <i class="left">Pembayaran setelah penundaan</i>
          <i class="right">Rp {{infoData.delay_amount}} <i style="visibility: hidden;"
               class=" right-iconstyle iconfont icon-youjiantou"></i></i>
        </li>
        <li>
          <i class="left">Tanggal jatuh tempo baru</i>
          <i class="right">{{infoData.delay_time}} <i style="visibility: hidden;"
               class=" right-iconstyle iconfont icon-youjiantou"></i></i>
        </li>
        <li>
          <i class="left">Penambahan waktu</i>
          <i class="right">
            {{infoData.delay_term}} {{dayUnit[infoData.delay_unit]}}
            <i style="visibility: hidden;"
               class=" right-iconstyle iconfont icon-youjiantou"></i>
          </i>
        </li>
        <!-- <li>
          <i class="left">总还款</i>
          <i class="right">Rp {{infoData.repay_amount}}<i style="visibility: hidden;"
               class=" right-iconstyle iconfont icon-youjiantou"></i></i>
        </li> -->

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

      // show1: false,
      // show1kind: 1,
      // tremval: [],
      // tremvalArr: []

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

      this.$router.replace({
        path: "/PayStep3",
        query: {
          order_no: this.infoData.order_no,
          repay_amount: this.infoData.amount,
          // status: this.infoData.status,
          delay_term: this.infoData.delay_term,
          request_type: 2
        }
      });

      // let data = {};
      // data = this.infoData;
      // let info = await this.axios.post("/order/delay-confirmation", data);
      // if (info.code === 0) {

      // } else {
      //   this.showmsg(info.code + info.message);
      // }

    },

    showpop(n) {
      this.show1 = true;
      this.show1kind = n;
    },

    async getDataPage(name) {
      let data = {}
      // if (name === 1) {
      //   data.delay_term = this.tremval[0]
      //   data.term_unit = this.infoData.term_unit
      // }
      data.order_no = this.$route.query.order_no;
      data.delay_pay_status = this.$route.query.delay_pay_status;
      let info = await this.axios.post("/order/delay-confirmation-details", data);
      if (info.code === 0) {
        this.infoData = info.data
      } else {
        this.showmsg(info.code + info.message);
      }
    },

  },
}
</script>
<style  scoped>
</style>
