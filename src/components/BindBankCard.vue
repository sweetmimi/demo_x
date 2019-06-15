<template>
  <div>
    <div class="loading" v-if="!infoList">Loading....</div>
    <van-notice-bar mode="closeable">Demi keamanan dana, mohon ikat akun bank Anda</van-notice-bar>
    <!-- <div class="top-tips">
           <p>Demi keamanan dana, mohon ikat akun bank Anda</p>
    </div>-->
    <div class="info-main">
      <div
        v-for="(item,index) in infoList"
        :key="index"
        :class="[item.input_type=='image'? 'photo-list':'']"
      >
        <div class="mgt10 info-div" v-if="item.input_type=='text'||item.input_type=='number'">
          <!-- <p>{{item.title}}<em class="red1" v-if="item.required ==='0'">(Opsional)</em>                 </p>
          <input class="inp" :type="item.input_type"  v-model="item[item.code]"  :placeholder="item.example_val ">-->
          <!-- <p v-if="item.has_val&&item.code=='bank_user_name'" style="color: #ccc;">{{item.title}}</p> -->
          <!-- <p :style="{color: item.vFlag===true?'red':'' }">
            {{item.title}}
            <font style="color: #999;" v-if="item.code=='bank_user_name'">(Tidak dapat diubah)</font>
          </p>-->
          <!-- <input class="inp" :type="item.input_type" @blur="blurFun(item)" v-model="item[item.code]" v-if="item.has_val&&item.code=='bank_user_name'" readonly style="color: #ccc;" :placeholder="item.example_val "> -->
          <input
            class="inp"
            :type="item.input_type"
            @blur="blurFun(item)"
            @focus="focusFun(item)"
            v-model="item[item.code]"
            :placeholder="item.title "
          >
          <div :class="[ item.vFlag===true ? 'br-red' : 'br']"></div>
        </div>

        <div class="mgt10 info-div" v-if="item.input_type=='select'">
          <!-- <p :style="{color: item.vFlag===true?'red':'' }">
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>-->
          <popup-picker
            class="inp"
            @on-change="blurFun(item)"
            value-text-align="left"
            cancel-text="Batal"
            confirm-text="Konfirmasi"
            v-model="item[item.code]"
            :data="[item.valueArr]"
            :placeholder="item.title "
          ></popup-picker>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div :class="[ item.vFlag===true ? 'br-red' : 'br']"></div>
        </div>

        <div class="mgt10 info-div" v-if="item.input_type=='date'">
          <!-- <p :style="{color: item.vFlag===true?'red':'' }">
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>-->
          <popup-picker
            class="inp"
            value-text-align="left"
            :data="item.value"
            cancel-text="Batal"
            confirm-text="Konfirmasi"
            v-model="item[item.code]"
            :placeholder="item.title "
          ></popup-picker>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div :class="[ item.vFlag===true ? 'br-red' : 'br']"></div>
        </div>

        <div
          class="mgt10 info-div"
          v-if="item.input_type=='select_province'||item.input_type=='select_city'||item.input_type=='select_large_district'||item.input_type=='select_small_district'"
        >
          <!-- <p :style="{color: item.vFlag===true?'red':'' }">
            {{item.title}}
            <em class="red1"
                v-if="item.required ==='0'">(Opsional)</em>
          </p>-->
          <popup-picker
            class="inp"
            value-text-align="left"
            :data="item.value"
            v-if="item.value[0]&&item.value[0].length>0"
            cancel-text="Batal"
            confirm-text="Konfirmasi"
            v-model="item[item.code]"
            @on-change="todoaddress(item.input_type,'',index)"
            show-name
            :placeholder="item.title "
          ></popup-picker>
          <div @click="todoaddress(item.input_type,1)" v-else>
            <popup-picker
              class="inp"
              value-text-align="left"
              :data="item.value"
              disabled
              cancel-text="Batal"
              show-name
              :placeholder="item.title "
            ></popup-picker>
          </div>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div :class="[ item.vFlag===true ? 'br-red' : 'br']"></div>
        </div>

        <div class="mgt10 info-div1" v-if="item.input_type=='radio'">
          <p>
            {{item.title}}
            <em class="red1" v-if="item.required ==='0'">(Opsional)</em>
          </p>
          <span>
            <Radio
              :options="item.value"
              v-model="item[item.code]"
              @on-change="togetVal(item.code,item[item.code])"
            ></Radio>
          </span>
        </div>
      </div>

      <div class="sub-btn-out" v-if="infoList&&infoList.length>0">
        <span class="sub-btn" @click="toSubmit()">Lanjut</span>
      </div>
      <!-- <Kefuicon></Kefuicon> -->
    </div>
  </div>
</template>
<script>
import { PopupPicker } from "vux";
import { toNext, toNexturl, getData, tocheckVal } from "./tonext";
import devinfo from "../request/devinfo";
import baseinfo from "../request/baseinfo";
export default {
  name: "BindBankCard",
  components: {
    PopupPicker
  },
  data() {
    return {
      infoList: "",
      o_push: "",
      sub_url: "",

      bindappid: baseinfo.appid || "",

      confirmnum: ""
    };
  },

  async created() {
    await toNext(this);
    await getData(this, "/loan-info/get-bank-info");
    try {
      Cashcash.eventTrack("info_bank_view");
    } catch (e) {}
    if (this.bindappid === "10001") {
      this.infoList.push({
        title: "Ketik Ulang Nomor Rekening",
        code: "bank_account1",
        bank_account1: "",
        required: "1",
        input_type: "number",
        input_val: "",
        check_type: "bank_account1",
        example_val: "",
        value: []
      });
      let i = 0;
      if (this.infoList.length == 4) {
        i = 3;
      }
      if (this.infoList.length == 3) {
        i = 2;
      }
      if (this.infoList.length == 2) {
        i = 1;
      }
      if (this.infoList[i - 1].input_val) {
        this.infoList[i]["bank_account1"] = this.infoList[i - 1].input_val;
      }
    }
  },
  mounted() {
    Cashcash.doShowBack(true);
  },
  methods: {
    //输入监控操作
    async blurFun(item) {
      this.focusFun(item);
      let info = await this.axios.post("/log/field-value", {
        pro_code: 7000,
        order_no: this.$route.query.order_no || "",
        field_name: item.code,
        field_value: JSON.stringify(item[item.code])
      });
    },

    async focusFun(item) {
      item.vFlag = false;
      this.$set(this.infoList, item, item);
    },

    async toSubmit() {
      if ((await tocheckVal(this)) === false) return;
      try {
        Cashcash.eventTrack("info_bank_next_click");
      } catch (e) {}
      if (this.bindappid === "10001") {
        let i = 0;
        if (this.infoList.length == 4) {
          i = 3;
        }
        if (this.infoList.length == 3) {
          i = 2;
        }
        if (this.infoList.length == 2) {
          i = 1;
        }
        if (
          this.infoList[i - 1]["bank_account"] !==
          this.infoList[i]["bank_account1"]
        ) {
          this.$vux.toast.show({
            text: "Nomor rekening bank Anda salah,Silakan masuk kembali",
            type: "text",
            position: "middle",
            width: "80%"
          });
          return;
        }
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
        if (v.input_type == "date") {
          data.order[v.code] = `${v[v.code][0]}-${v[v.code][1]}-${
            v[v.code][2]
          }`;
          // new Date(
          //   `${v[v.code][0]}-${v[v.code][1]}-${v[v.code][2]}`
          // ).valueOf() / 1000;
        }
        if (data.order[v.code] instanceof Array) {
          data.order[v.code] = data.order[v.code].join("");
        }
      });

      data.order_no = this.$route.query.order_no;
      data.pro_code = this.$route.query.pro_code || 7000;
      data.order_type = this.$route.query.order_type || 0;
      data.o_push = this.o_push;
      data.order_base.application_amount = devinfo.application_amount;
      data.order_base.application_term = devinfo.application_term;
      data.order_base.is_reloan = devinfo.is_reloan;
      // data.order_base.product_id =devinfo.product_id;
      data.order_base.product_name = devinfo.product_name;
      toNexturl(this, this.sub_url || "/order/order-bind-bank", data);
    }
  }
};
</script>
