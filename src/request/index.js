"use strict";

import axios from "axios";
// import md5 from 'md5';
// import crypto from 'crypto';
import CryptoJS from "crypto-js";
import baseinfo from "./baseinfo";
import Vue from "vue";

import { ToastPlugin, LoadingPlugin } from "vux";
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
const search = {};
window.location.search
  .slice(1)
  .split("&")
  .forEach(item => {
    let res = item.split("=");
    search[res[0]] = res[1];
  });

// function isWebview() {
//   var ua = navigator.userAgent;
//   var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
//   var webview =
//     !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/);

//   return webview;
// }
//开发or发布
const DEV_BASE_URL = "/apis";
const PROD_BASE_URL = "/apis";
const baseURL =
  process.env.NODE_ENV === "production" ? PROD_BASE_URL : DEV_BASE_URL;
// 创建axios实例
const service = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json;charset=utf-8" },
  method: "post",
  responseType: "json",
  transformRequest(data) {
    let sortdata = {};
    data = Object.assign({}, baseinfo, data);
    Object.keys(data)
      .sort()
      .map(item => {
        sortdata[item] = data[item];
      });
    const time = new Date().valueOf();
    let signstr = "";
    if (baseinfo.app_package == "com.firestorm.sea.cashcash") {
      // baseinfo.app_package == "com.tl.pinjamanduit" ||
      // baseinfo.app_package == "com.tl.sakupinjaman" ||
      // baseinfo.app_package == "com.tl.pinjamaja" ||
      // baseinfo.app_package == "com.tl.cashmarket" ||
      // baseinfo.app_package == "com.tl.danakilat" ||
      // baseinfo.app_package == "com.tl.danapintar" ||
      // baseinfo.app_package == "com.tl.kreditcepat" ||
      // baseinfo.app_package == "com.tl.kreditkilat" ||
      // baseinfo.app_package == "com.tl.danasegar" ||
      // baseinfo.app_package == "com.tl.tokokredit" ||
      // baseinfo.app_package == "com.tl.tplus" ||
      // baseinfo.app_package == "com.tl.bostunai" ||
      // baseinfo.app_package == "com.mk.mrkredit" ||
      // baseinfo.app_package == "com.tp.tuanpinjaman" ||
      // baseinfo.app_package == "com.lt.lapaktunai" ||
      // baseinfo.app_package == "com.ci.cashinstan" ||
      // baseinfo.app_package == "com.rk.rajakredit" ||
      // baseinfo.app_package == "com.firestorm.sea.du" ||
      // baseinfo.app_package == "com.dd.danadarurat" ||
      // baseinfo.app_package == "com.us.uangsegar" ||
      // baseinfo.app_package == "com.tl.pinjamaja" ||
      // baseinfo.app_package == "com.tl.tokokredit" ||
      // baseinfo.app_package == "com.tl.kreditkilat" ||
      // baseinfo.app_package == "com.dd.duwitdarurat" ||
      // baseinfo.app_package == "com.fs.mesintunai" ||
      // baseinfo.app_package == "id.mon.pinjam" ||
      // baseinfo.app_package == "id.duwit.pinjem" ||
      // baseinfo.app_package == "com.dutu.duniatunai" ||
      // baseinfo.app_package == "id.pedia.cash" ||
      // baseinfo.app_package == "id.segar.dompet" ||
      // baseinfo.app_package == "id.gurita.pinjaman" ||
      // baseinfo.app_package == "id.mj.mominjem" ||
      // baseinfo.app_package == "id.uang.bumi" ||
      // baseinfo.app_package == "id.hero.pinjaman" ||
      // baseinfo.app_package == "id.pinjaman.mega" ||
      // baseinfo.app_package == "id.pinjaman.nusantara" ||
      // baseinfo.app_package == "id.dana.happy" ||
      // baseinfo.app_package == "com.pinjaman.pohon" ||
      // baseinfo.app_package == "id.cash.second" ||
      // baseinfo.app_package == "com.fs.hitungkredit"
      // 签名的key:
      signstr = "kenny06300maonian@tao!cashcash";
    } else {
      signstr = "zmaoniany@mjb@tao!cashcash96300";
    }
    const sign = CryptoJS.MD5(
      CryptoJS.MD5(
        `${signstr}*|*${JSON.stringify(sortdata)}@!@${time}`,
        //console.log(`${signstr}*|*${JSON.stringify(sortdata)}@!@${time}`)
      ).toString()
    ).toString();
     //console.log(sortdata);
    let encrypt = function(key, iv, data) {
      // var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
      // var crypted = cipher.update(data, 'utf8', 'binary');
      // crypted += cipher.final('binary');
      // crypted = new Buffer(crypted, 'binary').toString('base64');
      // return crypted;
      var key = CryptoJS.enc.Utf8.parse(key); //16位
      var iv = CryptoJS.enc.Utf8.parse(iv);
      var encrypted = "";
      if (typeof data == "string") {
        var srcs = CryptoJS.enc.Utf8.parse(data);
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
      }
      // alert(encrypted.toString());
      return encrypted.toString();//返回的是base64格式的密文
    };
    // console.log(
    //   JSON.stringify(Object.assign({}, sortdata, { sign, timestamp: time }))
    // );

    const form = new FormData();
    form.append(
      "data",
      encrypt(
        "kenny@1989063006",
        "abc123rty456nji7",
        JSON.stringify(Object.assign({}, sortdata, { sign, timestamp: time }))
      )
    );
    return form;
  }
});

// request拦截器
service.interceptors.request.use(
  config => {
    // Vue.$vux.loading.show({ text: "Loading" });
    return config;
  },
  error => Promise.reject(error)
);

// respone拦截器
service.interceptors.response.use(
  response => {
    // Vue.$vux.loading.hide();
    // console.log(JSON.stringify(response));
    if (+response.status !== 200) {
      return Promise.reject(response);
    }
    const data = response.data;
    if (data.hasOwnProperty("code")) {
      return data;
    } else {
      return Promise.reject(response);
    }
  },

  error => {
    // Vue.$vux.loading.hide();
    if (!error.response) {
      //请求超时
      if (error.message.includes("timeout")) {
        Vue.$vux.toast.show({
          text: "timeout",
          type: "text",
          position: "middle",
          width: "80%"
        });
      } else {
        //断网，可以展示断网组件
        Vue.$vux.toast.show({
          // text: "request broken",
          text:"Kesalahan permintaan",
          type: "warn",
          position: "middle",
          width: "80%"
        });
      }
      return;
    }
    // const status = error.response.status;
    Vue.$vux.toast.show({
      text: error,
      type: "text",
      position: "middle",
      width: "80%"
    });
    Promise.reject(error);
  }
);

export default service;
