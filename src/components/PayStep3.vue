<template>
  <div class="bgc">
    <div class="loading"
         v-if="!infoData">Loading....</div>

    <div class="pay-num-info"
         :class="[this.$route.query.status==180 ? 'pay-num-info-yq':'']">
      <p>Jumlah pembayaran</p>
      <h2>Rp {{this.$route.query.repay_amount||0}}</h2>
      <!-- <span>belum dilunasi</span> -->
    </div>

    <div class="step-mid-info">
      <div class="title">Pilih cara pembayaran</div>
      <div class="br"></div>

      <div class="info-list-nav-list"
           v-for="(item,index) in infoData"
           :key="index"
           :class="[ item.flag ? 'info-list-nav-listshow':'']">
        <div class="info-list-nav1"
             @click="item.flag=!item.flag">
          <span class="left">
            <i class="iconfont"
               :class="iconList[item.type]"></i>
            <p class>{{item.name}}</p>
          </span>
          <i class="right iconfont icon-youjiantou"></i>
        </div>

        <div class="info-list-nav-banklist">
          <!-- {{item.kindList}} -->
          <li v-for="(item1,k) in item.kindList"
              :key="k"
              @click="tourl(item1.type,item1.value,item1.name)"
              :class="[(k+1)%3==1 ? 'b1' :'']">
            <span>
              <img :src="item1.icon"
                   alt>
            </span>
            <p>{{item1.name}}</p>
          </li>
        </div>

        <div v-if="(index+1)!==infoData.length"
             class="br"></div>
      </div>
    </div>

    <BottomTips></BottomTips>
    <!-- <Kefuicon></Kefuicon> -->

    <!-- <div class="sub-btn-out" >
            <span class="sub-btn"  >
                 Isi kembali informasi
            </span>
    </div>-->
  </div>
</template>
<script>
export default {
  name: "Step",

  data() {
    return {
      infoData: "",
      iconList: ["", "icon-icon-API-banktransfe", "icon-icon-API-minimarket"]
    };
  },

  created() {
    this.getDataPage();
  },
  mounted() { },
  methods: {
    async getDataPage() {
      let info = await this.axios.post("/order/get-repay-mode", {
        order_no: this.$route.query.order_no
      });
      if (info.code === 0) {
        info.data.forEach(v => {
          v.flag = false;
        });
        this.infoData = info.data;
      } else {
        this.$vux.toast.show({ text: info.code + info.message, type: "text" });
      }
      this.$vux.loading.hide();
    },

    tourl(type, value, name) {
      this.$router.push({
        path: "/PayStep4",
        query: {
          order_no: this.$route.query.order_no,
          repay_type: type,
          repay_value: value,
          repay_name: name,
          delay_term: this.$route.query.delay_term,
          request_type: this.$route.query.request_type,
          tkind: 1
        }
      });
    }
  }
  // methods end
};
</script>
