<template>
  <div class="kefu"
       v-if="appname=='com.firestorm.sea.cashcash'">
    <img @click="kefufun()"
         src="/static/images/kefu_icon.png"
         width="100%"
         alt>
  </div>
</template>
<script>
import baseinfo from "../request/baseinfo";
export default {
  name: 'kefu',
  data() {
    return {
      appname: baseinfo.app_package
    }
  },
  created() {

  },
  methods: {
    // 点击客服
    kefufun() {
      try {
        location.href = 'http://bit.ly/2OIFy9j'
        // if (typeof eval(AndroidH.startCustomerService) == "function") {
        //     AndroidH.startCustomerService();
        // }
      } catch (e) {
        alert("Versi anda sekarang versi rendah, tidak bisa menggunakan fitur memilih nomor dari kontak");
      }
    },
  },
}
</script>
<style scoped>
.kefu {
  position: fixed;
  right: 5px;
  bottom: 10%;
  z-index: 99;
  width: 60px;
}
</style>
