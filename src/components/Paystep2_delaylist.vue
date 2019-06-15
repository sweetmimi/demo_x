<template>
  <div class="bgc">
    <div class="loading" v-if="!infoData">Loading....</div>
    <!-- <div class="top-tips">Maksimal pengajuan penundaan pembayaran 5x</div> -->
    <van-notice-bar mode="closeable">Maksimal pengajuan penundaan pembayaran 5x.</van-notice-bar>

    <div v-if="infoData.delay_list&&infoData.delay_list.length>0">
      <div class="step-mid-info" v-for="(item,n) in infoData.delay_list" :key="n">
        <div class="title" style="    display: flex;
    justify-content: space-between;">
          <span v-if="item.num===1" class="left">Pembayaran pertama</span>
          <span v-if="item.num===2" class="left">Pembayaran kedua</span>
          <span v-if="item.num===3" class="left">Pembayaran ketiga</span>
          <span v-if="item.num===4" class="left">Pembayaran keempat</span>
          <span v-if="item.num===5" class="left">Pembayaran kelima</span>
        </div>
        <div class="br"></div>

        <div class="info-list">
          <li>
            <i class="left">Pembayaran tertunda</i>
            <i class="right">Rp {{item.loan_amount}}</i>
          </li>
          <li>
            <i class="left">Penambahan waktu</i>
            <i class="right">{{item.delay_term}} Hair</i>
          </li>
          <li>
            <i class="left">Biaya penundaan</i>
            <i class="right">Rp {{item.amount}}</i>
          </li>
          <li>
            <i class="left">Tanggal jatuh tempo baru</i>
            <i class="right">{{item.pay_time}}</i>
          </li>
        </div>
      </div>
    </div>
    <div v-else style="
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #858585;">
      <div>
        <img src="/static/images/nodata_icon.png" alt>
      </div>Tidak ada data
    </div>
  </div>
</template>

<script>
export default {
  name: "delaylist",
  components: {},
  props: {},
  data() {
    return {
      infoData: ""
    };
  },
  created() {
    this.getDataPage();
  },
  mounted() {},
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

    async getDataPage() {
      let info = await this.axios.post("/order/order-delay-list", {
        order_no: this.$route.query.order_no
      });
      if (info.code === 0) {
        this.infoData = info.data;
      } else {
        this.showmsg(info.code + info.message);
      }
    }
  }
};
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
</style>
