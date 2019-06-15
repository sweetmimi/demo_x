<template>
  <div class="bgc"
       style="overflow: scroll;">
    <div class="faq-top"
         v-if="list==list0">
      <li @click="clickUrl(1)">
        <i>
          <img src="/static/images/icon-FAQ-borrow2.png"
               alt>
        </i>
        <p>Pinjaman</p>
      </li>
      <li class="bor"
          @click="clickUrl(2)">
        <i>
          <img src="/static/images/icon-FAQ-repayment.png"
               alt>
        </i>
        <p>Pengembalian
          <br>Pinjaman
        </p>
      </li>
      <li @click="clickUrl(3)">
        <i>
          <img src="/static/images/icon-FAQ-other2.png"
               alt>
        </i>
        <p>Lainnya</p>
      </li>
    </div>

    <div class="faq-list"
         :style="{'padding-bottom': pbottom+'px'}">
      <div class="title"
           v-if="list==list0">
        <img src="/static/images/Groupxxxhdpi.png"
             alt>
        <p>Masalah Yang Umum</p>
      </div>

      <div class="faq-list-div"
           v-for="(item,index) in list"
           :key="index"
           @click="item.flag=!item.flag"
           :class="[ item.flag===true ? 'faq-list-div-show':'']">
        <div class="left">
          <i class="sh"></i>
          <i class="zk"></i>
        </div>
        <div class="right"
             @click="fun($event,index)">
          <h4>{{`${index+1}. ${item.title}`|toreplacename}}</h4>
          <p>{{item.txt|toreplacename}}</p>
        </div>

        <div v-if="(index+1)!==list.length"
             class="br"></div>
      </div>
    </div>
  </div>
</template>
<script>
import devinfo from "../request/devinfo.js";
const packgename =
  process.env.NODE_ENV === "production" ? devinfo.app_package : "id.pedia.pinjam";

export default {
  name: "FaqPage",
  data() {
    return {
      active: "",
      pbottom: "",
      list: [],



      list0: [
        {
          title: " Bagaimana cara mengajukan pinjaman?",
          txt:
            "Halo, tappname disini menyediakan informasi pinjaman dari berbagai lending platforms. Kamu bisa mengajukan pinjaman dengan memilih salah satu informasi pinjaman yang sesuai dengan kebutuhan kamu. Klik “download dan ajukan” di aplikasi yang kamu pilih lalu isi informasi pribadi yang diminta saat pengajuan kamu.",
          flag: false
        },
        {
          title: " Berapa banyak yang bisa saya pinjam?",
          txt:
            "Halo, jumlah pinjaman yang ditawakan oleh masing-masing aplikasi pinjaman yang tersedia di tappname berbeda-beda. Dimulai dari 200 ribu hingga 20 juta rupiah. ",
          flag: false
        },
        {
          title: " Bagaimana cara membayar setelah meminjam?",
          txt:
            "Kamu akan mendapatkan sms, email atau kamu bisa melihat cara pembayarannya diaplikasi pinjaman yang kamu ajukan.",
          flag: false
        },
        {
          title: " Apa saja metode pembayarannya?",
          txt:
            "Metode pembayaran yang disediakan masing-masing aplikasi pinjaman berbeda-beda bisa menggunakan bank transfer, mobile banking, internet banking, atau diminimarket yang bekerjasama dengan aplikasi pinjaman yang kamu ajukan.",
          flag: false
        },
        {
          title:
            " Bagaimana jika ponsel yang terdaftar gagal menerima kode verifikasi?",
          txt:
            "Halo, kamu bisa meminta kode verifikasi kembali dan pastikan jaringan operator kamu dalam kondisi stabil.",
          flag: false
        },
        {
          title:
            " Bagaimana jika aplikasi tappname terhenti dengan sendirinya?",
          txt:
            "Halo, pastikan kamu memiliki memori yang cukup bagi aplikasi tappname untuk beroperasi, kamu bisa membersihkan memory cache kamu lalu coba jalankan aplikasi tappname kembali.",
          flag: false
        }
      ],

      list1: [
        {
          title: "Bagaimana cara mengajukan pinjaman?",
          txt:
            "tappname disini menyediakan informasi pinjaman dari berbagai lending platforms. Kamu bisa mengajukan pinjaman dengan memilih salah satu informasi pinjaman yang sesuai dengan kebutuhan kamu. Klik “download dan ajukan” di aplikasi yang kamu pilih lalu isi informasi pribadi yang diminta saat pengajuan kamu.",
          flag: false
        },

        {
          title: "Berapa lama proses verifikasi pinjaman?",
          txt:
            "Proses audit pinjaman umumnya memakan waktu 1-2 hari sampai kamu mendapatkan notifikasi apakah pinjamanmu disetujui atau tidak.",
          flag: false
        },
        {
          title: "Berapa banyak yang bisa saya pinjam?",
          txt:
            "Jumlah pinjaman yang ditawarkan oleh masing-masing aplikasi pinjaman yang tersedia di tappname berbeda-beda. Dimulai dari 200 ribu hingga 20 juta rupiah.",
          flag: false
        },
        {
          title: "Berapa lama saya bisa meminjam?",
          txt:
            "Terkait jangka waktu pinjaman yang ditawarkan masing-masing aplikasi pinjaman berbeda-beda mulai dari 7 hari hingga 6 bulan. Namun, untuk lebih lengkapnya kamu bisa mengecek kembali aplikasi tappname dan melihat jangka waktu yang ditawarkan dari masing-masing aplikasi pinjaman.",
          flag: false
        },
        {
          title: "Berapa bunga?",
          txt:
            "Terkait suku bunga yang ditawarkan oleh tiap-tiap aplikasi berbeda-beda dimulai dari 0,33 % - 1 % . Untuk lebih detail kamu bisa mengecek kembali aplikasi tappname dan melihat suku bunga dari masing-masing aplikasi pinjaman.",
          flag: false
        },
        {
          title: "Bagaimana persyaratan pinjaman?",
          txt:
            "Untuk persyaratan yang diminta tiap aplikasi pinjaman berbeda-beda. Namun, persyaratan umum yang dibutuhkan adalah peminjam harus berumur minimal 18 tahun, memiliki KTP dan informasi pekerjaan, namun ada beberapa aplikasi pinjaman yang membutuhkan slip gaji.",
          flag: false
        },
        {
          title: "Informasi apa yang perlu disediakan oleh pinjaman?",
          txt:
            "Kamu cukup menyiapkan informasi ktp, status pekerjaan dan domisili.",
          flag: false
        },
        {
          title: "Area apa yang dapat didukung pinjaman?",
          txt:
            "Untuk area jangkauan setiap aplikasi pinjaman berbeda-beda mulai dari Jabodetabek hingga seluruh Indonesia. Kamu bisa mengecek kembali aplikasi tappname dan melihat area pinjaman dari masing-masing aplikasi pinjaman.",
          flag: false
        },

        {
          title: "Apakah saya bisa meminjam jika tidak memiliki rekening bank?",
          txt:
            "Mohon maaf, kamu harus memiliki rekening bank sebagai sarana untuk menerima dana pinjaman yang kamu ajukan.",
          flag: false
        },
        {
          title:
            "Bagaimana saya tahu jika pinjaman yang saya ajukan disetujui?",
          txt:
            "kamu bisa mengecek status peminjaman didalam aplikasi pinjaman kamu & sebagian aplikasi juga akan mengirimkan notifikasinya melalui sms berupa persetujuan atau penolakan dari pinjaman yang kamu ajukan.",
          flag: false
        },
        {
          title: "Mengapa pengajuan pinjaman saya ditolak?",
          txt:
            "Masing-masing aplikasi pinjaman yang tersedia di tappname akan melihat status kredit kamu untuk dapat memutuskan apakah pinjaman yang kamu ajukan akan disetujui atau ditolak. Serta pastikan informasi yang kamu berikan benar, lengkap dan dapat terverifikasi oleh aplikasi pinjaman.",
          flag: false
        },
        {
          title:
            "Bagaimana cara cepat menemukan pinjaman yang terbaik untuk Anda?",
          txt:
            "tappname menyediakan fitur “pilihan pinjamanmu” untuk membantu menemukan pinjaman yang sesuai dengan kebutuhan.",
          flag: false
        },
        {
          title: "Bisakah siswa / pengusaha / ibu rumah tangga meminjam uang?",
          txt:
            "Untuk beberapa aplikasi pinjaman memberikan kesempatan pinjaman bagi siswa/pengusaha/ibu rumah tangga dengan penghasilan yang pasti.",
          flag: false
        },
        {
          title: "Apakah saya bisa mengajukan pinjaman untuk kedua kalinya?",
          txt:
            "Kamu bisa mengajukan pinjaman untuk kedua kalinya setelah kamu melakukan pelunasan pada pinjaman pertama.",
          flag: false
        },
        {
          title: "Kenapa proses verifikasi datanya sulit?",
          txt:
            "Kamu bisa mengikuti instruksi yang diminta di aplikasi pinjaman yang akan kamu ajukan serta pastikan data yang kamu berikan jelas, lengkap dan dapat terverifikasi dengan baik.",
          flag: false
        },
        {
          title: "Berapa usia yang boleh untuk pengajuan pinjaman?",
          txt:
            "Usia minimal yang diperbolehkan untuk mengajukan pinjaman adalah 18 tahun.",
          flag: false
        },
        {
          title: "Kenapa sudah disetujui tapi dana belum masuk?",
          txt:
            "Umumnya pencairan dana memakan waktu 2x24 jam sejak kamu menerima notifikasi bahwa pinjaman kamu disetujui.",
          flag: false
        },
        {
          title: "Apakah pinjamannya pakai agunan?",
          txt: "Untuk pinjaman yang ditawarkan adalah pinjaman tanpa agunan.",
          flag: false
        },
        {
          title: "Apakah saya bisa pinjam jika tidak memiliki kartu kredit?",
          txt:
            "Kamu tidak harus memiliki kartu kredit untuk mengajukan pinjaman.",
          flag: false
        }
      ],

      list2: [
        {
          title: "Bagaimana cara membayar setelah meminjam?",
          txt:
            "Kamu akan mendapatkan sms, email atau kamu bisa melihat cara pembayarannya diaplikasi pinjaman yang kamu ajukan.",
          flag: false
        },
        {
          title: "Apa saja metode pembayarannya?",
          txt:
            "Metode pembayaran yang disediakan masing-masing aplikasi pinjaman berbeda-beda bisa menggunakan bank transfer, mobile banking, internet banking, atau diminimarket yang bekerjasama dengan aplikasi pinjaman yang kamu ajukan.",
          flag: false
        },
        {
          title: "Apakah bisa melunasi sebelum jatuh tempo?",
          txt:
            "Kamu bisa melunasi pinjaman kamu sebelum jatuh tempo dengan mengikuti persyaratan dan ketentuan dari aplikasi pinjaman yang kamu ajukan.",
          flag: false
        },
        {
          title: "Apakah saya bisa membayar dengan angsuran?",
          txt:
            "Hai, untuk pembayaran pinjaman tergantung dari masing-masing aplikasi pinjaman dan jangka waktu pinjaman yang kamu ajukan, ada yang secara langsung maupun diangsur. ",
          flag: false
        },
        {
          title: "Bagaimana jika pembayarannya telah melewati jatuh tempo?",
          txt:
            "Untuk pembayaran yang telah jatuh tempo akan dikenakan denda sesuai dengan kebijakan aplikasi pinjaman yang kamu ajukan tersebut. ",
          flag: false
        },
        {
          title: "Berapa suku bunga pinjaman yang telah jatuh tempo?",
          txt:
            "Untuk hal tersebut tergantung dari berapa lama kamu telah melewati batas jatuh tempo pinjaman yang kamu ajukan serta tergantung dari kebijakan serta peraturan masing-masing aplikasi pinjaman. ",
          flag: false
        }
      ],

      list3: [
        {
          title:
            " Bagaimana jika ponsel yang terdaftar gagal menerima kode verifikasi?",
          txt:
            "Kamu bisa meminta kode verifikasi kembali dan pastikan jaringan operator kamu dalam kondisi stabil.",
          flag: false
        },
        {
          title: "Bagaimana jika aplikasi tappname terhenti dengan sendirinya?",
          txt:
            "Pastikan kamu memiliki memori yang cukup bagi aplikasi tappname untuk beroperasi, kamu bisa membersihkan memory cache kamu lalu coba jalankan aplikasi tappname kembali.",
          flag: false
        },
        {
          title: "Mengapa saya tidak dapat membuka aplikasi tappname?",
          txt:
            "Terkait kendala yang dialami. Apakah kamu sudah melakukan update terbaru dari tappname? Silahkan melakukan update terlebih dahulu, apabila masih terjadi masalah di tappname kamu. Silahkan melaporkan detail permasalahan kamu ke support@tappname.id.",
          flag: false
        },
        {
          title:
            "Kenapa setelah klik 'download dan pinjam' tetapi tidak terjadi apa2/freeze / error? ",
          txt:
            "Kamu bisa mencoba mengupdate aplikasi tappname terlebih dahulu, dan jika masalah tetap terjadi kamu bisa mengirimkan email mengenai permasalahanmu ke support@tappname.id.",
          flag: false
        }
      ]
    };
  },

  created() {
    this.list = this.$route.query.type
      ? this["list" + this.$route.query.type]
      : this.list0;



  },
  watch: {
    $route: function () {
      this.pbottom = 0;
      this.list = this.$route.query.type
        ? this["list" + this.$route.query.type]
        : this.list0;
    }
  },

  mounted() { },
  filters: {
    toreplacename: (value) => {
      if (!value) return ''
      value = value.toString()
      let appname = ''
      switch (packgename + '') {
        case 'com.firestorm.sea.pinjam':
          appname = 'Cashstore';
          break;
        case 'com.firestorm.sea.cashcash':
          appname = 'Cashcashpro';
          break;
        case 'com.tl.bostunai':
          appname = 'Bostunai';
          break;
        case 'com.tl.tplus':
          appname = 'TunaiPlus';
          break;
        case 'com.tl.danakilat':
          appname = 'DompetKilat';
          break;
        case 'com.tl.cashmarket':
          appname = 'Cashmarket';
          break;
        case 'com.mk.mrkredit':
          appname = 'Mr. Kredit';
          break;
        case 'com.tp.tuanpinjaman':
          appname = 'Tuan Pinjaman';
          break;
        case 'com.fs.hitungkredit':
          appname = 'Hitungkredit';
          break;
        case 'com.lt.lapaktunai':
          appname = 'Lapak Tunai';
          break;
        case 'com.ci.cashinstan':
          appname = 'Market Pinjaman';
          break;
        case 'com.rk.rajakredit':
          appname = 'RajaKredit';
          break;
        case 'com.firestorm.sea.du':
          appname = 'Dunia Uang';
          break;
        case 'com.dd.danadarurat':
          appname = 'Dana Darurat';
          break;
        case 'com.us.uangsegar':
          appname = 'Uang Segar';
          break;
        case 'com.tl.pinjamaja':
          appname = 'Pinjam Aja';
          break;
        case 'com.tl.tokokredit':
          appname = 'Toko Tunai';
          break;
        case 'com.tl.kreditkilat':
          appname = 'Dana Ok';
          break;
        case 'com.dd.duwitdarurat':
          appname = 'Duwit Darurat';
          break;
        case 'com.fs.mesintunai':
          appname = 'Mesin Tunai';
          break;
        case 'id.duwit.pinjem':
          appname = 'Pinjem duwit';
          break;
        case 'id.mon.pinjam':
          appname = 'Pinjam-Mon';
          break;
        case 'com.dutu.duniatunai':
          appname = 'Dunia Tunai';
          break;
        case 'id.pedia.cash':
          appname = 'Cashpedia';
          break;
        case 'id.segar.dompet':
          appname = 'Dompet Segar';
          break;
        case 'id.gurita.pinjaman':
          appname = 'Pinjaman gurita';
          break;
        case 'id.mj.mominjem':
          appname = 'Mominjem';
          break;
        case 'id.uang.bumi':
          appname = 'Bumi uang';
          break;
        case 'id.hero.pinjaman':
          appname = 'Pinjaman Hero';
          break;
        case 'id.pinjaman.mega':
          appname = 'Mega Pinjaman';
          break;
        case 'id.pinjaman.nusantara':
          appname = 'Pinjaman Nusantara';
          break;
        case 'id.dana.happy':
          appname = 'Dana Happy';
          break;
        case 'com.pinjaman.pohon':
          appname = 'Pohon Pinjaman';
          break;
        case 'id.cash.second':
          appname = 'Cashcash';
          break;
        case 'id.sahabat.dana':
          appname = 'DanaSahabat';
          break;
        case 'id.mudah.pinjam':
          appname = 'PinjamMudah';
          break;

        case 'id.cepat.pinjol':
          appname = 'PinjolCepat';
          break;

        case 'id.pinjaman.bursa':
          appname = 'BursaPinjaman';
          break;

        case 'id.kilat.pinjol':
          appname = 'PinjolKilat';
          break;

        case 'id.market.rupiah':
          appname = 'RupiahMarket ';
          break;

        case 'id.mudah.rupiah':
          appname = 'RupiahMudah';
          break;

        case 'id.dong.pinjam':
          appname = 'PinjamDong';
          break;

        case 'id.mudah.pinjol':
          appname = 'PinjolMudah';
          break;

        case 'id.mudah.cash':
          appname = 'CashMudah';
          break;

        case 'id.pedia.pinjam':
          appname = 'Pinjampedia';
          break;


        default:
          appname = 'Aplikasi';
          break;
      }
      // document.title = document.title || appname;
      document.title = appname;

      return value.replace(/tappname/g, `${appname}`)
      // if (appname == 'Faq') {
      //   return value.replace(/tappname/g, 'Aplikasi')
      // } else {
      //   return value.replace(/tappname/g, `${appname}`)
      // }

    }
  },
  methods: {

    clickUrl(index) {
      this.pbottom = 0;
      this.$router.push({ path: "/FaqCashcash", query: { type: index } });
    },

    fun(e, index) {
      if (index + 1 == this.list.length) {
        this.pbottom = this.pbottom > 0 ? 0 : e.target.parentNode.clientHeight;
        setTimeout(() => {
          document.getElementsByClassName("bgc")[0].scrollTop = 6000;
        }, 0);
      }
    }
  }
  // methods end
};
</script>


