<template>
  <div>

    <div class="loading"
         v-if="!infoList">Loading....
      <!-- <img src="/static/images/loading.svg" alt="">  -->
    </div>
    <!-- 头部提示 -->
    <!-- <div class="top-tips"
         v-if="!hasvalflag&&refill_type!==1">Lengkapi informasi, keberhasilan pinjaman meningkat sampai 30%</div>
    <div class="top-tips"
         v-if="hasvalflag&&refill_type!==1">Informasi ini akan digunakan untuk pengajuan pinjaman Anda, pastikan informasi sebenar benarnya</div>
    <div class="top-tips"
         v-if="refill_type===1">Silahkan isi informasi dengan sebenar benarnya, tingkat keberhasilan pinjaman meningkat hingga 20%</div> -->
    <van-notice-bar v-if="!hasvalflag&&refill_type!==1" mode="closeable">Lengkapi informasi, keberhasilan pinjaman meningkat sampai 30%</van-notice-bar>
    <van-notice-bar v-if="hasvalflag&&refill_type!==1" mode="closeable">Informasi ini akan digunakan untuk pengajuan pinjaman Anda, pastikan informasi sebenar benarnya</van-notice-bar>
    <van-notice-bar v-if="refill_type===1" mode="closeable">Silahkan isi informasi dengan sebenar benarnya, tingkat keberhasilan pinjaman meningkat hingga 20%</van-notice-bar>
    <div class="info-main">
      <!-- <div class="" v-if="refill_type===1" style=" font-size: 14px;padding: 20px 0px 10px;text-align: left;">
        <p>Mohon foto ulang bagian depan KTP pada kotak di bawah dan coba verifikasi wajah kembali.</p>
      </div> -->

      <div v-for="(item,index) in infoList"
           :key="index"
           :class="[item.input_type=='image'? 'photo-list':'',item.input_type=='image'&&!hasimgflag&&refill_type!==1 ?'photo-list-p':'']">

        <div class="mgt10 info-div"
             v-if="item.input_type=='text'">
          <!-- <p v-if="item.has_val&&item.code=='user_name'&&refill_type!==1"
             style="color: #ccc;">{{item.title}}</p>
          <p v-else
             :style="{color: item.vFlag===true?'red':'' }">{{item.title}}
            <font style="color: #999;"
                  v-if="item.code=='user_name'">(Tidak dapat diubah)</font>
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p> -->

          <input class="inp"
                 type="text"
                 v-model="item[item.code]"
                 v-if="item.has_val&&item.code=='user_name'&&refill_type!==1"
                 readonly
                 style="color: #000;"
                 placeholder="Nama Lengkap">
          <input class="inp"
                 type="text"
                 @blur="blurFun(item)"
                 @focus="focusFun(item)"
                 v-model="item[item.code]"
                 v-else
                 :placeholder="item.title">
          <div :class="[ item.vFlag===true ? 'br-red' : 'br']"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='phone'||item.input_type=='number'||item.input_type=='tel'">

          <!-- <p v-if="item.has_val&&(item.code=='user_mobile'||item.code=='user_idcard')&&refill_type!==1"
             style="color: #ccc;">{{item.title}}</p>
          <p v-else
             :style="{color: item.vFlag===true?'red':'' }">{{item.title}}
            <font style="color: #999;"
                  v-if="item.code=='user_mobile'||item.code=='user_idcard'">(Tidak dapat diubah)</font>
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p> -->
          <input class="inp"
                 type="tel"
                 v-model="item[item.code]"
                 v-if="item.has_val&&(item.code=='user_mobile'||item.code=='user_idcard')&&refill_type!==1"
                 readonly
                 style="color: #000;"
                 :placeholder="item.title">
          <input class="inp"
                 type="tel"
                 @blur="blurFun(item)"
                 @focus="focusFun(item)"
                 v-model="item[item.code]"
                 v-else
                 :placeholder="item.title ">
          <i v-if="(item.check_type=='phone'||item.check_type=='telephone_or_phone')&&!(item.has_val&&(item.code=='user_mobile'||item.code=='user_idcard'))"
             @click="toselectTel(index)"
             class="icon-right-addtel iconfont icon-yuanquanjiahao"></i>
          <div :class="[ item.vFlag===true ? 'br-red' : 'br']"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select'">
          <!-- <p :style="{color: item.vFlag===true?'red':'' }">{{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>

          </p> -->
          <popup-picker class="inp"
                        value-text-align='left'
                        @on-change="blurFun(item)"
                        cancel-text='Batal'
                        readonly
                        confirm-text='Konfirmasi'
                        v-model="item[item.code]"
                        :data="[item.valueArr]"
                        :placeholder="item.title "></popup-picker>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div :class="[ item.vFlag===true ? 'br-red' : 'br']"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='date'">
          <!-- <p :style="{color: item.vFlag===true?'red':'' }">{{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>

          </p> -->
          <!-- <popup-picker class="inp" value-text-align='left' @on-change="blurFun(item)" :data='item.value' cancel-text='Batal' confirm-text='Konfirmasi' v-model="item[item.code]" :placeholder="item.example_val "></popup-picker> -->
          <datetime @on-change="blurFun(item)"
                    :default-selected-value='`${new Date()}`'
                    class="inp"
                    value-text-align='left'
                    :min-year='1900'
                    cancel-text='Batal'
                    format='DD-MM-YYYY'
                    confirm-text='Konfirmasi'
                    v-model="item[item.code]"
                    :placeholder="item.title "></datetime>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div :class="[ item.vFlag===true ? 'br-red' : 'br']"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select_province'||item.input_type=='select_city'||item.input_type=='select_large_district'||item.input_type=='select_small_district'">
          <!-- <p :style="{color: item.vFlag===true?'red':'' }">{{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>

          </p> -->
          <popup-picker class="inp"
                        value-text-align='left'
                        :data='item.value'
                        v-if="item.value[0]&&item.value[0].length>0"
                        cancel-text='Batal'
                        confirm-text='Konfirmasi'
                        v-model="item[item.code]"
                        @on-change="todoaddress(item.input_type,'',index)"
                        show-name
                        :placeholder="item.title "></popup-picker>
          <div @click="todoaddress(item.input_type,1)"
               v-else>
            <popup-picker class="inp"
                          value-text-align='left'
                          :data='item.value'
                          disabled
                          cancel-text='Batal'
                          show-name
                          :placeholder="item.title "></popup-picker>
          </div>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div :class="[ item.vFlag===true ? 'br-red' : 'br']"></div>
        </div>

        <div class="mgt10  info-div1"
             v-if="item.input_type=='radio'">
          <p>{{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>

          </p>
          <span>
            <Radio :options='item.value'
                   v-model="item[item.code]"
                   @on-change='togetVal(item,item[item.code])'></Radio>
          </span>
        </div>

        <div class="info-div expers"
             v-if="item.input_type=='image'&&item.code=='idcard_image_front'&&!hasimgflag&&refill_type!==1">
          <p>Unggah KTP anda dan dapatkan bonus Rp 2000
          </p>
        </div>

        <li v-if="item.input_type=='image'&&item.code=='idcard_image_front'">
          <i v-if="item[item.code]"
             @click="showphotofun(toOpenCammerFront,item[item.code])">
            <img width="100%"
                 :src="item[item.code]"
                 alt="">
          </i>
          <i v-else
             @click="toOpenCammerFront">
            <em class="iconfont icon-Photo"></em>
          </i>
          <p>{{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
        </li>

        <li v-if="item.input_type=='image'&&item.code=='idcard_image_reverse_side'">

          <i v-if="item[item.code]"
             @click="showphotofun(toOpenCammerSide,item[item.code])">
            <img width="100%"
                 :src="item[item.code]"
                 alt="">
          </i>
          <i v-else
             @click="toOpenCammerSide">
            <em class="iconfont icon-Photo"></em>
          </i>
          <p>{{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>

          </p>

        </li>

        <li v-if="item.input_type=='image'&&item.code=='idcard_image_hand'">
          <i v-if="item[item.code]"
             @click="showphotofun(toOpenCammerHand,item[item.code])">
            <img width="100%"
                 :src="item[item.code]"
                 alt="">
          </i>
          <i v-else
             @click="toOpenCammerHand">
            <em class="iconfont icon-Photo"></em>
          </i>
          <p>{{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>

          </p>
        </li>

      </div>


      <div class="sub-btn-out"
           v-if="infoList&&infoList.length>0">
        <span v-if="hasvalflag&&refill_type!==1"
              class="sub-btn"
              @click="toshowConfirm()">
          Lanjut
        </span>

        <span v-else
              class="sub-btn"
              @click="toSubmit(1)">
          Lanjut
        </span>

      </div>

      <BottomTips></BottomTips>
      <!-- <Kefuicon></Kefuicon> -->

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
                 alt="">
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
               cancel-text='Ubah'
               confirm-text='Yakin'
               @on-confirm='toSubmit()'>
        <div class="confirm-div">
          <div class="confirm-div1">Konfirmasi Informasi KTP</div>
          <div class="br"></div>
          <div class="confirm-div2">
            <p v-for="(item,index) in infoList"
               :key="index"
               v-if="item.code=='user_name'||item.code=='user_idcard'">
              <i>{{item.title}}</i> {{item[item.code]}}</p>

            <em>Pastikan informasi benar, setelah konfirmasi tidak dapat diubah lagi.</em>
          </div>
        </div>
      </confirm>
    </div>

  </div>
</template>
<style scoped>
.expers {
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
import { toNext, toNexturl, getData, tocheckVal, todoaddress } from "./tonext";
import devinfo from "../request/devinfo";

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
    await toNext(this);
    await getData(this, "/loan-info/get-base-info", 1);

    if (this.refill_type === 1) {
      this.show_idcard_image_front()
    }

    this.getProinfo();
    try {
      Cashcash.eventTrack('info_basic_view');
    } catch (e) {
    }
  },
  mounted() {
    if (this.refill_type === 1) {
      try {
        Cashcash.doShowBack(true, 'Informasi tidak diberikan kepada pihak ketiga, mohon dilengkapi. Apakah yakin Anda ingin keluar?');
      } catch (e) {
        Cashcash.doShowBack(true)
      }
    } else {
      try {
        // Cashcash.doShowBack(true, 'Cukup isi informasi sekali untuk mengajukan beberapa produk');
        Cashcash.doShowBack(true, 'Isi informasi sekali untuk mengajukan beberapa produk. Yakin keluar?');
      } catch (e) {
        Cashcash.doShowBack(true)
      }
    }

    window["GetIDCardFrontImg"] = url => {
      for (let i = 0, n = this.infoList.length; i < n; i++) {
        if (this.infoList[i].code == "idcard_image_front") {
          if (devinfo.appid == '10001') {
            let img = new Image()
            img.src = url.image_path
            img.onload = () => {
              // alert(img.width)  // kp得拍照检验
              if (img.width > 256 && img.height > 256) {
                this.infoList[i][this.infoList[i].code] = url.image_path;
                this.touplodimg(url.image_path);
                this.blurFun(this.infoList[i])
              } else {
                this.showmsg('Ukuran gambar terlalu kecil, silahkan unggah ulang')
              }
            }
          } else {
            this.infoList[i][this.infoList[i].code] = url.image_path;
            this.touplodimg(url.image_path);
            this.blurFun(this.infoList[i])
          }

        }
      }
    };

    window["GetFullPhotoImg"] = url => {
      for (let i = 0, n = this.infoList.length; i < n; i++) {
        if (this.infoList[i].code == "idcard_image_hand") {
          if (devinfo.appid == '10001') {
            let img = new Image()
            img.src = url.image_path
            img.onload = () => {
              // alert(img.width)  // kp得拍照检验
              if (img.width > 256 && img.height > 256) {
                this.infoList[i][this.infoList[i].code] = url.image_path;

                this.blurFun(this.infoList[i])
              } else {
                this.showmsg('Ukuran gambar terlalu kecil, silahkan unggah ulang')
              }
            }
          } else {
            this.infoList[i][this.infoList[i].code] = url.image_path;

            this.blurFun(this.infoList[i])
          }
        }
      }
    };

    window["GetIDCardBackImg"] = url => {
      for (let i = 0, n = this.infoList.length; i < n; i++) {
        if (this.infoList[i].code == "idcard_image_reverse_side") {
          // this.infoList[i][this.infoList[i].code] = url.image_path;
          // this.blurFun(this.infoList[i])
          if (devinfo.appid == '10001') {
            let img = new Image()
            img.src = url.image_path
            img.onload = () => {
              // alert(img.width)  // kp得拍照检验
              if (img.width > 256 && img.height > 256) {
                this.infoList[i][this.infoList[i].code] = url.image_path;

                this.blurFun(this.infoList[i])
              } else {
                this.showmsg('Ukuran gambar terlalu kecil, silahkan unggah ulang')
              }
            }
          } else {
            this.infoList[i][this.infoList[i].code] = url.image_path;

            this.blurFun(this.infoList[i])
          }
        }
      }
    };
    window["GetDefaultPhone"] = url => {
      this.focusFun(this.infoList[this.imgkind]);
      this.infoList[this.imgkind][this.infoList[this.imgkind].code] = ((url.user_number + '').replace(/[^0-9]/ig, ""));
    };
  },
  methods: {
    // 电话号码选着
    toselectTel(index) {
      this.imgkind = index;
      try {
        if (typeof eval(Cashcash.choiseContacts) == "function") {
          Cashcash.choiseContacts();
        }
      } catch (e) {
        this.showmsg("Versi anda sekarang versi rendah, tidak bisa menggunakan fitur memilih nomor dari kontak");
      }
    },

   
    checkimg(imgurl) {
      let img = new Image()
      img.src = imgurl
      img.onload = function () {
        if (img.width > 256 && img.height > 256) {
          return true
        }
      }
    },


    // 消息提示
    showmsg(msg) {
      this.$vux.toast.show({
        text: msg,
        type: "text",
        position: "middle",
        width: "80%"
      });
    },


    // 自动调用是省份证图片弹窗

    show_idcard_image_front() {
      for (let i = 0, n = this.infoList.length; i < n; i++) {
        if (this.infoList[i].code == "idcard_image_front" && this.infoList[i][this.infoList[i].code]) {
          // this.showphotofun('toOpenCammerFront', this.infoList[i][this.infoList[i].code])
          this.infoList[i][this.infoList[i].code] = '';
          // this.toOpenCammerFront()
          // try {
          //   Cashcash.getFaceComparisonFailure(true)
          // } catch (e) {
          //   this.showmsg("Versi anda sekarang versi rendah, tidak bisa menggunakan fitur memilih nomor dari kontak");
          // }
        }
      }
    },

    // 点击放大图片
    showphotofun(name, url) {
      this.showphoto = true;
      console.log(url)
      this.showphotoVal = {
        url: url,
        funname: name
      }
    },

    getProinfo() {
      this.proInfo = JSON.parse(Cashcash.getLoanDeviceInfo());
    },
    //输入监控操作
    async blurFun(item) {
      this.focusFun(item)
      let info = await this.axios.post('/log/field-value', { pro_code: 1000, order_no: this.$route.query.order_no || '', field_name: item.code, field_value: JSON.stringify(item[item.code]) });
    },

    async focusFun(item) {
      item.vFlag = false;
      this.$set(this.infoList, item, item);
    },

    async touplodimg(imgurl) {
      let info = await this.axios.post('/order/order-upload-img', { idcard_image_front: imgurl })
    },


    togetVal(item, val) {
      item[item.code] = val;
      this.blurFun(item)
    },

    toOpenCammerFront() {
      Cashcash.uploadIDCardFront();
    },
    toOpenCammerSide() {
      Cashcash.uploadIDCardBack();
    },
    toOpenCammerHand() {
      Cashcash.uploadFullPhoto();
    },

    todoaddress(type, kind, index) {
      todoaddress(type, this, kind, index);
    },

    async toshowConfirm() {
      if ((await tocheckVal(this)) === false) return;
      this.showconfirm = true;
    },

    async toSubmit(type) {
      if (type == 1) {
        if ((await tocheckVal(this)) === false) return;
      }
      // 埋点爬虫统计上报
      try {
        Cashcash.eventTrack('info_basic_next_click');
      } catch (e) {

      }
      let data = {
        order: {},
        order_base: {}
      };
      this.infoList.forEach(v => {
        data.order[v.code] = v[v.code];
        if (v.input_type == "select") {
          v.value.forEach((s, i) => {
            if (s.text == v[v.code].join("")) {
              data.order[v.code] = s.value;
            }
          });
        }
        // 
        // if (v.input_type == "date") {
        //   data.order[v.code] = `${v[v.code][0]}-${v[v.code][1]}-${
        //     v[v.code][2]
        //     }`;
        //   // new Date(
        //   //   `${v[v.code][0]}-${v[v.code][1]}-${v[v.code][2]}`
        //   // ).valueOf() / 1000;
        // }

        if (data.order[v.code] instanceof Array) {
          data.order[v.code] = data.order[v.code].join("");
        }
      });

      data.order_base.application_amount = devinfo.application_amount;
      data.order_base.application_term = devinfo.application_term;
      data.order_base.is_reloan = devinfo.is_reloan;
      // data.order.product_id =devinfo.product_id;
      data.order_base.product_name = devinfo.product_name;
      data.order_type = this.$route.query.order_type || 0;
      data.order_no = this.$route.query.order_no || "";
      data.pro_code = this.$route.query.pro_code || 1000;
      data.o_push = this.o_push;
      let devlist = JSON.stringify(this.device_conf);

      // url操作
      toNexturl(
        this,
        this.sub_url || "/order/order-base-info",
        data,
        1,
        devinfo.appid,
        devlist
      );
    }
  }
};
export default vm;
</script>

