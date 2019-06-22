import devinfo from "./devinfo";

// 固定参数
const baseinfo1 = {
  // api_channel: search['utm_source'] || 'html',

  api_channel: "App",
  app_type: "android",
  app_version: 40,
  channel: "App",
  appid: "90000",
  device_info: {
    
    and_id: "a8fafc7f0cb3129b",
    gaid: "6cd896f6-a13b-4a04-a0d0-9db3e84bec6a",
    imei: "0",
    sn: "0",
    model: "Redmi 5 Plus",
    brand: "xiaomi"
  },

  version: 70,
  guid: "ebbbbabb15d13790e371bc15d1a59089",
  app_package: "com.ahudianna.skad",
  userid: "6e331d49c1616e66449f297e2dff0cb0"
  // userid: "3a2b615169ace063981d0195818fbbe0"
  // userid: "3a2b615169ace063981d0195818fbbe7"
};

const baseinfo2 = {
  api_channel: "App",
  app_type: devinfo.app_type,
  app_version: devinfo.app_version,
  channel: devinfo.channel,
  appid: devinfo.appid || "10000",
  device_info: devinfo.device_info,
  version: devinfo.version,
  gaid: devinfo.gaid,
  position: devinfo.position,
  guid: devinfo.guid,
  app_package: devinfo.app_package,
  userid: devinfo.userid
};
const baseinfo = process.env.NODE_ENV === "production" ? baseinfo2 : baseinfo1;
export default baseinfo;
