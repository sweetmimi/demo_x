<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import devinfo from './request/devinfo'

var packgename =
  process.env.NODE_ENV === 'production' ? devinfo.app_package : ''
export default {
  name: 'App',
  data() {
    return {
      theme: 'themecashstore'
    }
  },
  created() {

    switch (packgename + '') {
      case 'com.ahudianna.skad':
        document.title = 'Cashstore'
        this.theme = 'themecashstore'
        break
      case 'com.firestorm.sea.pinjam':
        document.title = 'Cashstore'
        this.theme = 'themecashstore'
        break
      case 'com.tl.bostunai':
        document.title = 'Bostunai'
        this.theme = 'themebostunai'
        break
      case 'com.tl.tplus':
        document.title = 'TunaiPlus'
        this.theme = 'themetunaiplus'
        break
      case 'com.tl.danakilat':
        document.title = 'DompetKilat'
        this.theme = 'themedompetkilat'
        break
      case 'com.tl.cashmarket':
        document.title = 'Cashmarket'
        this.theme = 'themebostunai'
        break
      case 'com.mk.mrkredit':
        document.title = 'Mr. Kredit'
        this.theme = 'thememrkredit'
        break
      case 'com.tp.tuanpinjaman':
        document.title = 'Tuan Pinjaman'
        this.theme = 'themebostunai'
        break
      case 'com.fs.hitungkredit':
        document.title = 'Hitungkredit'
        this.theme = 'themecashhitu'
        break
      case 'com.lt.lapaktunai':
        document.title = 'Lapak Tunai'
        this.theme = 'themelapaktunai'
        break
      case 'com.ci.cashinstan':
        document.title = 'Market Pinjaman'
        this.theme = 'thememarketpinjaman'
        break
      case 'com.rk.rajakredit':
        document.title = 'RajaKredit'
        this.theme = 'themerajakredit'
        break
      case 'com.firestorm.sea.du':
        document.title = 'Dunia Uang'
        this.theme = 'themeduniauang'
        break
      case 'com.dd.danadarurat':
        document.title = 'Dana Darurat'
        this.theme = 'themedanadarurat'
        break
      case 'com.us.uangsegar':
        document.title = 'Uang Segar'
        this.theme = 'themeuangsegar'
        break
      case 'com.tl.pinjamaja':
        document.title = 'Pinjam Aja'
        this.theme = 'themepinjamaja'
        break
      case 'com.tl.tokokredit':
        document.title = 'Toko Tunai'
        this.theme = 'themetokokredit'
        break
      case 'com.tl.kreditkilat':
        document.title = 'Dana Ok'
        this.theme = 'themekreditkilat'
        break
      case 'id.dong.pinjam':
        document.title = 'Pinjam Dong'
        this.theme = 'themekreditkilat'
        break
      case 'com.dd.duwitdarurat':
        document.title = 'Duwit Darurat'
        this.theme = 'themeduwitdarurat'
        break
      case 'com.fs.mesintunai':
        document.title = 'Mesin Tunai'
        this.theme = 'thememesintunai'
        break
      case 'id.duwit.pinjem':
        document.title = 'Pinjem duwit'
        this.theme = 'themeduwitpinjem'
        break
      case 'id.mon.pinjam':
        document.title = 'Pinjam-Mon'
        this.theme = 'thememonpinjam'
        break
      case 'com.dutu.duniatunai':
        document.title = 'Dunia Tunai'
        this.theme = 'themeduniatunai'
        break
      case 'id.pedia.cash':
        document.title = 'Cashpedia'
        this.theme = 'themepediacash'
        break
      case 'id.segar.dompet':
        document.title = 'Dompet Segar'
        this.theme = 'themedompetsegar'
        break
      case 'id.gurita.pinjaman':
        document.title = 'Pinjaman gurita'
        this.theme = 'themeguritapinjaman'
        break
      case 'id.mudah.rupiah':
        document.title = 'Rupiah Mudah'
        this.theme = 'themeguritapinjaman'
        break
      case 'id.mj.mominjem':
        document.title = 'Mominjem'
        this.theme = 'thememominjem'
        break
      case 'id.uang.bumi':
        document.title = 'Bumi uang'
        this.theme = 'themebumiuang'
        break
      case 'id.hero.pinjaman':
        document.title = 'Pinjaman Hero'
        this.theme = 'themepinjamanhero'
        break
      case 'id.pinjaman.mega':
        document.title = 'Mega Pinjaman'
        this.theme = 'themepinjamanmega'
        break
      case 'id.pinjaman.nusantara':
        document.title = 'Pinjaman Nusantara'
        this.theme = 'themepinjamannusantara'
        break
      case 'id.dana.happy':
        document.title = 'Dana Happy'
        this.theme = 'themedanahappy'
        break
      case 'com.pinjaman.pohon':
        document.title = 'Pohon Pinjaman'
        this.theme = 'themepinjamanpohon'
        break
      case 'id.cash.second':
        document.title = 'AndroidH'
        this.theme = 'themesecondcashcash'
        break
      case 'id.sahabat.dana':
        document.title = 'DanaSahabat'
        this.theme = 'themedanaSahabat'
        break

      case 'id.mudah.pinjam':
        document.title = 'PinjamMudah'
        this.theme = 'themepinjamMudah'
        break

      case 'id.cepat.pinjol':
        document.title = 'Pinjol Cepat'
        this.theme = 'themecepatpinjol'
        break

      case 'id.pinjaman.bursa':
        document.title = 'Bursa Pinjaman'
        this.theme = 'themepinjamanbursa'
        break

      case 'id.kilat.pinjol':
        document.title = 'Pinjol Kilat'
        this.theme = 'themekilatpinjol'
        break

      case 'id.market.rupiah':
        document.title = 'Rupiah Market'
        this.theme = 'thememarketrupiah'
        break

      case 'id.mudah.pinjol':
        document.title = 'Pinjol Mudah'
        this.theme = 'thememudahpinjol'
        break

      case 'id.mudah.cash':
        document.title = 'Cash Mudah'
        this.theme = 'thememudahcash'
        break

      case 'id.pedia.pinjam':
        document.title = 'Pinjampedia'
        this.theme = 'themepediapinjam'
        break

      case 'id.pinjol.mr':
        document.title = 'Mr.Pinjol'
        this.theme = 'thememrpinjol'
        break
      case 'com.firestorm.sea.cashcash':
        document.title = 'Cashcashpro'
        this.theme = 'themecashcash'
        break

      case 'id.dulu.utang':
        document.title = 'Utang Dulu'
        this.theme = 'themeduluutang'
        break

      case 'id.kredit.dompet':
        document.title = 'Dompet Kredit'
        this.theme = 'themekreditdompet'
        break

      case 'id.tebal.dompet':
        document.title = 'Dompet Tebal'
        this.theme = 'themetebaldompet'
        break

      case 'id.duit.mesin':
        document.title = 'Mesin duit'
        this.theme = 'themeduitmesin'
        break

      case 'id.pesat.dana':
        document.title = 'Dana Pesat'
        this.theme = 'themepesatdana'
        break

      case 'id.kredit.dewa':
        document.title = 'Dewa Kredit'
        this.theme = 'themekreditdewa'
        break

      case 'id.kilat.fulus':
        document.title = 'Fulus Kilat'
        this.theme = 'themekilatfulus'
        break

      case 'id.pinjaman.ia':
        document.title = 'Pinjamania'
        this.theme = 'themepinjamania'
        break

      case 'id.pinjaman.box':
        document.title = 'Box Pinjaman'
        this.theme = 'themeboxpinjaman'
        break

      case 'id.duit.toko':
        document.title = 'Toko Duit'
        this.theme = 'themetokoduit'
        break

      case 'id.shac.third':
        document.title = 'AndroidH'
        this.theme = 'themecashcash2'
        break

      case 'com.bubble.octopus':
        document.title = 'Duit Cash Kilat'
        this.theme = 'themeduitcashkilat'
        break

      case 'com.dirt.tern':
        document.title = 'Lemari Kaca'
        this.theme = 'themelemarikaca'
        break

      case 'com.beard.starfish':
        document.title = 'Tes Limit'
        this.theme = 'themeteslimit'
        break

      case 'com.blade.ice':
        document.title = 'Cek Limit'
        this.theme = 'themeceklimit'
        break

      case 'com.datura.palsy':
        document.title = 'Pinjam Bank'
        this.theme = 'themepinjambank'
        break

      case 'com.laser.posture':
        document.title = 'TemanSejati'
        this.theme = 'themetemansejati'
        break

      case 'com.conquer.fate':
        document.title = 'Limit Mantap'
        this.theme = 'themelimitmantap'
        break

      case 'com.novey.crystal':
        document.title = 'Mari Berhitung'
        this.theme = 'thememariberhitung'
        break

      case 'com.carp.emperor':
        document.title = 'Jin Tomang'
        this.theme = 'themejintomang'
        break

      case 'com.faucet.rod':
        document.title = 'Kacang Nabati'
        this.theme = 'themekacangnabati'
        break

      case 'com.gas.vine':
        document.title = 'IkanMas'
        this.theme = 'themeIkanMas'
        break

      case 'com.plant.grill':
        document.title = 'Pinjaman Rakyat'
        this.theme = 'themePinjamanRakyat'
        break

      case 'com.agave.tongue':
        document.title = 'Pinjaman Canggih'
        this.theme = 'themePinjamanCanggih'
        break

      default:
        document.title = 'Aplikasi'
        this.theme = 'themecashcash'
        break
    }
    document.body.className = this.theme
  }

}
</script>

<style lang='less'>
@import "./common.less";

.themepesatdana {
  .theme(#f44771, #f44771, #f44771);
}

.themekreditdewa {
  .theme(#f18f2c, #f18f2c, #f18f2c);
}
.themelimitmantap {
  .theme(#38bb96, #38bb96, #38bb96);
}
.thememariberhitung {
  .theme(#15c4bf, #15c4bf, #15c4bf);
}

.themejintomang {
  .theme(#f68e56, #f68e56, #f68e56);
}

.themekacangnabati {
  .theme(#ebbb4e, #ebbb4e, #ebbb4e);
}

.themekilatfulus {
  .theme(#8636dd, #8636dd, #8636dd);
}

.themecashcash {
  .theme(#029c2e, #029c2e, #029c2e);
}

.themecashcash2 {
  .theme(#fd9025, #fd9025, #fd9025);
}

.themecashstore {
  .theme(#358a38, #4cbd50, #41bb46);
}

.themecashhitu {
  .theme(#ffb401, #ffc107, #fdcb2b);
}

.themebostunai {
  .theme(#ff3d38, #ff3d38, #ff3d38);
}

.themetunaiplus {
  .theme(#e0a300, #e0a300, #e0a300);
}

.themedompetkilat {
  .theme(#1698f5, #1698f5, #1698f5);
}

.thememrkredit {
  .theme(#3fe2d6, #3fe2d6, #3fe2d6);
}

.themelapaktunai {
  .theme(#58a2ee, #58a2ee, #58a2ee);
}

.thememarketpinjaman {
  .theme(#2ed6e7, #2ed6e7, #2ed6e7);
}

.themerajakredit {
  .theme(#7cc039, #7cc039, #7cc039);
}

.themeduniauang {
  .theme(#24c374, #24c374, #24c374);
}

.themedanadarurat {
  .theme(#24cd7c, #24cd7c, #24cd7c);
}

.themeuangsegar {
  .theme(#1675f5, #1675f5, #1675f5);
}

.themepinjamaja {
  .theme(#7042d0, #7042d0, #7042d0);
}

.themetokokredit {
  .theme(#8756df, #8756df, #8756df);
}

.themekreditkilat {
  .theme(#ffbd38, #ffbd38, #ffbd38);
}

.themeduwitdarurat {
  .theme(#1dff9d, #1dff9d, #1dff9d);
}

.thememesintunai {
  .theme(#ffc107, #ffc107, #ffc107);
}

.themeduwitpinjem {
  .theme(#007aff, #007aff, #007aff);
}

.thememonpinjam {
  .theme(#30a211, #30a211, #30a211);
}

.themeduniatunai {
  .theme(#23a2f2, #23a2f2, #23a2f2);
}

.themepediacash {
  .theme(#4736ed, #4736ed, #4736ed);
}

.themedompetsegar {
  .theme(#30a211, #30a211, #30a211);
}

.themeguritapinjaman {
  .theme(#007aff, #007aff, #007aff);
}

.themebumiuang {
  .theme(#96e6a0, #96e6a0, #96e6a0);
}

.themepinjamanhero {
  .theme(#f46a46, #f46a46, #f46a46);
}

.themepinjamanmega {
  .theme(#43aeff, #43aeff, #43aeff);
}

.themepinjamannusantara {
  .theme(#ff3d38, #ff3d38, #ff3d38);
}

.themedanahappy {
  .theme(#ffbf00, #ffbf00, #ffbf00);
}

.themepinjamanpohon {
  .theme(#ff8947, #ff8947, #ff8947);
}

.themesecondcashcash {
  .theme(#ff8000, #ff8000, #ff8000);
}

.themedanaSahabat {
  .theme(#df1e1e, #df1e1e, #df1e1e);
}

.themepinjamMudah {
  .theme(#3959c8, #3959c8, #3959c8);
}

.themecepatpinjol {
  .theme(#446fff, #446fff, #446fff);
}

.themepinjamanbursa {
  .theme(#f7694f, #f7694f, #f7694f);
}

.themekilatpinjol {
  .theme(#ff4e4e, #ff4e4e, #ff4e4e);
}

.thememarketrupiah {
  .theme(#30d56a, #30d56a, #30d56a);
}

.thememudahpinjol {
  .theme(#09a4f5, #09a4f5, #09a4f5);
}

.thememudahcash {
  .theme(#3a7afe, #3a7afe, #3a7afe);
}

.themepediapinjam {
  .theme(#e2bc1b, #e2bc1b, #e2bc1b);
}

.thememrpinjol {
  .theme(#ee384e, #ee384e, #ee384e);
}

.thememominjem {
  .theme(#ff9000, #ff9000, #ff9000);
}

.themeduluutang {
  .theme(#2bb673, #2bb673, #2bb673);
}

.themekreditdompet {
  .theme(#3f7bf1, #3f7bf1, #3f7bf1);
}

.themetebaldompet {
  .theme(#63068d, #63068d, #63068d);
}

.themeduitmesin {
  .theme(#31c457, #31c457, #31c457);
}

.themepinjamania {
  .theme(#3f80f3, #3f80f3, #3f80f3);
}

.themeboxpinjaman {
  .theme(#f1c016, #f1c016, #f1c016);
}

.themetokoduit {
  .theme(#5bc3ff, #5bc3ff, #5bc3ff);
}

.themeduitcashkilat {
  .theme(#722ed1, #722ed1, #722ed1);
}

.themelemarikaca {
  .theme(#3194ff, #3194ff, #3194ff);
}

.themeteslimit {
  .theme(#f33a47, #f33a47, #f33a47);
}

.themeceklimit {
  .theme(#82ca9c, #82ca9c, #82ca9c);
}

.themepinjambank {
  .theme(#39bb74, #39bb74, #39bb74);
}

.themetemansejati {
  .theme(#d357c0, #d357c0, #d357c0);
}

.themeIkanMas {
  .theme(#1890FF, #1890FF, #1890FF);
}

.themePinjamanRakyat {
  .theme(#1871FF, #1871FF, #1871FF);
}

.themePinjamanCanggih {
  .theme(#FF515B, #FF515B, #FF515B);
}


</style>
