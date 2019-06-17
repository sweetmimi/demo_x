<template>
  <div class="bgc">

    <div class="loading"
         v-if="!infoData"
         style="flex-direction: column;">
      <!-- <img src="/static/images/loading.gif" alt=""> -->
      <!-- <p style="font-size: 15px;margin-top: 10px;">Sistem sedang ditinjau, mohon tunggu</p> -->
      <p>Loading...</p>
    </div>
  <!-- 订单状态 -->
    <div class="step-top-line">

      <div class="">
        <!-- 信息正在提交中 -->
        <div v-if='infoData.status=="80"' style="height:100px">
         <van-notice-bar mode="closeable">Informasi sedang dikirim, harap tunggu.</van-notice-bar>
          <div style="width:50px;height:50px;margin:0 auto;">
            <img src="../../dist/static/images/revie_under.png" alt="" style="wight:100%;height:100%">
          </div>
          <p style="text-align: center;color:#FBA740">Info Tambahan</p>
        </div>
        <!-- 重新提交补充信息 -->
        <div v-if='infoData.status=="80"&&infoData.order_error==1&&infoData.resubmit==1' style="height:100px">
         <van-notice-bar mode="closeable">Kirim informasi gagal, silahkan kirim lagi dari awal.</van-notice-bar>
          <div style="width:50px;height:50px;margin:0 auto;">
            <img src="../../dist/static/images/revie_agn.png" alt="" style="wight:100%;height:100%">
          </div>
          <p style="text-align: center;col0or:#27C153">Silahkan kirim lagi</p>
        </div>
        <!-- 等待审核 -->
        <div v-if='infoData.status=="90"' style="height:100px">
         <van-notice-bar mode="closeable">Pengajuan sedang di verifikasi，mohon menunggu.</van-notice-bar>

          <div style="width:50px;height:50px;margin:0px auto 0;padding-top:20px">
            <img src="../../dist/static/images/revie_under.png" alt="" style="wight:100%;height:100%">
          </div>
          <p style="text-align: center;color:#FBA740">Dalam Verifikasi</p>
        </div>
        <!-- 审核不通过 -->
        <div v-if='infoData.status=="110"' style="height:100px">
         <van-notice-bar mode="closeable">Maaf, pengajuan Anda gagal.</van-notice-bar>
          <div style="width:50px;height:50px;margin:0 auto;">
            <img src="../../dist/static/images/revie_fail.png" alt="" style="wight:100%;height:100%">
          </div>
          <p style="text-align: center;color:#FF4D4D">Verifikasi Gagal</p>
        </div>
        <!-- 审核通过 -->
        <div v-if='infoData.status=="100"' style="height:100px">
         <van-notice-bar mode="closeable">Selamat pengajuan Anda berhasil, Sistem sedang mencairkan dana Anda, mohon tunggu.</van-notice-bar>
          <div style="width:50px;height:50px;margin:0 auto;padding-top:20px">
            <img src="../../dist/static/images/revie_pass.png" alt="" style="wight:100%;height:100%">
          </div>
          <p style="text-align: center;color:#27C153">Disetujui</p>
        </div>
        <!-- 重新提交补充信息 -->
        <div v-if='infoData.status=="99"' style="height:100px">
         <van-notice-bar mode="closeable">Isi ulang informasi untuk pengajuan.</van-notice-bar>
          <div style="width:50px;height:50px;margin:0 auto;">
            <img src="../../dist/static/images/revie_agn.png" alt="" style="wight:100%;height:100%">
          </div>
          <p style="text-align: center;color:#27C153">Isi ulang info</p>
        </div>
        <!-- 借款取消 -->
        <div v-if='infoData.status=="161"' style="height:100px">
          <div style="width:50px;height:50px;margin:0 auto;">
            <img src="../../dist/static/images/revie_fail.png" alt="" style="wight:100%;height:100%">
          </div>
          <p style="text-align: center;color:#FF4D4D">Batalkan pinjaman</p>
        </div>
        <!-- 待确认借款 -->
        <div v-if='infoData.status=="109"&&infoData.dropamount_status===1' style="height:100px">
         <van-notice-bar mode="closeable">Setelah tinjauan, pinjaman max Rp {{infoData.application_amount}}. Konfirmasi pengajuan segera.</van-notice-bar>

          <div style="width:50px;height:50px;margin:0 auto;padding-top:20px">
            <img src="../../dist/static/images/revie_under.png" alt="" style="wight:100%;height:100%">
          </div>
          <p style="text-align: center;color:#FBA740">Konfirmasi Pinjaman</p>
        </div>
        <!-- 确认降额 -->
        <div v-if='infoData.status=="109"&&infoData.dropamount_status===2' style="height:100px">
         <van-notice-bar mode="closeable">Pengajuan selesai. Harap sabar, uang akan ditransfer.</van-notice-bar>

          <div style="width:50px;height:50px;margin:0 auto;padding-top:20px">
            <img src="../../dist/static/images/revie_under.png" alt="" style="wight:100%;height:100%">
          </div>
          <p style="text-align: center;color:#FBA740">Konfirmasi Pinjaman</p>
        </div>
        <!-- 放款失败 -->
        <div v-if='infoData.status=="169"' style="height:100px">
         <van-notice-bar mode="closeable"> {{infoData.msg||'Maaf, pengajuan pinjaman anda gagal. Mohon periksa kembali informasi bank.'}}</van-notice-bar>

          <div style="width:50px;height:50px;margin:0 auto;padding-top:20px;">
            <img src="../../dist/static/images/revie_fail.png" alt="" style="wight:100%;height:100%">
          </div>
          <p style="text-align: center;color:#FF4D4D">Pembayaran Gagal</p>
        </div>
        <!-- <div class="list-item"
             v-for="(item,index) in infoData.status_list"
             :key="index"
             :class="[item.type===1 ? 'success' :'',item.type===2 ? 'fail' :'']">
          <span :class="[item.type===2 ? 'iconfont icon-cuowu' :'']"></span>
        </div> -->
        
        <!-- <i v-for="(item,index) in infoData.status_list"
           :key="`${index}-c`"
           v-if="index!==0"
           :style="{left:[index>1? `${(index-1)*33}%`:'']}"
           :class="[item.type===1||item.type===2 ? 'success' :'']"></i> -->

        <!-- <i>
          <em class='success'
              :style="{width:`${(linenum)*33}%`}"></em>
        </i> -->

      </div>

      <!-- <div class="txt">
        <p v-for="(item,index) in infoData.status_list"
           :key="index"
           :class="[item.type===1 ? 'success' :'']">{{item.name}}</p>
           
      </div> -->

      <!-- 使用免息券 -->
      <div class="info"
           v-if="infoData.coupon&&infoData.coupon.value&&(infoData.status!='99'||infoData.status!='110'||infoData.status!='169'||infoData.status!='161')">
        <div class="br"></div>
        <p style="color:#999">{{infoData.coupon.text}}
          <b style="color:#ff5000">{{infoData.coupon.value}}</b>
        </p>
      </div>

      <div class="info"
           v-if='!infoData.order_error===0&&infoData.status=="80"'>
        <div class="br"></div>
        <!-- 信息提交中 -->
        <p style="color:#999">Informasi sedang dikirim, harap tunggu</p>
      </div>

      <div class="info"
           v-if='infoData.order_error===1&&infoData.status=="80"'>
        <div class="br"></div>
        <!-- 提交失败，请重新提交 -->
        <p>Kirim informasi gagal, silahkan kirim lagi dari awal.</p>
      </div>

      <div class="info"
           v-if='infoData.order_error===2&&infoData.status=="80"'>
        <div class="br"></div>
        <!-- 提交失败，请修改信息重新提交 -->
        <p>Pengajuan Anda gagal, mohon pastikan bahwa informasi yang Anda berikan benar.</p>
      </div>

      <!-- 使用免息券 -->
      <div class="info"
           v-if='infoData.status=="90"&&appid1=="10004"'>
        <div class="br"></div>
        <p style="color: #999">Pengajuan sedang di verifikasi，mohon menunggu.</p>
      </div>

      <div class="info"
           v-if='infoData.status=="99"'>
        <div class="br"></div>
        <p>{{infoData.msg||'Isi ulang informasi untuk pengajuan'}}</p>
      </div>

      <div class="info"
           v-if='infoData.status=="110"'>
        <div class="br"></div>
        <!-- 降额度过期 -->
        <p v-if="infoData.dropamount_status===3">{{'Maaf, pesanan Anda belum dikonfirmasi untuk waktu yang lama dan telah ditutup secara otomatis.'}}</p>
        <!-- 正常 -->
        <span v-else>
          <p v-if="infoData.exception_type!==0"
             @click="torecord(infoData.payifreject)">{{infoData.exception_msg||'Maaf, pengajuan Anda Gagal'}}.<i v-if='infoData.payifreject===1'
               style="font-style: normal;">Terima Rp 8.000, tukar sekarang.>></i></p>
          <p v-else
             @click="torecord(infoData.payifreject)">{{infoData.msg||'Maaf, Verifikasi untuk Pengajuan Pinjaman anda Gagal '}}.<i v-if='infoData.payifreject===1'
               style="font-style: normal;">Terima Rp 8.000, tukar sekarang.>></i></p>
        </span>
      </div>

      <div class="info"
           v-if='infoData.status=="161"'>
        <div class="br"></div>
        <p>{{infoData.msg||'Pesanan telah dibatalkan, Jika ada pertanyaan silahkan menghubungi Customer Service '}}</p>
      </div>

      <div class="info"
           v-if="infoData.bind_bank=='2'">
        <div class="br"></div>
        <p>{{infoData.bind_bank_reason||'Pengikatan kartu bank Anda gagal, silahkan ulangi kembali'}}</p>
      </div>

      <!-- <div class="info"
           v-if='infoData.status=="169"'>
        <div class="br"></div>
        <p>{{infoData.msg||'Maaf, pengajuan pinjaman anda gagal. Mohon periksa kembali informasi bank.'}}</p>
      </div> -->

      <!-- 降额待确认 -->
      <!-- <div class="info"
           v-if='infoData.status=="109"&&infoData.dropamount_status===1'>
        <div class="br"></div>
        <p>Setelah tinjauan, pinjaman max Rp {{infoData.application_amount}}. Konfirmasi pengajuan segera.</p>
      </div> -->

      <!-- 降额已确认 -->
      <!-- <div class="info"
           v-if='infoData.status=="109"&&infoData.dropamount_status===2'>
        <div class="br"></div>
        <p>{{'Pengajuan selesai. Harap sabar, uang akan ditransfer.'}}</p>
      </div> -->

      <!-- 降额度过期 -->
      <!-- <div class="info"
           v-if='infoData.status=="110"&&infoData.dropamount_status===3'>
        <div class="br"></div>
        <p>{{'Maaf, pesanan Anda belum dikonfirmasi untuk waktu yang lama dan telah ditutup secara otomatis.'}}</p>
      </div> -->

    </div>

    <div class="step-mid-info"
         style='margin-top: 20px;'
         :class="[showlist?'step-mid-info-listshow':'']">
      <!-- <div class="title">Informasi Pinjaman</div> -->

      <div class="info-list-nav">
        <li>
          <div class="left">
            <div class="listHeader">Informasi Pinjaman</div>
          </div>
          <!-- <i class="right iconfont icon-youjiantou"></i> -->
        </li>
      </div>

      <div class="br"></div>
      <div class="info-list">

        <li v-if='infoData.application_amount'>
          <i class="left">Jumlah pinjaman</i>
          <i class="right">Rp {{infoData.application_amount}}</i>
        </li>

        <li v-if='infoData.application_term'>
          <i class="left">Durasi pinjaman</i>
          <i class="right">{{infoData.application_term}} {{dayUnit[infoData.term_unit]}}</i>
        </li>

        <li v-if='infoData.actual_amount'>
          <i class="left">Jumlah uang yang diterima</i>
          <i class="right">Rp {{infoData.actual_amount}}</i>
        </li>

        <li v-if='infoData.admin_amount'>
          <i class="left">Biaya administrasi</i>
          <i class="right">Rp {{infoData.admin_amount||0}}</i>
        </li>

        <li v-if='infoData.interest_amount'>
          <!-- <i class="left">Bunga({{infoData.interest_rate||0}}%)</i> -->
          <i class="left">Bunga</i>
          <i class="right">Rp {{infoData.interest_amount||0}}</i>
        </li>

        <li v-if='infoData.bank_account'>
          <i class="left">Rekening Penerima</i>
          <i class="right">{{infoData.bank_account||'00000000'}}</i>
        </li>

      </div>

    </div>

    <!-- 推荐两款机构list -->
    
    <div class='' 
         v-if="tjdata&&tjdata.length>0">

      <div class="step-mid-info"
           style=" z-index: 9;position: relative;">
        <!--   <div class="info-list-nav">
          <li>
            <span class="left">
              <p class>Informasi Pinjaman</p>
            </span>
            <!~~ <i class="right iconfont icon-youjiantou"></i> ~~>
          </li>
        </div> -->
      </div>

      <div class='loan_list_div'>
        <div class="left">
          <div class='listHeader' >Mudah Disetujui</div>
        </div>
        
        <div class="br"></div>
        <div class="loan_mid">
          <li v-for="(item,index) in tjdata"
              :key="index">
            <div class="top">
              <div>
                <img class='logo'
                     :src="item.icon"
                     alt="">
                <h4>{{item.product_name}}</h4>
                <span>{{item.total_score}}<i><img width="100%"
                                                  src="../../dist/static/images/star.png"
                                                  alt=""> </i></span>
              </div>
              <em>
                <i @click="toappidpage(item.appid)">Pinjaman Cepat</i>
              </em>
            </div>
            <div class="mid">
              <span class='left'>
                <h4>Rp {{item.price_new||'1.000.000'}}</h4>
                <!-- <p>{{'Jumlah maksimum'}}</p> -->
              </span>
              <span>
                <p style="font-size: 16px;color: #333;">{{item.application_term||7}} {{item.loan_time_day_unit}}</p>
              </span>
            </div>
            <div v-if="index!==tjdata.length-1" class="br"></div>
          </li>
        </div>
      </div>
    </div>

    <!-- 重新申请 resubmit -->
    <div class="sub-btn-out"
         v-if='infoData.resubmit===1&&infoData.status=="80"'>
      <span class="sub-btn"
            @click='toSilahkan()'>
        {{this.infoData.order_error===1 ? "Merevisi informasi":"Isi informasi dan dapatkan uang"}}
      </span>
    </div>

    <!-- 重填信息 -->
    <div class="sub-btn-out"
         v-if='infoData.status=="99"'>
      <span class="sub-btn"
            @click='tourl()'>
        <!-- Isi kembali informasi -->
        Isi ulang informasi untuk pengajuan
      </span>
    </div>

    <!-- 161 取消贷款进程 -->
    <div class="sub-btn-out"
         v-if='infoData.status=="161"'>
      <span class="sub-btn"
            @click='toContectKf'>
        Hubungi CS
      </span>
    </div>

    <!-- status = 109 并且dropamount_status = 1显示提交按钮 降低额度确认
      dropamount_status
      0 不存在降额  1 降额待确认  2 降额确认 3降额已过期
    -->

    <div class="sub-btn-out"
         v-if='infoData.status=="109"&&infoData.dropamount_status===1'>
      <span class="sub-btn"
            @click="dropamountfun()">
        Ambil Uang Sekarang
      </span>
    </div>

    <div class="show-info"
         v-if='infoData.status=="169"'
         @click="toContectKf">
      <p>Pinjaman gagal. <br />Mohon
        <i class='colorff5'>hubungi cs</i> untuk info lebih lanjut.</p>
    </div>

    <div class="sub-btn-out"
         v-if='infoData.bind_bank=="2"&&infoData.status!="110"'>
      <span class="sub-btn"
            @click='tobindcard()'>
        Ubah informasi kartu debit
      </span>
    </div>

    <div style="font-size: 13px;color: #999;word-wrap: break-word;width: 90%;text-align: center;margin: 10px auto; ">
      Ajukan pinjaman 1x lagi, dapatkan tambahan
      <i class="red1"> Rp 2000</i></div>
    <!-- <Kefuicon></Kefuicon> -->

    <!-- 降低额度确认 -->
    <!-- <div class="confirm-kap">
      <confirm v-model="dropamountflag"
               :show-confirm-button="false"
               :show-cancel-button="false"
               hide-on-blur
               @on-hide="dropamountflag=false">
        <div class="confirm-kapdiv">

          <div class="step-mid-info"
               style='margin: 0;'>
            <div class="title"
                 style="text-align: left;">Konfirmasikan pengurangan</div>
            <div class='br'></div>
            <div class="info-list"
                 style="height: auto; opacity:1;margin-top: 20px;">
              <div style=" text-align: left;word-break: break-word;padding: 30px 0px 10px;">Setelah ditinjau, Anda dapat meminjam Rp {{infoData.actual_amount}}, harap konfirmasikan jumlah pinjaman</div>
              <li>
                <i class="left">Batas pinjaman</i>
                <i class="right">Rp {{infoData.application_amount}}</i>
              </li>
              <li>
                <i class="left">Jumlah sebenarnya</i>
                <i class="right">Rp {{infoData.actual_amount}}</i>
              </li>
            </div>
          </div>

          <span class="sub-btn"
                style="margin: -10px auto 20px"
                @click="dropamountfun()">Unggah Sekarang</span>
        </div>
      </confirm>
    </div> -->

    <!--到选写填页面 -->
    <div class="confirm-kap">
      <confirm v-model="topageflag"
               :show-confirm-button="false"
               :show-cancel-button="false"
               hide-on-blur
               @on-hide="topageflag=false">
        <div class="confirm-kapdiv">
          <span class="top">
            <!-- <img src="/static/images/topdasd.png"
                 alt> -->
            <em>Selamat, info pinjaman
              <br>sudah lengkap.
            </em>
          </span>
          <p>
            Verifikasi informasi akun, keberhasilan pinjaman meningkat menjadi
            <i>80%</i>.
          </p>
          <span class="sub-btn"
                @click="$router.replace({path: '/ToPage', query:{process_type: 2}})">Unggah Sekarang</span>
        </div>
      </confirm>
    </div>

    <!-- showkap flag -->
    <!-- <div class="confirm-kap"
         v-if="tjdata">
      <confirm v-model="showkap"
               :show-confirm-button='false'
               :show-cancel-button='false'
               hide-on-blur
               @on-hide='toappidpageclose()'>
        <div class="confirm-kapdiv">
          <span class="top"
                style="    padding: 30px 20px;word-break: break-word;    text-align: left; font-size: 18px;">
            <img src="/static/images/topdasd.png"
                 alt="">
            <!~~ 一单多推送 ~~>
            <em style="font-weight: 500;"
                v-if='infoData.status == "80"'>Ajukan pinjaman 1x lagi, dapatkan tambahan Rp 2000.</em>
            <!~~ 审批拒绝 ~~>
            <em style="font-weight: 500;"
                v-if='infoData.status == "110"'>Anda boleh coba produk mudah lolos pinjaman berikut.</em>
          </span>

          <div class="tjlist">
            <li v-for="(item,index) in tjdata"
                :key="index">
              <div class="left">
                <i><img :src="item.icon"
                       width="25"
                       height="25"
                       alt=""></i>
                <span style="  margin-left: 10px;font-weight: bold;">{{item.product_name}}</span>
                <span class="total_score">{{item.total_score}}<img src="/static/images/ic_star_orange.png"
                       alt=""></span>
              </div>
              <div class="right"
                   @click="toappidpage(item.appid)">
                <img style="width:100%"
                     src="/static/images/btn1.png"
                     alt="">
              </div>
            </li>
          </div>

        </div>
      </confirm>
    </div> -->

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
  right: 0;
  left: 0;
  top: 0;
  min-height: 100%;
}
.loan_list_div {
  /* height: 0px; */
  overflow: hidden;
  background-color: white;
  padding: 0px 10px;
  /* opacity: 0; */
  /* transform: translateY(-25%); */
  /* transition: all 0.5s ease-out; */
}

.step-mid-info-listshow .info-list {
  height: auto;
  overflow: hidden;
  opacity: 1;
  transform: translateY(0%);
}

.step-mid-info-listshow .info-list-nav .right {
  transform: rotate(90deg);
}

.listHeader {
  font-size: 16px;
  color: #333;
  font-weight: 600;
  padding: 5px 10px;
  height: 30px;
}
.tjlist {
  padding: 20px 20px;
}
.tjlist li {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0px;
}
.tjlist .left,
.tjlist .right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tjlist .right {
  height: 40px;
  width: 110px;
}
.tjlist .total_score {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ff8629;
  font-weight: bold;
  margin-left: 10px;
}
.tjlist .total_score img {
  width: 15px;
}
</style>

<script>
import { Confirm } from "vux";
import baseinfo from "../request/baseinfo";
import { ok } from 'assert';
export default {
  name: "Step",
  components: {
    Confirm
  },
  data() {
    return {
      infoData: "",
      appid1: baseinfo.appid,
      showkap: false,
      dayUnit: ["", "Hari", "Bulan", "Tahun"],
      tjdata: '',

      showlist: false,

      dropamountflag: false,

      topageflag: false,

      linenum: 0,
    };
  },

  async created() {
    // if (this.$route.query.type == 1) {
    //   location.href = `cashcash://cashcashclient/openapp?loan_type=1&order_no=${
    //     this.$route.query.order_no
    //   }&appid=${this.$route.query.appid}`;
    //   return;
    // }
    await this.getDataPage();
    this.getRecomData();

    try {
      Cashcash.eventTrack('order_status_view');
    } catch (e) {
    }
  },
  mounted() {

    Cashcash.doShowBack(true, '');

    window["ToshowTjlist"] = () => {

      // this.showkapfun();

    };

  },
  methods: {

    // showkapfun() {
    //   if (this.infoData.status == "80" && localStorage.getItem(`${this.infoData.order_no}-80`) < 4) { this.showkap = true; }
    //   if (this.infoData.status == "110" && localStorage.getItem(`${this.infoData.order_no}-110`) < 4) { this.showkap = true; }
    // },
    // show消息提示
    showmsg(msg) {
      this.$vux.toast.show({
        text: msg,
        type: "text",
        position: "middle",
        width: "80%"
      });
    },

    //降额确认
    async dropamountfun() {
      let info = await this.axios.post("/order/order-details-confirmation", { order_no: this.infoData.order_no });
      if (info.code === 0) {
        this.getDataPage();
        // this.dropamountflag = false;
        // this.showmsg('Selamat atas jumlah pinjaman yang telah Anda konfirmasikan, harap bersabar dan tunggu pinjamannya')
      } else {
        this.showmsg(info.code + info.message)
      }
    },
//推荐合适两款机构
    async getRecomData() {
      if (this.infoData.status=="80"||this.infoData.status=="90"||this.infoData.status=="110"||this.infoData.status=="100"||
        this.infoData.status=="169"||this.infoData.status=="170"||this.infoData.status=="200") {
        
        let info = await this.axios.post("/featured-product/shop-window", { order_no: this.infoData.order_no,page_path:'order_reject' });
        
        if (info.code === 0 && info.data && info.data.length > 0) {
          this.tjdata = info.data
          
          //alert(this.tjdata)
          // let aa = parseInt(localStorage.getItem(`${this.infoData.order_no}-80`) || 0) + 1
          // localStorage.setItem(`${this.infoData.order_no}-80`, aa);
          // if (localStorage.getItem(`${this.infoData.order_no}-80`) < 4) {
          //   Cashcash.doShowTjlist(true)
          // } else {
          //   Cashcash.doShowTjlist(false)
          // }
      
        }
      }
      // if (this.infoData.status == "110") {
      //   let info = await this.axios.post("/featured-product/shop-window", { order_no: this.infoData.order_no });
      //   if (info.code === 0 && info.data && info.data.length > 0) {
      //     this.tjdata = info.data
      //     let aa = parseInt(localStorage.getItem(`${this.infoData.order_no}-110`) || 0) + 1
      //     localStorage.setItem(`${this.infoData.order_no}-110`, aa);
      //     if (localStorage.getItem(`${this.infoData.order_no}-110`) < 4) {
      //       Cashcash.doShowTjlist(true)
      //     } else {
      //       Cashcash.doShowTjlist(false)
      //     }
      //   }
      // }

    },
    
//页面数据
    async getDataPage() {
      let info = await this.axios.post("/order/get-order-details", {
        order_no: this.$route.query.order_no,
        taskId: this.$route.query.taskId || '',
        taskType: this.$route.query.taskType || 'gojek',
      });
      if (info.code === 0) {
        
        // info.data.status = 80;
        this.infoData = info.data;
        
        // setTimeout(() => {
        //   this.infoData = info.data;
        // }, 1500)
        // if (info.data.points && info.data.points.length > 0) {
        //   this.$vux.toast.show({ text: info.data.points[0].msg, type: "text" });
        // }
        // this.infoData.status = 80
        //   this.infoData.resubmit = 1
        // this.infoData.status_list =
        //   [{ name: "Dalam Verifikasi", type: 1 }, { name: "Disetujui", type: 1 }, { name: "Dana Cair", type: 2 }, { name: "Dana Cair", type: 0 }]

        // this.topageflag = this.infoData.optional_process == 1 ? true : false;
        //有可选流程
        if (this.infoData.optional_process == 1) {
          let aa = parseInt(localStorage.getItem(`${this.infoData.order_no}-optional_process`) || 0) + 1
          
          localStorage.setItem(`${this.infoData.order_no}-optional_process`, aa);
          if (localStorage.getItem(`${this.infoData.order_no}-optional_process`) < 2) {
            this.topageflag = true
          }
        }

        let aa = this.infoData.status_list.filter(v => {
          return v.type == 1
        })
        this.linenum = aa.length > 3 ? 3 : aa.length
        if (
          info.data.status == "170" ||
          info.data.status == "175" ||
          info.data.status == "180" ||
          info.data.status == "200"
        ) {
          this.$router.push({
            path: "/PayStep2",
            query: { order_no: info.data.order_no }
          });
        }
      } else {
        // this.infoData = {};
        this.showmsg(info.code + info.message)
      }
      this.$vux.loading.hide();
    },

    tourl() {
      Cashcash.finishWeb(); // 关闭当前页面方法
      // Cashcash.startMyLoan()  // 跳到自己得订单借款列表页面方法
      Cashcash.startProductLoan(baseinfo.appid + '')  //对应得产品借款页面方法
      // this.$router.push({path:'/PayStep2',query:{order_no:this.infoData.order_no}})
    },

    //
    toappidpage(id) {
      Cashcash.startProductLoan(id + '')  //对应得产品借款页面方法
    },
    toappidpageclose() {
      Cashcash.doShowTjlist(false)
      this.showkap = false;
    },

    // 跳转钱包
    torecord(type) {
      if (type === 1) {
        try {
          if (typeof eval(Cashcash.startMyWalletPage) == "function") {
            Cashcash.startMyWalletPage(1);
          } else {

            this.showmsg("none function")
          }
        } catch (e) {
          this.showmsg("none function")
        }
      }
    },

    //重新申请 方法

    async toSilahkan() {
      if (this.infoData.device_conf) {
        try {
          if (typeof eval(Cashcash.uploadDeviceInfo) == "function") {
            Cashcash.uploadDeviceInfo(JSON.stringify(this.infoData.device_conf), this.$route.query.order_no, baseinfo.appid);
          } else {
            this.showmsg("none function")
            // alert("none function");
          }
        } catch (e) {
          this.showmsg("none function")
        }

      }
      try {
        Cashcash.eventTrack('order_status_resubmit_click');
      } catch (e) {
      }
      if (this.infoData.order_error === 1) {
        this.tourl()
      }

      this.$vux.loading.show();
      let info = await this.axios.post("/order/order-resubmit", {
        order_no: this.$route.query.order_no,
        appid: baseinfo.appid,
        userid: baseinfo.userid,
        is_device: this.infoData.device_conf ? 1 : 0,
        // order_error: this.infoData.order_error || 0
      });
      this.$vux.loading.hide();
      if (info.code === 0) {
        console.log(info)
        this.getDataPage();
      } else {
        this.showmsg(info.code + info.message + "")

      }
    },

    tobindcard() {
      this.$router.push({ path: '/infoBankCard', query: { order_no: this.infoData.order_no } })
    },
    toContectKf() {
      Cashcash.startCustomerService()
    }
  }
  // methods end
};
</script>
