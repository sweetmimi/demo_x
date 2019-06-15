<template>
  <div>
    <!-- 正在跳转 -->
  </div>
</template>
<script>
export default {
  name: "ToPage",
  data() {
    return {};
  },
  created() {
    this.toPage()
  },
  mounted() { },
  methods: {
    async toPage() {
      this.$vux.loading.show({ text: "Loading" });
      let info = await this.axios.post("/loan-info/check-order", { process_type: this.$route.query.process_type || 1 });
      // alert(location.href)
      if (info.code === 0) {
        // alert(info.data.order_no)
        switch ('' + info.data.next_pro) {
          case '-1000':
            Cashcash.finishWeb()
            break;
          case '1000':
            // 跳转基本信息
            this.$router.replace({ path: '/BasicInfo', query: { order_no: info.data.order_no || '', pro_code: info.data.next_pro } })
            break;
          case '1100':
            // 跳转用户信息
            this.$router.replace({ path: '/UserInfo', query: { order_no: info.data.order_no || '', pro_code: info.data.next_pro } })
            break;
          case '1200':
            // 用户地址信息
            this.$router.replace({ path: '/UserAddress', query: { order_no: info.data.order_no || '', pro_code: info.data.next_pro } })
            break;
          case '2000':
            this.$router.replace({ path: '/JobInfo', query: { order_no: info.data.order_no || '', pro_code: info.data.next_pro } })
            break;
          // 跳转工作学生基本信息
          case '8000':
            this.$router.replace({ path: '/WorkAndStuInfo', query: { order_no: info.data.order_no || '', pro_code: info.data.next_pro } })
            break;
          // 跳转 联系人信息
          case '4000':
            this.$router.replace({ path: '/ContactInfo', query: { order_no: info.data.order_no || '', pro_code: info.data.next_pro } })
            break;
          // 跳转 活体检测
          case '6000':
            this.$router.replace({ path: '/LiveCheck', query: { order_no: info.data.order_no || '', pro_code: info.data.next_pro } })
            break;
          // 跳转 绑定英航卡
          case '7000':
            this.$router.replace({ path: '/BindBankCard', query: { order_no: info.data.order_no || '', pro_code: info.data.next_pro } })
            break;
          // 跳转 补充的信息
          case '7500':
            this.$router.replace({ path: '/AddsomeInfo', query: { order_no: info.data.order_no || '', pro_code: info.data.next_pro } })
            break;
          // 跳转 确认
          case '9000':
            this.$router.replace({ path: '/ConfirmPage', query: { order_no: info.data.order_no || '', pro_code: info.data.next_pro } })
            break;
          // 唐牛五选一
          case '8500':
            this.$router.replace({ path: '/Toselect', query: { order_no: info.data.order_no || '', pro_code: info.data.next_pro } })
            break;
          // 跳转 借款信息流程
          case '0':
            this.$router.replace({ path: '/PayStep1', query: { order_no: info.data.order_no, pro_code: info.data.next_pro } })
            break;
          // 跳转还款页面
          case '101000':
            this.$router.replace({ path: '/PayStep2', query: { order_no: info.data.order_no, pro_code: info.data.next_pro } })
            break;
          // 跳转信息授权
          case '10000':
            this.$router.replace({ path: '/ToAuthorize', query: { order_no: info.data.order_no, pro_code: info.data.next_pro } })  //UangzamanSdk ToAuthorize
            break;

          default:
            Cashcash.finishWeb()
            break;
        }


      } else {
        this.$vux.toast.show({ text: info.code + info.message, type: "text" });
        setTimeout(() => {
          Cashcash.finishWeb()
        }, 2000)
      }
      this.$vux.loading.hide();
    },

  }

};
</script>
