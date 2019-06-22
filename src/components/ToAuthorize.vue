<template>
  <div class="bgc">

    <div class="loading"
         v-if="!infoData">Loading....
    </div>
    <!-- <div class="top-tips"
         style="background: none;color: #999;">Mohon verifikasi data di bawah dulu. Semakin banyak verifikasi data, semakin tinggi tingkat kelulusan.</div> -->
    <van-notice-bar mode="closeable" style="background: none;color: #999;">Mohon verifikasi data di bawah dulu. Semakin banyak verifikasi data, semakin tinggi tingkat kelulusan.</van-notice-bar>
    
    <div class=''
         v-if="infoData&&infoData.length>0">

      <div class=''
           v-for="(item,index) in infoData"
           :key="index">

        <div class="toau-info">
          <!-- 必填 -->
          <div class="title"
               v-if="item.f_group_type==='0'">Wajib diisi</div>
          <!-- 选填 -->
          <div class="title"
               v-if="item.f_group_type==='1'">Opsional</div>
          <div class="title"
               v-if="item.f_group_type==='2'">Ikatkan akun (min. {{item.f_group_check}})</div>
          <div class="toau-list">
            <li v-for="(c_item,index1) in item.f_auth_list"
                :key="index1">
              <div class="br"></div>
              <div class="listdiv"
                   @click="tourl(c_item)">
                <span class='left'>
                  <i><img :src="c_item.f_icon"
                         alt=""></i>
                  <h5>{{c_item.f_title}}</h5>
                </span>

                <span class='right'>
                  <i class='to_au'
                     v-if="c_item.f_status==='0'">Belum verifikasi</i>
                  <i class='to_au1 to_au1_succ'
                     v-if="c_item.f_status==='2'"> <img src="../assets/toauth_img2.png"
                         alt=""> Selesai verifikasi</i>
                  <i class='to_au1 to_au1_fail'
                     v-if="c_item.f_status==='-1'"> <img src="../assets/toauth_img1.png"
                         alt=""> Verifikasi gagal</i>
                  <i class='to_au1 to_au1_auing'
                     v-if="c_item.f_status==='1'"> <img src="../assets/toauth_img3.png"
                         alt=""> Sedang verifikasi</i>
                  <i class="right1 iconfont icon-youjiantou"
                     v-if="c_item.f_status==='0'"></i>
                </span>
              </div>

            </li>
          </div>
        </div>

      </div>

    </div>

    <div class="sub-btn-out"
         style="display: flex;">
      <!-- <span class="sub-btn"
            style=" margin-right: 10px;"
            @click="torefrsh">Segarkan</span> -->

      <span class="sub-btn"
            @click="toSubmit">Lanjut</span>
    </div>

    <div style="font-size: 12px; color: #aaa;margin-top: -10px; padding: 0px 20px;text-align: center;margin-bottom: 20px;">Informasi hanya di pakai untuk verifikasi, kami menjamin kerahasiaan data Anda.</div>

  </div>
</template>


<script>
import devinfo from "../request/devinfo";
import baseinfo from "../request/baseinfo";
import axios_spider from '../request/index_spider'
import { toNext, toNexturl, getData, tocheckVal, todoaddress } from "./tonext";
// const apiKey = location.host.split('.')[0] === 'testloan' ? '05a33af020184ae6a5a8a4c0728ff854' : 'b3db12ec11d84d4bb12190882754b8bd';

const vm = {
  name: "ToAuthorize",
  components: {

  },
  data() {
    return {
      infoData: '',
      orderInfo: '',


      o_push: "",
      sub_url: "",

      userinfo: {},
    };
  },

  created() {
    this.getDataPage();
    // setTimeout(() => {
    //   this.getDataPage();
    //   alert(1)
    // }, 1500);
    // setTimeout(() => {
    //   this.getDataPage();
    //   alert(2)
    // }, 6000);
    // this.toPageView()
  },
  mounted() {
    //导入失败调用方法
    window["importMoXieDataError"] = () => {
      this.showmsg('noe Keberhasilan resmi');
      this.$router.push({ path: '/ToAuthorize', query: { order_no: this.$route.query.order_no } })
    };
    //导入成功调用方法
    window["importMoXieDataSuccess"] = (v) => {
      this.showmsg('Keberhasilan resmi');
      this.getDataPage();
      setTimeout(() => {
        this.getDataPage();
      }, 1500);
      this.$router.push({ path: '/ToAuthorize', query: { order_no: this.$route.query.order_no, taskId: v.taskId, taskType: v.taskType } })
    };

  },
  methods: {

    // 页面访问次数
    toPageView() {
      gtag('event', 'toauthorize_list_view', {
        value: 1,
      });
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
    async getDataPage() {

      let info = await axios_spider.post("/talang-v1/get-list", { order_no: this.$route.query.order_no || '' });

      if (info.code === 0 && info.data && info.data.length > 0) {
        this.infoData = info.data;
        this.orderInfo = info.order_info;
      } else {
        this.$vux.toast.show({ text: 'no data', type: "text" });
      }

    },

    async tochanneltype(c) {
      if (c.f_channel_type === '0') {
        // let html_type = c.f_html_type === '1' ? '4001' : '2001'
        this.$router.push({
          path: '/ToAuthorizeLogin',
          query: {
            authid: c.f_auth_code,
            html_type: c.f_html_type,
            // authid: auth_code,
            order_no: this.$route.query.order_no || ''
          }
        });
      }

      //调用魔蝎sdk
      if (c.f_channel_type === '1') {
        // this.$vux.loading.show({ text: "Melompat ..." });
        // let info = await axios_spider.post("/moxie/notify-init", { order_no: this.$route.query.order_no, taskType: c.f_channel_code })
        // this.$vux.loading.hide()
        try {
          if (typeof eval(AndroidH.startMoXieClient) == "function") {
            AndroidH.startMoXieClient(baseinfo.userid, 'b3db12ec11d84d4bb12190882754b8bd', c.f_channel_code);
          } else {
            this.showmsg('none function');
          }
        } catch (e) {
          this.showmsg('none function');
        }
      }

      //类型是npwp或者其他，调用自有sdk
      if (c.f_channel_type === '2') {
        try {
          if (typeof eval(AndroidH.startSDK) == "function") {
            AndroidH.startSDK(baseinfo.userid, this.orderInfo.user_mobile,
              this.orderInfo.user_name, this.orderInfo.user_idcard, c.f_channel_code, c.f_channel_type);
          } else {
            this.showmsg('none function');
          }
        } catch (e) {
          this.showmsg('none function');
        }
      }

    },


    async  tourl(v) {
      gtag('event', `toauthorize_list_${v.f_title}`, {
        value: 1,
      });

      if (v.f_status === '0') {
        this.tochanneltype(v)
      } // 去认证
      if (v.f_status === '2') {
        this.showmsg('Data sudah selesai verifikasi, tidak perlu verifikasi ulang');
      } // 认证成功
      if (v.f_status === '-1') {
        this.tochanneltype(v)
      }  // 认证失败
      if (v.f_status === '1') {
        this.showmsg('Data kamu sedang diverifikasi, mohon verifikasi data lain dulu');
      } // 认证中

    },


    // 下一步提交得


    async toSubmit() {
      // if ((await tocheckVal(this)) === false) return;
      // try {
      //   AndroidH.eventTrack('info_toauth_next_click');
      // } catch (e) {
      // }

      gtag('event', `toauthorize_list_bottom_btnclick`, {
        value: 1,
      });

      let data = {
        // order: {},
        order_base: {}
      };
      // this.infoList.forEach(v => {
      //   data.order[v.code] = v[v.code];
      //   if (v.input_type == "select") {
      //     v.value.forEach((s, i) => {
      //       if (s.text == v[v.code].join("")) {
      //         data.order[v.code] = s.value;
      //       }
      //     });
      //   }

      //   if (data.order[v.code] instanceof Array) {
      //     data.order[v.code] = data.order[v.code].join("");
      //   }
      // });

      data.order_no = this.$route.query.order_no;

      data.pro_code = this.$route.query.pro_code || 10000;
      data.order_type = this.$route.query.order_type || 0;

      data.order_base.application_amount = devinfo.application_amount;
      data.order_base.application_term = devinfo.application_term;
      data.order_base.is_reloan = devinfo.is_reloan;
      // data.order_base.product_id =devinfo.product_id;
      data.order_base.product_name = devinfo.product_name;




      // console.log(data)
      // return
      data.o_push = this.o_push;
      // data.userid = this.$route.query.user_id || this.userinfo.user_id;
      // toNexturl(this, this.sub_url || "/spd-api/auth-submit", data);
      toNexturl(this, this.sub_url || "/talang-v1/auth-submit", data);

    }




  }
};
export default vm;
</script>
<style scoped>
body,
html,
#app,
.bgc {
  height: auto;
}
.bgc {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  min-height: 100%;
}
</style>

