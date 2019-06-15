<template>
  <div class="bgc">
    
    <div class="loading"
         v-if="!infoData">Loading....</div>
    <!-- <div class="top-tips">{{infoData.application_message}}</div> -->
    <van-notice-bar  mode="closeable"> {{infoData.application_message}}</van-notice-bar>
    <div class=""
         style="">
      <!-- <div class="confirm-text">
        <p>Saya menyatakan
          <br>semua informasi
          <br>diatas adalah benar
        </p>
      </div> -->

      <div class="step-mid-info">
        <div class="title">Informasi Pinjaman</div>
        <div class="br"></div>
        <div class="info-list">
          <li>
            <i class="left">Jumlah pinjaman</i>
            <i class="right">Rp {{infoData.application_amount}}</i>
          </li>

          <li>
            <i class="left">Durasi pinjaman</i>
            <i class="right">{{infoData.application_term}} {{dayUnit[infoData.term_unit]}}</i>
          </li>

          <li>
            <i class="left">Rekening penerima</i>
            <i class>{{infoData.bank_account}}</i>
          </li>

        </div>
      </div>

      <div class="confirm-rule">
        <label for="checkboxFlag">
          <input type="checkbox"
                 id="checkboxFlag"
                 v-model="checkboxFlag"
                 style="display:none">
          <i :class="[checkboxFlag?'active':'']"></i>
          Saya setuju dengan
        </label>
        <span class
              @click="showTextFun()">《{{infoData.url_desc}}》</span>
      </div>

      <div class="sub-btn-out">
        <span class="sub-btn"
              @click="toSubmit()">Menyetujui Pinjaman</span>
      </div>

      <BottomTips v-show="!showTips"></BottomTips>
      <!-- <Kefuicon></Kefuicon> -->

      <i class="confirm-tips" v-show="showTips">Pengguna setia. Gunakan produk rekomendasi kami untuk mendapatkan pinjaman yang lebih mudah. Cek terus informasi dari kami </i>

      <x-dialog v-model="textPopTag"
                dialog-transition
                :dialog-style="{'max-width': '95%', width: '100%', height: '90%'}">
        <div class="xiyi-title">
          <!-- <p>{{infoData.url_desc}}</p> -->
          <p style="text-align: center">Perjanjian pinjaman Tunai</p>
          <i @click="textPopTag=false"
             class="iconfont icon-cuowu"></i>
        </div>
        <div style="height: 90%;">
          <iframe :src="infoData.url"
                  style="width:100%;height:100%"
                  frameborder="0"></iframe>
        </div>
      </x-dialog>
    </div>

    <!--gojek pop  -->
    <div class="show-photo-view">
      <confirm v-model="showgojek"
               :show-cancel-button="false"
               :show-confirm-button="false"
               :close-on-confirm="false">
        <div class="show-photo-div">
          <div class="show-photo-div1">
            <img width="50%"
                 src="/static/images/gojek_icon.png"
                 alt>
            <p>Unggah bukti kerja, tingkatkan keberhasilan pinjaman</p>
          </div>
          <div class="show-photo-div2">
            <span class="c1"
                  @click="tourl()">Keluar</span>
            <span class="c2">
              <a style="display: block;color: #fff;"
                 @click="toGojek"
                 :href="jump_url">Unggah ulang</a>
            </span>
          </div>
        </div>
      </confirm>
    </div>

    <!-- showkap flag -->
    <div class="confirm-kap">
      <confirm v-model="showkap"
               :show-confirm-button="false"
               :show-cancel-button="false"
               hide-on-blur
               @on-hide="tourl()">
        <div class="confirm-kapdiv">
          <span class="top">
            <img src="/static/images/topdasd.png"
                 alt>
            <em>Selamat, info pinjaman
              <br>sudah lengkap.
            </em>
          </span>
          <p>
            Unggah bukti kerja, tingkatkan tingkat keberhasilan sampai
            <i>80%</i>.
          </p>
          <span class="sub-btn"
                @click="$router.replace({path: '/toselect', query:{order_no: $route.query.order_no || ''}})">Unggah Sekarang</span>
        </div>
      </confirm>
    </div>

    <!--到选填页面 -->
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

  </div>
</template>
<script>
import { XDialog, Confirm } from "vux";
import baseinfo from "../request/baseinfo";
import { toNext, toNexturl } from "./tonext";
import devinfo from "../request/devinfo";
export default {
  name: "BindBankCard",
  components: {
    XDialog,
    Confirm
  },
  data() {
    return {
      textPopTag: false,
      checkboxFlag: false,
      infoData: "",
      showkap: false,

      showgojek: false,
      jump_url: '',

      topageflag: false,

      dayUnit: ["", "Hari", "Bulan", "Tahun"],

      showTips:false
    };
  },

  async created() {
    await toNext(this);
    this.getDataPage();
    try {
      Cashcash.eventTrack('contract_view');
    } catch (e) {
    }
  },
  mounted() {
    Cashcash.doShowBack(true, '');
  },
  methods: {
    showTextFun() {
      this.textPopTag = true;
    },

    tourl() {
      this.$router.replace({
        path: "/PayStep1",
        query: {
          order_no: this.$route.query.order_no || "",
          pro_code: 0
        }
      });
    },

    async toGojek() {
      let info = await this.axios.post("/user/add-user-social", { order_no: this.$route.query.order_no, taskType: 'gojek' })
    },

    async getDataPage() {
      this.showTips = baseinfo.appid == '10001'
      let info = await this.axios.post("/loan-info/get-contract", {
        order_no: this.$route.query.order_no,
        contract_page: 1,
        order_base: {
          application_amount: devinfo.application_amount || '',
          application_term: devinfo.application_term || '',
          is_reloan: devinfo.is_reloan || '',
          // product_id :devinfo.product_id;
          product_name: devinfo.product_name || '',
        }
      });
      if (info.code === 0) {
        this.infoData = info.data;
        if (this.infoData.optional_process == 1) {
          let cc = parseInt(localStorage.getItem(`${this.infoData.order_no}-optional_process1`) || 0) + 1
          localStorage.setItem(`${this.infoData.order_no}-optional_process1`, cc);
          if (localStorage.getItem(`${this.infoData.order_no}-optional_process1`) < 2) {
            this.topageflag = true
          }
        }

      } else {
        this.$vux.toast.show({ text: info.code + info.message, type: "text" });
      }
      this.$vux.loading.hide();
    },

    async toSubmit() {
      if (!this.checkboxFlag) {
        this.$vux.toast.show({
          text:
            "Hanya setelah menyetujui perjanjian kamu bisa melakukan peminjaman",
          type: "text",
          position: "middle",
          width: "80%"
        });
        return;
      }
      try {
        Cashcash.eventTrack('contract_next_click');
      } catch (e) {
      }
      let data = {
        order_base: {}
      };


      data.order_base.application_amount = devinfo.application_amount;
      data.order_base.application_term = devinfo.application_term;
      data.order_base.is_reloan = devinfo.is_reloan;
      // data.order_base.product_id =devinfo.product_id;
      data.order_base.product_name = devinfo.product_name;

      data.order_no = this.$route.query.order_no;
      data.pro_code = this.$route.query.pro_code || 9000;
      data.order_type = this.$route.query.order_type || 0;
      // alert(JSON.stringify(data))
      if (baseinfo.appid == '10000') {
        this.$vux.loading.show({ text: "Loading" });
        let info = await this.axios.post("/order/order-confirmation", data);
        // alert(JSON.stringify(info))
        if (info.code === 0) {
          this.$vux.loading.hide();
          this.showkap = true
        } else {
          this.$vux.loading.hide();
          this.$vux.toast.show({ text: `${info.code}`, type: "text" });
        }
        // this.$vux.loading.hide();
      }
      // else if (baseinfo.appid == '20000' || baseinfo.appid == '90000') { // cashx 和 pl
      //   this.$vux.loading.show({ text: "Loading" });
      //   let info = await this.axios.post("/order/order-confirmation", data);
      //   // alert(JSON.stringify(info))
      //   if (info.code === 0) {
      //     this.$vux.loading.hide();
      //     this.$router.replace({
      //       path: "/Gojek",
      //       query: {
      //         order_no: this.$route.query.order_no,
      //       }
      //     });
      //     // if (baseinfo.app_package == 'com.firestorm.sea.du') {
      //     //   this.$router.replace({
      //     //     path: "/Gojek",
      //     //     query: {
      //     //       order_no: this.$route.query.order_no,
      //     //     }
      //     //   });

      //     // } else {
      //     //   this.showgojek = true
      //     //   this.jump_url = info.data.jump_url
      //     // }

      //   } else {
      //     this.$vux.loading.hide();
      //     this.$vux.toast.show({ text: `${info.code}`, type: "text" });
      //   }
      // }
      else {
        toNexturl(this, "/order/order-confirmation", data, devinfo.appid);
      }


    }
  }
};
</script>
