let devinfo = "";
// process.env.NODE_ENV === 'production' ? JSON.parse(AndroidH.getLoanDeviceInfo()) : '';
if (process.env.NODE_ENV === "production" && location.hash != "#/FaqCashcash") {
  try {
    if (typeof eval(AndroidH.getLoanDeviceInfo) == "function") {
      devinfo = JSON.parse(AndroidH.getLoanDeviceInfo());
    }
  } catch (e) {
    // alert("not function");
  }
}
export default devinfo;
