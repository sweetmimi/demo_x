<template>
  <div>
    <!-- 开始 跳转 -->
    <div class="loading"
         v-if="!infoList">Loading....</div>

    <div class="top-tips">
      <p>1. Unggah bukti kerja, 80% pinjaman berhasil.</p>
      <!-- <p>2. Cukup unggah 1 bukti kerja saja untuk diproses.</p> -->
    </div>
    <div class="info-main">
      <!-- {{prArr}} -->
      <div class>
        <!-- <div class="br"></div> -->
        <div class
             v-for="(item,index) in infoList"
             :key="index"
             @click="toOpenFun(item,index)">
          <div class
               v-if="item.input_type == 'photo'||item.input_type == 'album'">
            <div class="list-toselect-div1">
              <span style=" width: 80%;">
                <p>
                  {{item.title}}
                  <em class="red1"
                      v-if="item.required ==='1'">*</em>
                </p>
                <em @click.stop="tourl(item,index)">contoh</em>
                <span v-if="item.input_val"
                      class="exa_img"
                      @click.stop="showpic(item.input_val)">
                  <img :src="item.input_val"
                       alt>
                </span>
              </span>

              <span>
                <i v-if="item.input_val"
                   class="right iconfont icon-right-1"></i>
                <i class="right iconfont icon-youjiantou"></i>
              </span>
            </div>
            <div class="br"></div>
          </div>

          <div class
               v-if="item.input_type == 'number'">
            <div class="list-toselect-div1"
                 @click.stop="tourl(item,index)">
              <span style=" width: 80%;">
                <p>
                  {{item.title}}
                  <em class="red1"
                      v-if="item.required ==='1'">*</em>
                </p>
              </span>

              <span>
                <span style="color:#999">{{item.input_val}}</span>
                <i class="right iconfont icon-youjiantou"></i>
              </span>
            </div>
            <div class="br"></div>
          </div>
        </div>

      </div>

      <div class="sub-btn-out">
        <span class="sub-btn"
              @click="toSubmit">Kembali</span>
      </div>

      <BottomTips></BottomTips>
    </div>

    <div class="pop-div">
      <popup v-model="showpopflag"
             style="background: #fff"
             position="bottom"
             height="80%"
             @on-hide="closepop">
        <div class>
          <div class="shc-div"
               v-if="typenum=='work_permit_img'">
            <p>Unggah foto Kartu Karyawan. Jika tidak ada, unggah foto anda mengenakan seragam.</p>
            <img src="/static/images/zj_img1.jpg"
                 alt>
          </div>

          <div class="shc-div"
               v-if="typenum=='npwp'">
            <!-- <p>Unggah foto Kartu Karyawan. Jika tidak ada, unggah foto anda mengenakan seragam.</p> -->
            <div class="mgt10 info-div">
              <input class="inp"
                     type="number"
                     v-model="inpnum[inpnum.code]"
                     :placeholder="inpnum.title">
              <div class="br"></div>
            </div>
          </div>

          <div class="shc-div"
               v-if="typenum=='driver_license_image'">
            <p>Unggah foto lisensi pengemudi.</p>
            <img src="/static/images/driver.png"
                 alt>
            <!-- 驾照 -->
          </div>

          <!-- <div class="shc-div" v-if="typenum=='bank_img'">
            <p>Silahkan unggah foto bank yang Anda isi.</p>
          <img src="/static/images/zj_img5.png" alt="">-->
          <!--银行卡 -->
          <!-- </div> -->
          <div class="shc-div"
               v-if="typenum=='bank_img'">
            <p>Unggah buku tabungan Anda disertai nama dan nomor rek Bank sesuai data yang diisi.</p>
            <img src="/static/images/zj_img7.jpg"
                 alt>
            <!--存折卡 -->
          </div>

          <div class="shc-div"
               v-if="typenum=='social_security_img'">
            <p>Unggah Foto kartu BPJS.</p>
            <img src="/static/images/zj_img7_pp1.png"
                 alt>
            <!--社保卡 -->
          </div>

          <div class="shc-div"
               v-if="typenum=='family_book_img'">
            <p>Unggah Foto Kartu Keluarga.</p>
            <img src="/static/images/zj_img7_pp2.png"
                 alt>
            <!--户口本 -->
          </div>

          <div class="shc-div"
               v-if="typenum=='credit_card_img'">
            <p>Unggah Foto Kartu Kredit.</p>
            <img src="/static/images/zj_img7_pp3.png"
                 alt>
            <!--信用卡 -->
          </div>

          <div class="shc-div"
               v-if="typenum=='money_book_img'">
            <p>Unggah Foto Tabungan.</p>
            <img src="/static/images/zj_img7_pp4.png"
                 alt>
            <!--存折照片 -->
          </div>

          <div class="shc-div"
               v-if="typenum=='npwp_img'">
            <p>Unggah Foto npwp.</p>
            <img src="/static/images/zj_img7_pp5.png"
                 alt>
            <!--税卡照片 -->
          </div>

          <div class="shc-div"
               v-if="typenum=='work_npwp_card_img'">
            <p>Ungah bukti bahwa anda memiliki aktivitas bekerja sehari-hari.</p>
            <img src="/static/images/zj_img6.png"
                 alt>
            <!--/税卡/员工卡 /工资单 -->
          </div>

          <div class="shc-div"
               v-if="typenum=='bank_statement_img'||typenum=='bank_wage_water'">
            <p>Unggah foto bukti transfer gaji dari rekening bank anda.</p>

            <img src="/static/images/zj_img2.jpg"
                 alt>
          </div>

          <div class="shc-div"
               v-if="typenum=='payroll_img'||typenum=='payroll'">
            <p>Unggah foto slip gaji yang diberikan oleh kantor.</p>
            <img src="/static/images/zj_img3.jpg"
                 alt>
          </div>

          <div class="shc-div"
               v-if="typenum=='work_proof_img'">
            <p>Unggah foto yang menunjukan kamu memiliki pekerjaan.</p>
            <img src="/static/images/job_about.png"
                 alt>
          </div>

          <div class="shc-div"
               v-if="typenum=='wage_proof'">
            <p>Unggah foto yang menunjukan kamu memiliki pekerjaan.</p>
            <img src="/static/images/job_about.png"
                 alt>
          </div>

          <div class="sub-btn-out"
               style="width: 80%;  margin-top: 20px;">
            <span class="sub-btn"
                  v-if="typenum=='npwp'"
                  @click="toconfimfun">Konfirmasi</span>
            <span class="sub-btn"
                  @click="toOpenFun1(typenum)"
                  v-else>Ambil Foto</span>
          </div>

          <!-- <div class="sub-btn-out" style="width: 80%">
            <span style=" background: #ccc;margin-top: -15px;" class="sub-btn" @click="closepop">
              Batal
            </span>
          </div>-->
          <div style="height: 10px;"></div>
        </div>
      </popup>
    </div>
    <!-- <Kefuicon></Kefuicon> -->

    <x-dialog v-model="showHideOnBlur"
              scroll
              hide-on-blur
              :dialog-style="{'max-width': '100%','padding':'5px'}">
      <div>
        <img :src="srcurl"
             style="max-width:100%">
      </div>
      <div @click="showHideOnBlur=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>
  </div>
</template>
<style scoped>
.shc-div {
  padding: 20px;
  text-align: center;
}
.shc-div img {
  max-height: 240px;
  max-width: 100%;
}
.shc-div p {
  font-size: 14px;
  margin-bottom: 20px;
  text-align: left;
}
</style>


<script>
import baseinfo from "../request/baseinfo";
import devinfo from "../request/devinfo";
import { Popup, XDialog } from "vux";
import { toNext, toNexturl, getData, tocheckVal, todoaddress } from "./tonext";
export default {
  name: "Step",
  components: {
    Popup,
    XDialog
  },

  data() {
    return {
      // titArr: ['Job card', 'payroll', 'Work certificate issued by the company', 'Bank statement screenshot', 'Other supporting documents'],
      // 表项目list
      infoList: '',
      o_push: "",
      sub_url: "",
      imgkind: "",

      showpopflag: false,
      typenum: '',

      srcurl: '',
      showHideOnBlur: false,

      inpnum: {},

    };
  },

  created() {

    let cc = [{
      "title": "Foto Laporan Bank", // 银行流水
      "code": "bank_wage_water",
      "bank_wage_water": '',
      "required": "0",
      "input_type": "photo",
      "input_val": "",
      "check_type": "text",
      "example_val": "",
      "value": []
    }, {
      "title": "Foto Slip Gaji", //工资单
      "code": "payroll",
      "payroll": '',
      "required": "0",
      "input_type": "photo",
      "input_val": "",
      "check_type": "text",
      "example_val": "",
      "value": []
    }, {
      "title": "Surat pernyataan dari kantor",//工作证明
      "code": "wage_proof",
      "wage_proof": '',
      "required": "0",
      "input_type": "photo",
      "input_val": "",
      "check_type": "text",
      "example_val": "",
      "value": []
    }, {
      "title": "Foto SIM",
      "code": "driver_license_image", // 驾照
      "driver_license_image": '',
      "required": "0",
      "input_type": "photo",
      "input_val": "",
      "check_type": "text",
      "example_val": "",
      "value": []
    }]
    if (baseinfo.appid == '10000') {
      this.infoList = cc
    } else {
      getData(this, "/loan-info/optional");

    }

  },
  mounted() {
    try {
      Cashcash.doShowBack(true, 'Unggah bukti pekerjaan untuk tingkatkan keberhasilan pinjaman hingga 80%，Anda yakin mau keluar? ');
    } catch (e) {
      Cashcash.doShowBack(true);
    }

    //  获取相机图片
    window["GetDefaultCameraImg"] = url => {
      if (url.image_path) {
        this.infoList[this.imgkind][this.infoList[this.imgkind].code] = url.image_path;
        this.infoList[this.imgkind].input_val = url.image_path;
        this.blurFun(this.infoList[this.imgkind])
        this.closepop()
      } else {
        alert('未能获取到图片')
      }

    };

    //  获取相册图片
    window["GetDefaultAlbumImg"] = url => {
      if (url.image_path) {
        this.infoList[this.imgkind][this.infoList[this.imgkind].code] = url.image_path;
        this.infoList[this.imgkind].input_val = url.image_path;
        this.blurFun(this.infoList[this.imgkind])
        this.closepop()
      } else {
        alert('未能获取到图片')
      }
    };

  },
  methods: {

    showpic(c) {
      this.srcurl = c;
      this.showHideOnBlur = true;
    },

    //输入监控操作
    async blurFun(item) {
      let info = await this.axios.post('/log/field-value',
        { pro_code: 8500, order_no: this.$route.query.order_no || '', field_name: item.code, field_value: JSON.stringify(item[item.code]) }
      );
    },

    async toSubmit() {
      if ((await tocheckVal(this)) === false) return;
      let data = {
        order: {},
        order_base: {}
      };
      let cc = this.infoList.some(v => {
        return v[v.code] !== ''
      })
      if (baseinfo.appid != '10000' || baseinfo.appid != '20001') {
        if (!cc) {
          this.$vux.toast.show({
            text: 'Mohon unggah minimal 1 bukti pekerjaan', type: "text", position: "middle", width: "80%"
          });
          return
        }
      }
      this.infoList.forEach(v => {
        data.order[v.code] = v[v.code];
      });
      if (data.order.npwp && !/^[0-9]*$/.test(data.order.npwp)) {
        this.$vux.toast.show({
          text: 'Npwp Hanya dapat mengisi angka', type: "text", position: "middle", width: "80%"
        });
        return
      }
      data.order_no = this.$route.query.order_no;
      data.pro_code = this.$route.query.pro_code || 8500;
      data.order_type = this.$route.query.order_type || 0;

      data.order_base.application_amount = devinfo.application_amount;
      data.order_base.application_term = devinfo.application_term;
      data.order_base.is_reloan = devinfo.is_reloan;
      // data.order_base.product_id =devinfo.product_id;
      data.order_base.product_name = devinfo.product_name;
      // alert(JSON.stringify(data))
      // return
      data.o_push = this.o_push;
      if (baseinfo.appid == '10000') {
        toNexturl(this, this.sub_url || "/order/order-change-info", data);
      } else {
        toNexturl(this, this.sub_url || "/order/order-supply-info", data);
      }

    },

    // 打开相机
    toOpenFun(item, index) {
      this.imgkind = index;
      if (item.input_type == 'photo') {
        try {
          if (typeof eval(Cashcash.defaultCamera) == "function") {
            Cashcash.defaultCamera();
          }
        } catch (e) {
          alert("Versi anda sekarang versi rendah, tidak bisa menggunakan fitur memilih nomor dari kontak");
        }

      }
      if (item.input_type == 'album') {
        try {
          if (typeof eval(Cashcash.openAlbum) == "function") {
            Cashcash.openAlbum()
          } else {
            Cashcash.defaultCamera();
          }
        } catch (e) {
          Cashcash.defaultCamera();
        }

      }
    },
    toOpenFun1(typenum) {
      if (typenum == 'bank_statement_img') {
        try {
          if (typeof eval(Cashcash.openAlbum) == "function") {
            Cashcash.openAlbum()
          } else {
            Cashcash.defaultCamera();
          }
        } catch (e) {
          Cashcash.defaultCamera();
        }

      } else {
        try {
          if (typeof eval(Cashcash.defaultCamera) == "function") {
            Cashcash.defaultCamera();
          }
        } catch (e) {
          alert("Versi anda sekarang versi rendah, tidak bisa menggunakan fitur memilih nomor dari kontak");
        }
      }
    },

    closepop() {
      this.imgkind = '';
      this.showpopflag = false;
      this.typenum = '';
      this.inpnum = {};
    },

    toconfimfun() {
      // alert(this.inpnum[this.inpnum.code])
      if (this.inpnum[this.inpnum.code] && /^[0-9]*$/.test(this.inpnum[this.inpnum.code])) {
        this.infoList[this.imgkind][this.infoList[this.imgkind].code] = this.inpnum[this.inpnum.code];
        this.infoList[this.imgkind].input_val = this.inpnum[this.inpnum.code];
        this.blurFun(this.infoList[this.imgkind])
        this.closepop()
      } else {
        alert('Hanya dapat mengisi angka')
      }
    },

    tourl(item, index) {
      this.imgkind = index;
      this.showpopflag = true;
      this.typenum = item.code;
      this.inpnum = item;
    }


  }
  // methods end
};
</script>


