import Vue from "vue";
import App from "./App";
import router from "./router";
import {NoticeBar } from 'vant';
Vue.use(NoticeBar);
import { ToastPlugin, LoadingPlugin } from "vux";
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);

const FastClick = require("fastclick");
FastClick.attach(document.body);
Vue.config.productionTip = false;

import axios from "./request";
Vue.prototype.axios = axios;

// 全局组件 底部tips
import BottomTips from "./components/Bottomtips.vue";
Vue.component("BottomTips", BottomTips);

// 全局组件  
import Kefuicon from "./components/Kefuicon.vue";
Vue.component("Kefuicon", Kefuicon);

// import eruda from "eruda";
// if (process.env.NODE_ENV !== "production") {
//   eruda.init();
// }

// import './flexible'

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
