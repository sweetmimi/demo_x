<template>
  <div>
    
    <div class="loading"
         v-if="!infoList">Loading....</div>
         <van-notice-bar v-if="refill_type===1" mode="closeable">Silahkan isi informasi dengan sebenar benarnya, tingkat keberhasilan pinjaman meningkat hingga 20%</van-notice-bar>
    <!-- <div class="top-tips"
         v-if="refill_type===1">Silahkan isi informasi dengan sebenar benarnya, tingkat keberhasilan pinjaman meningkat hingga 20%</div> -->
    <div class="info-main">
      <div v-for="(item,index) in infoList"
           :key="index"
           :class="[item.input_type=='image'? 'photo-list':'']">
        <div class="mgt10 info-div"
             v-if="item.input_type=='text'">
          <!-- <p :style="{color: item.vFlag===true?'red':'' }">
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p> -->
          <span v-if="item.check_type=='name_disabled'"
                @click="showmsg">
            <input disabled="true"
                   style="background: none;"
                   class="inp"
                   type="text"
                   @blur="blurFun(item)"
                   @focus="focusFun(item)"
                   v-model="item[item.code]"
                   :placeholder="item.title ">
          </span>
          <input v-else
                 class="inp"
                 type="text"
                 @blur="blurFun(item)"
                 @focus="focusFun(item)"
                 v-model="item[item.code]"
                 :placeholder="item.title ">
          <i v-if="item.check_type=='name_disabled'"
             @click="toselectTel(index)"
             class="icon-right-addtel iconfont icon-yuanquanjiahao"></i>
          <div :class="[ item.vFlag===true ? 'br-red' : 'br']"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='phone'||item.input_type=='number'">
          <!-- <p :style="{color: item.vFlag===true?'red':'' }">
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p> -->
          <span v-if="item.check_type=='disabled_input_phone'"
                @click="showmsg">
            <input disabled="true"
                   style="background: none;"
                   class="inp"
                   type="number"
                   @blur="blurFun(item)"
                   @focus="focusFun(item)"
                   v-model="item[item.code]"
                   :placeholder="item.title ">
          </span>
          <input v-else
                 class="inp"
                 type="number"
                 @blur="blurFun(item)"
                 @focus="focusFun(item)"
                 v-model="item[item.code]"
                 :placeholder="item.title ">
          <i v-if="item.check_type=='phone'||item.check_type=='telephone_or_phone'||item.check_type=='disabled_input_phone'"
             @click="toselectTel(index)"
             class="icon-right-addtel iconfont icon-yuanquanjiahao"></i>
          <div :class="[ item.vFlag===true ? 'br-red' : 'br']"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select'">
          <!-- <p :style="{color: item.vFlag===true?'red':'' }">
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
                        :placeholder="item.title"></popup-picker>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div :class="[ item.vFlag===true ? 'br-red' : 'br']"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='date'">
          <p :style="{color: item.vFlag===true?'red':'' }">
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
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
                    :placeholder="item.example_val "></datetime>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div :class="[ item.vFlag===true ? 'br-red' : 'br']"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select_province'||item.input_type=='select_city'||item.input_type=='select_large_district'||item.input_type=='select_small_district'">
          <p :style="{color: item.vFlag===true?'red':'' }">
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>
          <!-- {{item.value}} -->
          <popup-picker class="inp"
                        value-text-align="left"
                        :data="item.value"
                        v-if="item.value[0]&&item.value[0].length>0"
                        cancel-text="Batal"
                        confirm-text="Konfirmasi"
                        v-model="item[item.code]"
                        @on-change="todoaddress(item.input_type,'',index)"
                        show-name
                        :placeholder="item.example_val "></popup-picker>
          <div @click="todoaddress(item.input_type,1)"
               v-else>
            <popup-picker class="inp"
                          value-text-align="left"
                          :data="item.value"
                          disabled
                          cancel-text="Batal"
                          show-name
                          :placeholder="item.example_val "></popup-picker>
          </div>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div :class="[ item.vFlag===true ? 'br-red' : 'br']"></div>
        </div>

        <div class="mgt10 info-div"
             @click="showAddress(index)"
             v-if="item.input_type=='address'">
          <p :style="{color: item.vFlag===true?'red':'' }">{{item.title}}</p>
          <input v-if="!item[item.code].text"
                 class="inp"
                 type="text"
                 readonly
                 v-model="item[item.code]"
                 :placeholder="item.example_val ">

          <em class="address-style"
              v-else>{{item[item.code].text.provinces}} {{item[item.code].text.city}} {{item[item.code].text.districts}} {{item[item.code].text.villages}}</em>
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

        <li v-if="item.input_type=='image'"
            @click="toOpenCammerSide(item.code)">
          <i>
            <img v-if="item[item.code]"
                 width="100%"
                 :src="item[item.code]"
                 alt>
            <em v-else
                class="iconfont icon-Photo"></em>
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
        <span class="sub-btn"
              @click="toSubmit()">Lanjut</span>
      </div>
      <BottomTips></BottomTips>
      <!-- <Kefuicon></Kefuicon> -->
    </div>

    <div class="pop-div">
      <popup v-model="showpopflag"
             position="bottom"
             height="75%"
             @on-hide="closeaddress">
        <div class>
          <ul>
            <div class="list-items"
                 v-for="(item,index) in prArr"
                 :key="index"
                 @click="toselect(item)">
              <div class="list-items1">
                <p>{{item.name}}</p>
                <i class="right iconfont icon-youjiantou"></i>
              </div>
              <div class="br"></div>
            </div>
            <div style="height: 10px;"></div>
          </ul>
        </div>
        <!-- <div class="closeBox">
          <span @click="closeaddress">Batal</span>
        </div>-->
      </popup>
    </div>
  </div>
</template>
<script>
import { PopupPicker, Popup, Datetime } from "vux";
import Radio from "./Radio";
import devinfo from "../request/devinfo";
import { toNext, toNexturl, getData, tocheckVal, todoaddress } from "./tonext";

export default {
  name: "infoCont",
  components: {
    PopupPicker,
    Popup,
    Datetime,
    Radio
  },
  data() {
    return {
      // 表项目list
      infoList: '',
      o_push: "",
      sub_url: "",
      refill_type: '',  // 是否重填字段
      imgkind: "",


      showpopflag: false,
      num: 0,
      prArr: '',
      codeArr: {
        value: {},
        text: {}
      },
      addressindex: '',
    };
  },
  async created() {
    await toNext(this);
    getData(this, "/loan-info/get-contacts-info", 1);
    try {
      AndroidH.eventTrack('info_contack_view');
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
      AndroidH.doShowBack(true);
    }
    window["GetDefaultCameraImg"] = url => {
      for (let i = 0, n = this.infoList.length; i < n; i++) {
        if (this.infoList[i].code == this.imgkind) {
          this.infoList[i][this.infoList[i].code] = url.image_path;
          this.blurFun(this.infoList[i])

        }
      }
    };
    window["GetDefaultPhone"] = url => {
      // alert(JSON.stringify(url));
      if (this.infoList[this.imgkind].check_type == 'name_disabled') {

        this.infoList[this.imgkind][this.infoList[this.imgkind].code] = ((url.user_name + '') || '');
        this.infoList[this.imgkind + 1][this.infoList[this.imgkind + 1].code] = ((url.user_number + '').replace(/[^0-9]/ig, ""));

        this.focusFun(this.infoList[this.imgkind]);
        this.focusFun(this.infoList[this.imgkind+1]);

      } else {
        if (this.infoList[this.imgkind - 1].input_type == 'text') {
          this.infoList[this.imgkind - 1][this.infoList[this.imgkind - 1].code] = ((url.user_name + '') || '');
          this.infoList[this.imgkind][this.infoList[this.imgkind].code] = ((url.user_number + '').replace(/[^0-9]/ig, ""));

          this.focusFun(this.infoList[this.imgkind-1]);
          this.focusFun(this.infoList[this.imgkind]);
        } else {
          this.infoList[this.imgkind][this.infoList[this.imgkind].code] = ((url.user_number + '').replace(/[^0-9]/ig, ""));

          this.focusFun(this.infoList[this.imgkind]);
        }

      }

    };
  },
  methods: {
    // 消息提示
    showmsg() {
      this.$vux.toast.show({
        text: 'Anda hanya boleh memilih nomor dari kontak anda.',
        type: "text",
        position: "middle",
        width: "80%"
      });
    },

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

    togetVal(item, val) {
      item[item.code] = val;
      this.blurFun(item)
    },
    //输入监控操作
    async blurFun(item) {
      this.focusFun(item);
      let info = await this.axios.post('/log/field-value', { pro_code: 4000, order_no: this.$route.query.order_no || '', field_name: item.code, field_value: JSON.stringify(item[item.code]) });
      
    },
    async focusFun(item) {
      item.vFlag = false;
      this.$set(this.infoList,item,item);
    },
    toOpenCammerSide(imgkind) {
      this.imgkind = imgkind;
      AndroidH.defaultCamera();
    },

    todoaddress(type, kind, index) {
      todoaddress(type, this, kind, index);
    },


    showAddress(index) {

      this.addressindex = index;
      this.prArr = this.infoList[index].value;
      this.showpopflag = true;
    },
    closeaddress() {
      this.showpopflag = false;

      this.num = 0;
      this.prArr = '';
      this.codeArr = {
        value: {},
        text: {}
      };
      this.addressindex = '';


    },


    async toselect(item) {
      this.$vux.loading.show({ text: "Loading" });
      this.num++
      let urlArr = ['/loan-info/get-province', '/loan-info/get-city', '/loan-info/get-large-district', '/loan-info/get-small-district']
      if (this.num == 1) {
        this.codeArr.value['provinces'] = item.value
        this.codeArr.text['provinces'] = item.name
      }
      if (this.num == 2) {
        this.codeArr.value['city'] = item.value
        this.codeArr.text['city'] = item.name
      }
      if (this.num == 3) {
        this.codeArr.value['districts'] = item.value
        this.codeArr.text['districts'] = item.name
      }
      if (this.num == 4) {
        this.codeArr.value['villages'] = item.value
        this.codeArr.text['villages'] = item.name
      }
      if (this.num == urlArr.length) {
        let addressindex = this.addressindex
        this.showpopflag = false;
        this.infoList[addressindex][this.infoList[addressindex].code] = this.codeArr
        this.closeaddress()
        this.blurFun(this.infoList[addressindex])
        this.$vux.loading.hide();
        return
      }
      let info = await this.axios.post(urlArr[this.num], { ad_id: item.value });
      if (info.code === 0) {
        this.prArr = info.data;
      }
      this.$vux.loading.hide()
    },

    async toSubmit() {
      if ((await tocheckVal(this)) === false) return;
      try {
        AndroidH.eventTrack('info_contack_next_click');
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

      data.order_no = this.$route.query.order_no;
      data.pro_code = this.$route.query.pro_code || 4000;
      data.order_type = this.$route.query.order_type || 0;
      // alert(JSON.stringify(data))


      data.order_base.application_amount = devinfo.application_amount;
      data.order_base.application_term = devinfo.application_term;
      data.order_base.is_reloan = devinfo.is_reloan;
      //data.order_base.product_id =devinfo.product_id;
      data.order_base.product_name = devinfo.product_name;
      // console.log(data)
      data.o_push = this.o_push;
      toNexturl(this, this.sub_url || "/order/order-base-info", data);
    }
  }
};
</script>



<style scoped>
.hidden {
  overflow: hidden;
  height: 100%;
}
.vux-popup-dialog {
  background: #fff;
}

.address-style {
  font-style: normal;
  text-transform: lowercase;
  display: block;
  padding-bottom: 5px;
  padding-right: 20px;
  z-index: 9;
}
.closeBox {
  position: fixed;
  z-index: 90999999;
  bottom: 0;
  padding: 10px 15px;
  right: 0;
  left: 0;
  background: #fff;
  box-shadow: -1px -5px 16px #e8e8e8cc;
}
.closeBox span {
  border: 1px solid #cecece;
  border-radius: 5px;
  display: block;
  text-align: center;
  font-size: 16px;
  padding: 10px;
  color: #666;
}
</style>


