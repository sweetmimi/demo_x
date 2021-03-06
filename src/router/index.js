import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      //上传基础信息
      path: "/infoBasic",
      name: "infoBasic",
      component: resolve => require(["@/components/infoBasic.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },

    {
      //上传工作证明
      path: "/Toselect",
      name: "Toselect",
      component: resolve => require(["@/components/Toselect.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },

    // 只读页面
    {
      path: "/ReadPage",
      name: "ReadPage",
      component: resolve => require(["@/components/ReadPage.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },

    {
      //绑定银行卡
      path: "/infoBankCard",
      name: "infoBankCard",
      component: resolve => require(["@/components/infoBankCard.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    //紧急联系人
    {
      path: "/infoAdd",
      name: "infoAdd",
      component: resolve => require(["@/components/infoAdd.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    //用户信息
    {
      path: "/infoUser",
      name: "infoUser",
      component: resolve => require(["@/components/infoUser.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    //用户地址
    {
      path: "/UserAddress",
      name: "UserAddress",
      component: resolve => require(["@/components/UserAddress.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    //工作证明
    {
      path: "/infoJob",
      name: "infoJob",
      component: resolve => require(["@/components/infoJob.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    //学生证明
    {
      path: "/infoStudent",
      name: "infoStudent",
      component: resolve =>
        require(["@/components/infoStudent.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      //选择联系人
      path: "/infoCont",
      name: "infoCont",
      component: resolve => require(["@/components/infoCont.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      //确认合同
      path: "/ConfirmPage",
      name: "ConfirmPage",
      component: resolve => require(["@/components/ConfirmPage.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      path: "/LiveCheck",
      name: "LiveCheck",
      component: resolve => require(["@/components/LiveCheck.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      //订单审核页面(带步骤)
      path: "/PayStep1",
      name: "PayStep1",
      component: resolve => require(["@/components/PayStep1.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      //订单结清页面
      path: "/PayStep2",
      name: "PayStep2",
      component: resolve => require(["@/components/PayStep2.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      //银行卡页面
      path: "/PayStep3",
      name: "PayStep3",
      component: resolve => require(["@/components/PayStep3.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      //还款码页面
      path: "/PayStep4",
      name: "PayStep4",
      component: resolve => require(["@/components/PayStep4.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      //还款帮助页面
      path: "/PayStep5",
      name: "PayStep5",
      component: resolve => require(["@/components/PayStep5.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      path: "/FaqCashcash",
      name: "FaqCashcash",
      component: resolve => require(["@/components/FaqCashcash.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      path: "/FaqCashstore",
      name: "FaqCashstore",
      component: resolve => require(["@/components/FaqCashstore.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      path: "/ToPage",
      name: "ToPage",
      component: resolve => require(["@/components/ToPage.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    //客服组件
    {
      path: "/Gojek",
      name: "Gojek",
      component: resolve => require(["@/components/Gojek.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    // 九项基础信息填写
    {
      path: "/infoNineBasic", 
      name: "infoNineBasic",
      component: resolve =>
        require(["@/components/infoNineBasic.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    // 信息授权列表
    {
      path: "/ToAuthorize", 
      name: "ToAuthorize",
      component: resolve => require(["@/components/ToAuthorize.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {// 信息授权登录
      path: "/ToAuthorizeLogin", 
      name: "ToAuthorizeLogin",
      component: resolve =>
        require(["@/components/ToAuthorizeLogin.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    // UangzamanSdk 临时
    {
      path: "/UangzamanSdk", 
      name: "UangzamanSdk",
      component: resolve => require(["@/components/UangzamanSdk.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    // Paydelay 展期详情
    {
      path: "/Paydelay", 
      name: "Paydelay",
      component: resolve =>
        require(["@/components/Paystep2_delay.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    // Paydelay 展期详情
    {
      path: "/Paydelaying", 
      name: "Paydelaying",
      component: resolve =>
        require(["@/components/Paystep2_delaying.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    },
    {
      path: "/Paydelaylist", // Paydelaylist 临时
      name: "Paydelaylist",
      component: resolve =>
        require(["@/components/Paystep2_delaylist.vue"], resolve),
      options: {
        history: true,
        pushState: true
      }
    }
  ]
});
