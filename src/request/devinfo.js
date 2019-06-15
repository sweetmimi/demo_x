let devinfo = "";
// process.env.NODE_ENV === 'production' ? JSON.parse(Cashcash.getLoanDeviceInfo()) : '';
if (process.env.NODE_ENV === "production" && location.hash != "#/FaqCashcash") {
  try {
    if (typeof eval(Cashcash.getLoanDeviceInfo) == "function") {
      devinfo = JSON.parse(Cashcash.getLoanDeviceInfo());
    }
  } catch (e) {
    // alert("not function");
  }
}
export default devinfo;
