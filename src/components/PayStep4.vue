<template>
  <div class="bgc"
       style="position: relative;">
    <div class="loading"
         v-if="!infoData">Loading....</div>
    <!-- <div class="top-tips">Bayar sekarang dan dapatkan Voucher bebas bunga</div> -->
    <van-notice-bar mode="closeable">Bayar sekarang dan dapatkan Voucher bebas bunga.</van-notice-bar>

    <div class="pay-info-topnav"
         v-if="this.$route.query.repay_type==1">
      <li v-for="(item,index) in infoData.tab"
          :key="index"
          @click="tochangeKind(item.class)"
          :class="[$route.query.tkind==item.class ? 'select':'']">{{item.name}}</li>

      <!-- <li @click="tochangeKind(1)" :class="[this.$route.query.tkind==1||!this.$route.query.tkind ? 'select':'']" >ATM</li>
        <li @click="tochangeKind(2)" :class="[this.$route.query.tkind==2 ? 'select':'']">ONLINE</li>
      <li @click="tochangeKind(3)" :class="[this.$route.query.tkind==3 ? 'select':'']">M-BANKING</li>-->
      <span :style="{left: ((this.$route.query.tkind-1)*33.33+5.65) + '%'}"></span>
    </div>

    <div class="pay-info-desc"
         v-if="this.$route.query.repay_type==2&&infoData.desc">
      <span>
        <img style="display:  block;width: 100%;"
             :src="infoData.icon"
             alt>
      </span>
      <p>{{infoData.desc}}</p>
    </div>

    <div class="pay-info-txt"
         v-if="this.$route.query.repay_type==1">
      <p v-if="this.$route.query.tkind==1||!this.$route.query.tkind">Pembayaran dapat dilakukan melalui mobile banking atau ATM transfer ke rekening VA {{this.$route.query.repay_name||infoData.title}}</p>
      <p v-if="this.$route.query.tkind==2">Beritahu kasir minimarket untuk kode pembayaran, dapat berupa kode pembayaran dari *merchant-merchant pembayaran *</p>
    </div>

    <div class="step-mid-info">
      <div class="title">Kode Pembayaran Anda Adalah</div>
      <div class="br"></div>
      <div class="info-list">
        <!-- <li v-for="(item,index) in infoData.repay_account" :key="index">
                <i class="left">{{item.title}}</i>
                <i style="color:#ff8000" class="right">{{item.account}}</i>
        </li>-->
        <li style="flex-wrap: wrap;">
          <!-- <i class="left">{{infoData.title}}</i> -->
          <i class="left">{{this.$route.query.repay_name||infoData.title}}</i>

          <i style="color:#ff8000;font-size:20px;"
             class="right">{{infoData.account||'----'}}</i>
        </li>

        <li>
          <i class="left">Total Pembayaran</i>
          <i style="color:#ff8000"
             class="right">Rp {{infoData.amount||0}}</i>
        </li>

        <li class="col"
            style="padding: 7px 0px;">
          <!-- <i class="left">batas pinjaman</i> -->
          <i class="right"
             style="font-family:'Roboto-Light';line-height:1.2;font-size:14px;">Status akan berubah menjadi lunas setelah Anda melakukan pembayaran.</i>
        </li>
      </div>
    </div>

    <div class="step-mid-info">
      <div class="info-list-nav">
        <li @click="tourl(item.class)"
            v-for="(item,index) in infoData.repay_explain"
            :key="index">
          <span class="left">
            <i class="iconfont"
               :class="iconList[item.class]"></i>
            <p class>{{item.name}}</p>
          </span>
          <i class="right iconfont icon-youjiantou"></i>
        </li>
      </div>
    </div>

    <div class="show-info">
      <p v-if="this.$route.query.repay_type==1">Jika pembayaran gagal, ubah metode pembayaran</p>
      <p v-if="this.$route.query.repay_type==2"
         @click="toContectKf()">
        Jika pembayaran gagal, refresh halaman & ulangi Jika kembali gagal,
        <i class="colorff5">hubungi cs</i>
      </p>
    </div>

    <!-- <Kefuicon></Kefuicon> -->

    <!-- <div class="step-mend">
      <div class="title">Mendukung</div>
      <div class="list">
        <li>
           <i></i>
        </li>
        <li>
           <i></i>
        </li>
        <li>
           <i></i>
        </li>
      </div>
    </div>-->
  </div>
</template>
<script>
export default {
  name: "Step",

  data() {
    return {
      infoData: "",
      tkind: "",
      iconList: ["", "icon-icon-API-ATM", "icon-online", "icon-M-banking", "icon-icon-API-minimarket"]
    };
  },

  created() {
    this.getDataPage();
    // this.infoData={
    //     title:'cascascascas',
    //     account:'0989008908',
    //     amount:'3123.2',
    //     repay_explain:[{class:1,name:'back-cscasc'}]

    // }
  },
  mounted() { },
  methods: {
    async getDataPage() {
      let info = await this.axios.post("/order/get-repay-details", {
        order_no: this.$route.query.order_no,
        repay_type: this.$route.query.repay_type,
        repay_value: this.$route.query.repay_value,
        delay_term: this.$route.query.delay_term || '',
        request_type: this.$route.query.request_type || '',
        class: this.$route.query.tkind || ""
      });
      if (info.code === 0) {
        console.log(info);
        // info.data.tab=[{name:'ATM',class:1},{name:'Ads',class:2},{name:'ATdsM',class:3}]
        this.infoData = info.data;
      } else {
        this.infoData = 1; //  默认给值
        this.$vux.toast.show({ text: info.code + info.message, type: "text", width: '80%' });
      }
      this.$vux.loading.hide();
    },

    tochangeKind(v) {
      this.$router.push({
        path: "/PayStep4",
        query: {
          order_no: this.$route.query.order_no,
          repay_type: this.$route.query.repay_type,
          repay_value: this.$route.query.repay_value,
          tkind: v
        }
      });
      this.getDataPage();
    },
    toContectKf() {
      AndroidH.startCustomerService()
    },

    tourl(value) {
      this.$router.push({
        path: "/PayStep5",
        query: {
          order_no: this.$route.query.order_no,
          repay_value: this.$route.query.repay_value,
          repay_explain_class: value
        }
      });
    }
  }
  // methods end
};
</script>
<style scoped>
.pay-info-desc {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  flex: 1;
}
.pay-info-desc span {
  width: 100px;
}
.pay-info-desc p {
  font-size: 14px;
  margin-left: 10px;
}
</style>

