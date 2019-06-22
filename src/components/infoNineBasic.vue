<template>
  <div>
    <!-- <cell title="Informasi Utama" style="padding-left: 6px;" class="home-navbar" is-link>
        <i slot="icon" class="home-navbar-icon" >
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' fill='#fff'/></svg>
        </i>
    </cell>-->
    <div class="loading"
         v-if="!infoList">Loading....
      <!-- <img src="/static/images/loading.svg" alt="">  -->
    </div>
    <div style="padding: 10%;text-align: center;"
         v-if="infoList&&infoList.length==0">No Something</div>
    <!-- <div class="top-tips" v-if="hasvalflag&&refill_type!==1">Informasi ini akan digunakan untuk pengajuan pinjaman Anda, pastikan informasi sebenar benarnya</div> -->
    <!-- <div class="top-tips" v-if="refill_type===1">Silahkan isi informasi dengan sebenar benarnya, tingkat keberhasilan pinjaman meningkat hingga 20%</div> -->
    <div class="info-main">
      <!-- <div class="" v-if="refill_type===1" style=" font-size: 14px;padding: 20px 0px 10px;text-align: left;">
        <p>Mohon foto ulang bagian depan KTP pada kotak di bawah dan coba verifikasi wajah kembali.</p>
      </div>-->
      <div v-for="(item,index) in infoList"
           :key="index"
           :class="[item.input_type=='image'? 'photo-list':'',item.input_type=='image'&&!hasimgflag&&refill_type!==1 ?'photo-list-p':'']">
        <div class="mgt10 info-div"
             v-if="item.input_type=='text'">
          <!-- <p v-if="item.has_val&&item.code=='user_name'&&refill_type!==1"
             style="color: #ccc;">{{item.title}}</p>
          <p v-else>
            {{item.title}}
            <font style="color: #999;"
                  v-if="item.code=='user_name'">(Tidak dapat diubah)</font>
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p> -->
          <!-- readonly -->
          <input class="inp"
                 type="text"
                 v-model="item[item.code]"
                 v-if="item.has_val&&item.code=='user_name'&&refill_type!==1"
                 readonly
                 style="color: #000;"
                 :placeholder="item.title ">
          <input class="inp"
                 type="text"
                 @blur="blurFun(item)"
                 v-model="item[item.code]"
                 v-else
                 :placeholder="item.title ">
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='phone'||item.input_type=='number'">
          <!-- <p v-if="item.has_val&&(item.code=='user_mobile'||item.code=='user_idcard')&&refill_type!==1"
             style="color: #ccc;">{{item.title}}</p>
          <p v-else>
            {{item.title}}
            <font style="color: #999;"
                  v-if="item.code=='user_mobile'||item.code=='user_idcard'">(Tidak dapat diubah)</font>
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p> -->
          <!--  readonly -->
          <input class="inp"
                 type="number"
                 v-model="item[item.code]"
                 v-if="item.has_val&&(item.code=='user_mobile'||item.code=='user_idcard')&&refill_type!==1"
                 readonly
                 style="color: #000;"
                 :placeholder="item.title ">
          <input class="inp"
                 type="number"
                 @blur="blurFun(item)"
                 v-model="item[item.code]"
                 v-else
                 :placeholder="item.title ">
          <i v-if="(item.check_type=='phone'||item.check_type=='telephone_or_phone')&&!(item.has_val&&(item.code=='user_mobile'||item.code=='user_idcard'))"
             @click="toselectTel(index)"
             class="icon-right-addtel iconfont icon-yuanquanjiahao"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select'">
          <!-- <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p> -->
          <popup-picker class="inp"
                        value-text-align="left"
                        @on-change="blurFun(item)"
                        cancel-text="Batal"
                        confirm-text="Konfirmasi"
                        v-model="item[item.code]"
                        :data="[item.valueArr]"
                        :placeholder="item.title "></popup-picker>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='date'">
          <!-- <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p> -->
          <!-- <popup-picker class="inp" value-text-align='left' @on-change="blurFun(item)" :data='item.value' cancel-text='Batal' confirm-text='Konfirmasi' v-model="item[item.code]" :placeholder="item.example_val "></popup-picker> -->
          <datetime @on-change="blurFun(item)"
                    :default-selected-value="`${new Date()}`"
                    class="inp"
                    value-text-align="left"
                    :min-year="1900"
                    cancel-text="Batal"
                    format="DD-MM-YYYY"
                    confirm-text="Konfirmasi"
                    v-model="item[item.code]"
                    :placeholder="item.title "></datetime>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select_province'||item.input_type=='select_city'||item.input_type=='select_large_district'||item.input_type=='select_small_district'">
          <!-- <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p> -->
          <popup-picker class="inp"
                        value-text-align="left"
                        :data="item.value"
                        v-if="item.value[0]&&item.value[0].length>0"
                        cancel-text="Batal"
                        confirm-text="Konfirmasi"
                        v-model="item[item.code]"
                        @on-change="todoaddress(item.input_type,'',index)"
                        show-name
                        :placeholder="item.title "></popup-picker>
          <div @click="todoaddress(item.input_type,1)"
               v-else>
            <popup-picker class="inp"
                          value-text-align="left"
                          :data="item.value"
                          disabled
                          cancel-text="Batal"
                          show-name
                          :placeholder="item.title "></popup-picker>
          </div>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div1"
             v-if="item.input_type=='radio'">
          <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
          <span>
            <Radio :options="item.value"
                   v-model="item[item.code]"
                   @on-change="togetVal(item,item[item.code])"></Radio>
          </span>
        </div>

        <div class="info-div titonly"
             v-if="item.input_type=='image'&&item.code=='idcard_image_front'&&!hasimgflag&&refill_type!==1">
          <p>Unggah KTP anda dan dapatkan bonus Rp 1000</p>
        </div>

        <li v-if="item.input_type=='image'&&item.code=='idcard_image_front'">
          <i v-if="item[item.code]">
            <img width="100%"
                 :src="item[item.code]"
                 @click="showphotofun(toOpenCammerFront,item[item.code])"
                 alt>
          </i>
          <i v-else
             @click="toOpenCammerFront">
            <em class="iconfont icon-Photo"></em>
          </i>
          <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
        </li>

        <li v-if="item.input_type=='image'&&item.code=='idcard_image_reverse_side'">
          <i v-if="item[item.code]">
            <img width="100%"
                 :src="item[item.code]"
                 @click="showphotofun(toOpenCammerSide,item[item.code])"
                 alt>
          </i>
          <i v-else
             @click="toOpenCammerSide">
            <em class="iconfont icon-Photo"></em>
          </i>
          <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
        </li>

        <li v-if="item.input_type=='image'&&item.code=='idcard_image_hand'">
          <i v-if="item[item.code]">
            <img width="100%"
                 :src="item[item.code]"
                 @click="showphotofun(toOpenCammerHand,item[item.code])"
                 alt>
          </i>
          <i v-else
             @click="toOpenCammerHand">
            <em class="iconfont icon-Photo"></em>
          </i>
          <p>
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
        </li>
      </div>

      <!-- <div class="info-div1 mgt10">
            <p>Nomor Telepon</p>
           <span>
               543613654136
           </span>
      </div>-->
      <!-- <div class="info-div mgt10">
            <input class="inp" type="text" placeholder="Silahkan isi alamat lengkap">
            <div class="br"></div>
      </div>-->
      <!-- <div class="mgt10 info-div2">
            <p>No KTP</p>
             <div>6541643478864688467</div>
             <div class="br"></div>
      </div>-->
      <div class="sub-btn-out"
           v-if="infoList&&infoList.length>0">
        <!-- <span v-if="hasvalflag&&refill_type!==1" class="sub-btn" @click="toshowConfirm()">
          Lanjut
        </span>-->
        <span class="sub-btn"
              @click="toSubmit(1)">Lanjut</span>
      </div>

      <!-- <BottomTips></BottomTips> -->
      <!--<Kefuicon></Kefuicon> -->
    </div>

    <div class="show-photo-view">
      <confirm v-model="showphoto"
               :show-cancel-button="false"
               :show-confirm-button="false"
               :close-on-confirm="false">
        <div class="show-photo-div">
          <div class="show-photo-div1">
            <img width="100%"
                 :src="showphotoVal.url"
                 alt>
            <p>Foto ktp yang jelas akan meningkatkan tingkat persetujuan sebesar 20%</p>
          </div>

          <div class="show-photo-div2">
            <span @click="showphoto=false"
                  class="c1">Keluar</span>
            <span class="c2"
                  @click="showphoto=false,showphotoVal.funname()">Unggah ulang</span>
          </div>
        </div>
      </confirm>
    </div>

    <!-- confirm -->
    <div class="confirm-divmain">
      <confirm v-model="showconfirm"
               :close-on-confirm="false"
               cancel-text="Ubah"
               confirm-text="Yakin"
               @on-confirm="toSubmit()">
        <div class="confirm-div">
          <div class="confirm-div1">Konfirmasi Informasi KTP</div>
          <div class="br"></div>
          <div class="confirm-div2">
            <p v-for="(item,index) in infoList"
               :key="index"
               v-if="item.code=='user_name'||item.code=='user_idcard'">
              <i>{{item.title}}</i>
              {{item[item.code]}}
            </p>

            <em>Pastikan informasi benar, setelah konfirmasi tidak dapat diubah lagi.</em>
          </div>
        </div>
      </confirm>
    </div>
  </div>
</template>
<style scoped>
.titonly {
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  top: 0;
  width: 300%;
}
.photo-list-p {
  padding-top: 30px;
  position: relative;
}
</style>


<script>
import { PopupPicker, Confirm, Datetime } from "vux";
import Radio from "./Radio";
import devinfo from "../request/devinfo";
import { toNext, toNexturl, getData, tocheckVal, todoaddress } from "./tonext";

const vm = {
  name: "BasicInfo",
  components: {
    PopupPicker,
    Radio,
    Datetime,
    Confirm
  },
  data() {
    return {
      // 表项目list
      infoList: '',
      o_push: "",
      device_conf: "",
      sub_url: "",
      refill_type: '',  // 是否重填字段
      imgkind: '',
      proInfo: "",
      hasvalflag: false,
      hasimgflag: false,
      showconfirm: false,
      showphoto: false,
      showphotoVal: {
        url: '',
        funname: ""
      },
      // showkap: true,
    };
  },

  async created() {
    // await toNext(this);
    getData(this, "/user/get-loan-field");
    // this.getProinfo();
    try {
      AndroidH.eventTrack('info_basic_view');
    } catch (e) {
    }
  },
  mounted() {
    if (this.refill_type === 1) {
      try {
        AndroidH.doShowBack(true, 'Jika Anda mengisi informasi, Anda dapat meminjam uang. Yakin ingin keluar?');
      } catch (e) {
        AndroidH.doShowBack(true)
      }
    } else {
      try {
        // AndroidH.doShowBack(true, 'Cukup isi informasi sekali untuk mengajukan beberapa produk');
        AndroidH.doShowBack(true, 'Hanya 1 tahap lagi Anda bisa mendapatkan pinjaman, Anda yakin ingin keluar ?');
      } catch (e) {
        AndroidH.doShowBack(true)
      }
    }

    window["GetIDCardFrontImg"] = url => {
      for (let i = 0, n = this.infoList.length; i < n; i++) {
        if (this.infoList[i].code == "idcard_image_front") {
          this.infoList[i][this.infoList[i].code] = url.image_path;
          this.touplodimg(url.image_path);
          this.blurFun(this.infoList[i])
        }
      }
    };

    window["GetFullPhotoImg"] = url => {
      for (let i = 0, n = this.infoList.length; i < n; i++) {
        if (this.infoList[i].code == "idcard_image_hand") {
          this.infoList[i][this.infoList[i].code] = url.image_path;
          this.blurFun(this.infoList[i])
        }
      }
    };

    window["GetIDCardBackImg"] = url => {
      for (let i = 0, n = this.infoList.length; i < n; i++) {
        if (this.infoList[i].code == "idcard_image_reverse_side") {
          this.infoList[i][this.infoList[i].code] = url.image_path;
          this.blurFun(this.infoList[i])
        }
      }
    };
    window["GetDefaultPhone"] = url => {
      this.infoList[this.imgkind][this.infoList[this.imgkind].code] = ((url.user_number + '').replace(/[^0-9]/ig, ""));
    };
  },
  methods: {
    // 电话号码选着
    toselectTel(index) {
      this.imgkind = index;
      try {
        if (typeof eval(AndroidH.choiseContacts) == "function") {
          AndroidH.choiseContacts();
        }
      } catch (e) {
        alert("Versi anda sekarang versi rendah, tidak bisa menggunakan fitur memilih nomor dari kontak");
      }
    },

    // 点击放大图片
    showphotofun(name, url) {
      this.showphoto = true;
      this.showphotoVal = {
        url: url,
        funname: name
      }
    },

    getProinfo() {
      this.proInfo = JSON.parse(AndroidH.getLoanDeviceInfo());
    },
    //输入监控操作
    async blurFun(item) {
      let info = await this.axios.post('/log/field-value', { pro_code: 11009, order_no: this.$route.query.order_no || '', field_name: item.code, field_value: JSON.stringify(item[item.code]) });
    },

    async touplodimg(imgurl) {
      let info = await this.axios.post('/order/order-upload-img', { idcard_image_front: imgurl })
    },


    togetVal(item, val) {
      item[item.code] = val;
      this.blurFun(item)
    },

    toOpenCammerFront() {

      try {
        if (typeof eval(AndroidH.uploadIDCardFront) == "function") {
          AndroidH.uploadIDCardFront();
        }
      } catch (e) {
        alert("Versi anda sekarang versi rendah, tidak bisa menggunakan fitur memilih nomor dari kontak");
      }

    },
    toOpenCammerSide() {

      try {
        if (typeof eval(AndroidH.uploadIDCardBack) == "function") {
          AndroidH.uploadIDCardBack();
        }
      } catch (e) {
        alert("Versi anda sekarang versi rendah, tidak bisa menggunakan fitur memilih nomor dari kontak");
      }

    },
    toOpenCammerHand() {
      try {
        if (typeof eval(AndroidH.uploadFullPhoto) == "function") {
          AndroidH.uploadFullPhoto();
        }
      } catch (e) {
        alert("Versi anda sekarang versi rendah, tidak bisa menggunakan fitur memilih nomor dari kontak");
      }
      // AndroidH.uploadFullPhoto();
    },

    todoaddress(type, kind, index) {
      todoaddress(type, this, kind, index);
    },

    async toshowConfirm() {
      if ((await tocheckVal(this)) === false) return;
      this.showconfirm = true;
    },

    async toSubmit(type) {
      gtag('event', 'ninebasicinfo_page_submit', {
        value: 1,
      });
      if (type == 1) {
        if ((await tocheckVal(this)) === false) return;
      }
      // 埋点统计上报
      try {
        AndroidH.eventTrack('info_ninebasicinfo_click');
      } catch (e) {

      }
      let data = {
        // order: {},
        // order_base: {}
      };
      this.infoList.forEach(v => {
        data[v.code] = v[v.code];
        if (v.input_type == "select") {
          v.value.forEach((s, i) => {
            if (s.text == v[v.code].join("")) {
              data[v.code] = s.value;
            }
          });
        }
        // if (v.input_type == "date") {
        //   data.order[v.code] = `${v[v.code][0]}-${v[v.code][1]}-${
        //     v[v.code][2]
        //     }`;
        //   // new Date(
        //   //   `${v[v.code][0]}-${v[v.code][1]}-${v[v.code][2]}`
        //   // ).valueOf() / 1000;
        // }

        if (data[v.code] instanceof Array) {
          data[v.code] = data[v.code].join("");
        }
      });
      data.appid = '10000';
      data.urltype = this.$route.query.urltype || 1;
      this.$vux.loading.show({ text: "Loading" });
      let info = await this.axios.post("/user/update-loan-field", data);
      // alert(JSON.stringify(info))
      if (info.code === 0) {
        this.$vux.loading.hide();
        let name = location.origin

        if (this.$route.query.urltype == 1) {
          // if(devinfo.app_package=='com.beard.starfish'||devinfo.app_package=='com.blade.ice'){
            if(devinfo.app_package=='com.ahudianna.skad'||devinfo.app_package=='com.blade.ice'){
            AndroidH.finishWeb();
          }else {
            location.href = `${name}/loss_activity/#/loannum`
          }

        }
        if (this.$route.query.urltype == 2) {

          location.href = `${name}/loss_activity`
        }
        if (this.$route.query.urltype == 3) {

          location.href = `${name}/loss_activity/#/cday`
        }

      } else {
        this.$vux.loading.hide();
        this.$vux.toast.show({ text: `${info.code}${info.message}`, type: "text" });
      }

    }
  }
};
export default vm;
</script>

