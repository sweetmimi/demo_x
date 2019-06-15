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
    <!-- <div class="top-tips">Informasi ini akan digunakan untuk pengajuan pinjaman Anda, pastikan informasi sebenar benarnya</div> -->
    <div class="info-main">
      <div v-for="(item,index) in infoList"
           :key="index"
           :class="[item.input_type=='image'? 'photo-list':'']"
           @click="showmsg()">
        <div class="mgt10 info-div"
             v-if="item.input_type=='text'||item.input_type=='phone'||item.input_type=='number'">
          <p>{{item.title}}</p>

          <input class="inp"
                 type="text"
                 v-model="item[item.code]"
                 readonly>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select'">
          <p>{{item.title}}</p>
          <popup-picker class="inp"
                        value-text-align="left"
                        disabled
                        cancel-text="Batal"
                        confirm-text="Konfirmasi"
                        v-model="item[item.code]"
                        :data="[item.valueArr]"
                        :placeholder="item.example_val "></popup-picker>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='date'||item.input_type=='date_month'">
          <p>{{item.title}}</p>
          <datetime disabled
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
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select_province'||item.input_type=='select_city'||item.input_type=='select_large_district'||item.input_type=='select_small_district'">
          <p>{{item.title}}</p>
          <popup-picker class="inp"
                        disabled
                        value-text-align="left"
                        :data="item.value"
                        v-if="item.value[0]&&item.value[0].length>0"
                        cancel-text="Batal"
                        confirm-text="Konfirmasi"
                        v-model="item[item.code]"
                        @on-change="todoaddress(item.input_type,'',index)"
                        show-name
                        :placeholder="item.example_val "></popup-picker>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div1"
             v-if="item.input_type=='radio'">
          <p>{{item.title}}</p>
          <span>
            <Radio :options="item.value"
                   v-model="item[item.code]"></Radio>
          </span>
        </div>

        <li v-if="item.input_type=='image'">
          <i>
            <img v-if="item[item.code]"
                 width="100%"
                 :src="item[item.code]"
                 alt>
            <em v-else
                class="iconfont icon-Photo"></em>
          </i>
          <p>{{item.title}}</p>
        </li>

        <div class="mgt10 info-div"
             v-if="item.input_type=='address'">
          <p>{{item.title}}</p>
          <em class="address-style">{{item[item.code].text.provinces}} {{item[item.code].text.city}} {{item[item.code].text.districts}} {{item[item.code].text.villages}}</em>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>

        <div class="mgt10 info-div"
             v-if="item.input_type=='select_child'">
          <p>{{item.title}}</p>
          <em class="address-style">{{item[item.code].text}}</em>
          <i class="icon-right iconfont icon-youjiantou"></i>
          <div class="br"></div>
        </div>
      </div>

      <div class="sub-btn-out"
           v-if="(appid1 + '')==='10001'">
        <span class="sub-btn"
              @click="tourl()">Lanjut</span>
      </div>

      <!-- <Kefuicon></Kefuicon> -->
    </div>
  </div>
</template>
<style scoped>
.inp {
  color: #999;
}
</style>


<script>
import { PopupPicker, Confirm, Datetime } from "vux";
import Radio from "./Radio";
import devinfo from "../request/devinfo";
import baseinfo from "../request/baseinfo";
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
      refill_type: '',
      imgkind: '',
      proInfo: "",
      showconfirm: false,

      appid1: baseinfo.appid,
    };
  },

  async created() {
    // await toNext(this);
    switch (this.$route.query.type.toLowerCase()) {
      case 'basicinfo':
        getData(this, "/loan-info/get-base-info", 1);
        break;
      case 'jobinfo':
        getData(this, "/loan-info/get-job-info", 1);
        break;
      case 'contactinfo':
        getData(this, "/loan-info/get-contacts-info", 1);
        break;
      case 'contactinfo':
        getData(this, "/loan-info/get-contacts-info", 1);
        break;
      case 'userinfo':
        getData(this, "/loan-info/get-user-info", 1);
        break;
      case 'useraddress':
        getData(this, "/loan-info/get-user-address", 1);
        break;
      default:
        alert('页面不存在')
        break;
    }
  },
  mounted() {

  },
  methods: {
    tourl() {
      this.$router.replace({ path: '/ToPage' })
    },
    showmsg() {
      this.$vux.toast.show({
        text: 'Informasi sudah dikirim dan tidak bisa diubah. Hubungi CS untuk mengubah.',
        type: "text",
        position: "middle",
        width: "80%"
      });
    }
  }
};
export default vm;
</script>

