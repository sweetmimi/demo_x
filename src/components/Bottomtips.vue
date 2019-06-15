<template>
  <div class="tips">
    Pinjaman ini disediakan oleh perusahaan
    <i class="red1">{{p_name||'other'}}</i>
  </div>
</template>
<script>
import baseinfo from "../request/baseinfo";
export default {
  name: 'tips',
  data() {
    return {
      p_name: '',
    }
  },
  created() {
    switch (baseinfo.appid + '') {

      case '10000':
        this.p_name = 'Do-it';
        break;
      case '10001':
        this.p_name = 'Kredit Pintar';
        break;
      case '10002':
        this.p_name = 'Tangbull';
        break;
      case '10003':
        this.p_name = 'Tascash'; //Tascash BosPinjaman
        break;
      case '10004':
        this.p_name = 'Pinjaman Go';
        break;
      case '10005':
        this.p_name = 'Uang Saku';
        break;
      case '10006':
        this.p_name = 'PestaGo';
        break;
      case '10007':
        this.p_name = 'Pinjam Yuk';
        break;
      case '10008':
        this.p_name = 'PnjmnPetir';
        break;
      case '10009':
        this.p_name = 'GoDana';
        break;
      case '20000':
        this.p_name = 'Pinjamlah';
        break;
      case '20001':
        this.p_name = 'Uangzaman';
        break;
      case '90000':
        this.p_name = 'CashX';
        break;
      default:
        this.p_name = 'No name';
        break;
    }
  },
  methods: {},
}
</script>
<style scoped>
.tips 
{
  font-size: 13px;
  color: #999;
  word-wrap: break-word;
  width: 90%;
  text-align: center;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
