<template>
  <div class="bgc"
       style="height:auto">
    <div class="loading"
         v-if="!infoData">Loading....</div>

    <div class="pay-stp5-txt">
      <!-- <p>Beberapa Instruksi terkait</p> -->
    </div>

    <div class="pay-stp5-stp">
      <li v-for="(item,index) in infoData"
          :key="index">
        <i>{{index+1}}</i>
        <span>{{item.text}}</span>
      </li>
    </div>
<!-- <Kefuicon></Kefuicon> -->
    
  </div>
</template>
<script>
export default {
  name: "Step",

  data() {
    return {
      infoData: ""
    };
  },

  created() {
    this.getDataPage();
  },
  mounted() { },
  methods: {
    async getDataPage() {
      let info = await this.axios.post("/order/get-repay-explain", {
        order_no: this.$route.query.order_no,
        repay_value: this.$route.query.repay_value,
        repay_explain_class: this.$route.query.repay_explain_class
      });
      if (info.code === 0) {
        console.log(info);
        this.infoData = info.data;
      } else {
        this.$vux.toast.show({ text: info.code + info.message, type: "text" });
      }
      this.$vux.loading.hide();
    }
  }
  // methods end
};
</script>
