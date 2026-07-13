import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import "./Faq.css";
import BRI from "../../assets/BRI.png";
import BNI from "../../assets/BNI.png";
import YBM from "../../assets/YBM.png";
import PLN from "../../assets/PLN.png";

const faqData = [
  {
    category: "Informasi Umum",
    id: "informasi-umum",
    questions: [
      {
        q: "Kapan PLN ELECTRIC RUN 2026 akan diselenggarakan?",
        a: "PLN Electric Run 2026 akan diselenggarakan pada hari Minggu, 12 Oktober 2026.",
      },
      {
        q: "Dimana lokasi lomba PLN ELECTRIC RUN 2026 akan dilaksanakan?",
        a: "Lokasi pusat penyelenggaraan (Race Village) akan berpusat di Gelora Bung Karno (GBK), Senayan, Jakarta.",
      },
      {
        q: "Pukul berapa lomba akan dimulai?",
        a: "Lomba akan dimulai (start) pada pukul 05.00 WIB untuk kategori Half Marathon (21K), pukul 05.30 WIB untuk kategori 10K, dan pukul 06.00 WIB untuk kategori 5K. Pintu masuk area start akan dibuka mulai pukul 04.00 WIB.",
      },
      {
        q: "Apa saja kategori yang akan diperlombakan?",
        a: "Kategori yang diperlombakan meliputi 21K (Half Marathon) untuk pria & wanita, 10K (Competitive Run) untuk pria & wanita, serta 5K (Fun Run) untuk semua usia.",
      },
    ],
  },
  {
    category: "Pendaftaran",
    id: "pendaftaran",
    questions: [
      {
        q: "Bagaimana cara melakukan pendaftaran untuk PLN ELECTRIC RUN 2026?",
        a: "Pendaftaran dapat dilakukan secara daring (online) melalui situs web resmi PLN Electric Run atau aplikasi PLN Mobile pada menu 'Event'.",
      },
      {
        q: "Kapan pendaftaran di buka?",
        a: "Pendaftaran dibuka mulai tanggal 1 Agustus 2025 pukul 10.00 WIB dan akan ditutup apabila kuota peserta telah terpenuhi.",
      },
      {
        q: "Berapa biaya pendaftaran PLN ELECTRIC RUN 2026?",
        a: "Biaya pendaftaran adalah sebagai berikut: Kategori 5K sebesar Rp 150.000, Kategori 10K sebesar Rp 250.000, dan Kategori 21K sebesar Rp 400.000.",
      },
      {
        q: "Apakah syarat untuk keikutsertaan PLN ELECTRIC RUN?",
        a: "Peserta wajib dalam kondisi sehat jasmani dan rohani, menyetujui seluruh ketentuan lomba, serta memiliki kartu identitas resmi (KTP/KIA/Paspor) yang sah.",
      },
      {
        q: "Berapa ketentuan umur peserta yang ingin berpartisipasi di PLN ELECTRIC RUN?",
        a: "Kategori 21K minimal berusia 17 tahun, kategori 10K minimal berusia 15 tahun, dan kategori 5K terbuka untuk semua umur (anak-anak di bawah 12 tahun wajib didampingi orang dewasa).",
      },
      {
        q: "Bagaimana jika peserta berkewarganegaraan asing ingin berpartisipasi di PLN ELECTRIC RUN?",
        a: "Warga Negara Asing (WNA) diperbolehkan mendaftar dengan menggunakan nomor paspor yang masih aktif dan wajib membayar biaya pendaftaran sesuai ketentuan.",
      },
      {
        q: "Bagaimana jika peserta pelajar ingin berpartisipasi di PLN ELECTRIC RUN?",
        a: "Pelajar dapat mendaftar dengan melampirkan Kartu Pelajar yang berlaku atau surat keterangan dari sekolah saat pengisian data pendaftaran.",
      },
      {
        q: "Apa saja yang akan saya dapatkan untuk keikutsertaan saya di PLN ELECTRIC RUN?",
        a: "Setiap peserta terdaftar akan mendapatkan paket lomba (Race Pack) yang berisi Running Jersey Eksklusif, BIB (Nomor Dada), Timing Chip (khusus 10K & 21K), medali finisher (bagi yang menyelesaikan lomba), drawstring bag, produk sponsor, dan voucher listrik PLN Mobile.",
      },
      {
        q: "Bagaimana ukuran jersey PLN ELECTRIC RUN?",
        a: "Ukuran jersey tersedia mulai dari XS, S, M, L, XL, hingga XXL dengan tabel panduan ukuran detail (lebar dada dan panjang) yang dapat dilihat di halaman pendaftaran.",
      },
      {
        q: "Bagaimana jika jersey tidak pas di badan? Apakah saya masih bisa berpartisipasi? Dapatkah saya menukar dengan ukuran yang sesuai?",
        a: "Peserta tetap dapat berpartisipasi meskipun jersey tidak pas. Sayangnya, ukuran jersey yang sudah dipilih saat pendaftaran tidak dapat ditukar atau diubah karena produksi disesuaikan dengan database pendaftaran awal.",
      },
      {
        q: "Bagaimana saya mengetahui bahwa pendaftaran saya telah diterima?",
        a: "Setelah melakukan pembayaran, Anda akan menerima surel konfirmasi resmi (Official Confirmation Email) yang menyatakan pendaftaran Anda sukses beserta nomor resi pendaftaran.",
      },
      {
        q: "Jika saya sudah terdaftar, bolehkan saya memutuskan untuk mengundurkan diri dari PLN ELECTRIC RUN karena satu dan lain hal?",
        a: "Boleh, namun biaya pendaftaran yang telah dibayarkan bersifat non-refundable (tidak dapat dikembalikan) dan slot kepesertaan tidak dapat dipindahtangankan.",
      },
      {
        q: "Apakah kebijakan pengunduran diri dari PLN ELECTRIC RUN?",
        a: "Biaya registrasi yang telah disetorkan tidak dapat ditarik kembali dan paket lomba (Race Pack) tidak dapat dikirimkan ke alamat rumah jika peserta mengundurkan diri.",
      },
      {
        q: "Apakah saya dapat mengubah kategori setelah saya terdaftar?",
        a: "Tidak, perpindahan kategori lomba tidak diperkenankan setelah proses pendaftaran dan pembayaran selesai dilakukan.",
      },
      {
        q: "Apakah saya bisa melakukan perubahan data pendaftaran setelah terdaftar sebagai peserta?",
        a: "Perubahan data minor (seperti salah ketik nama atau nomor telepon) dapat diajukan dengan menghubungi Customer Service kami melalui email info@plnelectricrun.id maksimal 14 hari sebelum hari lomba.",
      },
      {
        q: "Bagaimana jika surel konfirmasi keikutsertaan terhapus secara tidak sengaja?",
        a: "Anda dapat memeriksa status pendaftaran Anda di dashboard pendaftaran situs web kami atau menghubungi tim helpdesk kami untuk pengiriman ulang surel konfirmasi.",
      },
      {
        q: "Metode pembayaran apa yang digunakan untuk mendaftar di PLN ELECTRIC RUN?",
        a: "Pembayaran dapat menggunakan Virtual Account berbagai bank (Mandiri, BNI, BRI, BCA), Kartu Kredit, serta dompet digital (LinkAja, OVO, GoPay) melalui sistem pembayaran terintegrasi PLN Mobile.",
      },
    ],
  },
  {
    category: "Pengambilan Paket Lomba",
    id: "pengambilan-paket",
    questions: [
      {
        q: "Di mana dan kapan saya dapat mengambil Race Pack saya?",
        a: "Pengambilan Race Pack diselenggarakan di Grand Ballroom, Jakarta, pada tanggal 9-11 Oktober 2025 mulai pukul 10.00 hingga 20.00 WIB.",
      },
      {
        q: "Dokumen apa saja yang harus saya bawa pada saat pengambilan Race Pack?",
        a: "Anda wajib membawa surel konfirmasi pendaftaran (baik cetak maupun digital di ponsel) dan kartu identitas asli (KTP/SIM/Paspor) yang sesuai dengan data pendaftaran.",
      },
      {
        q: "Apakah pengambilan Race Pack wajib dilakukan?",
        a: "Ya, setiap peserta wajib mengambil Race Pack secara langsung karena berisi nomor dada (BIB) dan timing chip yang menjadi syarat utama memasuki rute lari.",
      },
      {
        q: "Dapatkah pengambilan Race Pack saya diwakilkan kepada orang lain?",
        a: "Bisa, perwakilan wajib membawa surat kuasa bermaterai Rp 10.000 yang ditandatangani peserta asli, fotokopi kartu identitas peserta, dan surel konfirmasi pendaftaran peserta.",
      },
      {
        q: "Apakah bisa mengambil Race Pack di hari lomba?",
        a: "Tidak ada pengambilan Race Pack pada hari lomba (Minggu, 12 Oktober 2025) demi kelancaran dan sterilisasi area start.",
      },
    ],
  },
  {
    category: "Hari Lomba",
    id: "hari-lomba",
    questions: [
      {
        q: "Berapa jumlah peserta yang akan hadir di PLN ELECTRIC RUN?",
        a: "Total kuota peserta yang disiapkan untuk PLN Electric Run 2025 adalah sebanyak 10.000 pelari dari berbagai penjuru tanah air dan mancanegara.",
      },
      {
        q: "Apakah di area lomba akan disediakan tempat penitipan barang?",
        a: "Ya, panitia menyediakan fasilitas penitipan barang (Baggage Drop) gratis di area Race Village yang dibuka mulai pukul 04.00 WIB hingga pukul 10.00 WIB. Harap tidak menitipkan barang berharga.",
      },
      {
        q: "Seperti apakah rute perlombaan?",
        a: "Rute perlombaan melintasi jalan-jalan protokol Jakarta di sekitar Senayan, Sudirman, dan Semanggi, dengan pengawalan keamanan penuh serta pemandangan ikonik kota Jakarta. Peta rute lengkap akan diunggah di situs web resmi.",
      },
      {
        q: "Berapa waktu maksimal untuk menyelesaikan lomba?",
        a: "Batas waktu selesai (Cut Off Time / COT) adalah 3,5 jam untuk kategori 21K, 2 jam untuk kategori 10K, dan 1 jam untuk kategori 5K.",
      },
      {
        q: "Apakah yang akan saya dapatkan apabila saya sudah menyelesaikan lomba?",
        a: "Pelari yang berhasil menyentuh garis finish sebelum batas waktu COT akan menerima Finisher Medal eksklusif, minuman hidrasi, buah segar, dan kaos penamat (Finisher Tee) khusus untuk kategori 21K.",
      },
      {
        q: "Minuman apakah yang akan tersedia selama lomba berlangsung?",
        a: "Panitia menyediakan air mineral murni (Official Mineral Water) dan minuman isotonik penyegar (Official Healthy Drink) di setiap pos hidrasi (Water Station) yang berjarak setiap 2 km di sepanjang rute.",
      },
      {
        q: "Bolehkah saya berlomba sambil membawa binatang peliharaan di rute?",
        a: "Demi keselamatan bersama seluruh peserta, membawa binatang peliharaan ke dalam rute perlombaan tidak diperbolehkan.",
      },
      {
        q: "Apakah peserta diperbolehkan menggunakan sepeda, sepatu roda atau kereta bayi selama berlomba di rute lomba?",
        a: "Tidak diperbolehkan menggunakan alat beroda seperti sepeda, sepatu roda, otoped, maupun kereta bayi (stroller) di rute lomba untuk menjaga keselamatan pelari lain.",
      },
      {
        q: "Apa saja hadiah yang diperebutkan?",
        a: "Total hadiah yang diperebutkan mencapai ratusan juta rupiah untuk pemenang podium 1, 2, dan 3 di kategori pria dan wanita, baik kategori Nasional maupun Master.",
      },
      {
        q: "Apakah hadiah yang akan diberikan kepada pemenang podium di setiap kategori?",
        a: "Pemenang podium akan menerima trofi eksklusif, uang tunai pembinaan, serta produk-produk sponsor pilihan.",
      },
      {
        q: "Apa yang dimaksud dengan Hadiah Podium Master 40+ ?",
        a: "Hadiah khusus yang diberikan kepada peserta dengan performa lari terbaik yang telah berusia 40 tahun ke atas pada hari pelaksanaan lomba.",
      },
      {
        q: "Apakah akan ada penutupan jalan?",
        a: "Ya, beberapa ruas jalan di sepanjang rute lari akan ditutup secara parsial dan dialihkan berkoordinasi dengan pihak Kepolisian dan Dinas Perhubungan DKI Jakarta mulai pukul 04.30 hingga 09.00 WIB.",
      },
      {
        q: "Apakah akan disediakan area parkir di area lomba?",
        a: "Area parkir resmi tersedia di kantong-kantong parkir kawasan Gelora Bung Karno (GBK). Namun, peserta sangat disarankan menggunakan transportasi umum demi menghindari kemacetan.",
      },
    ],
  },
  {
    category: "Lain-Lain",
    id: "lain-lain",
    questions: [
      {
        q: "Siapa yang mengadakan dan memanage event ini?",
        a: "Event ini diselenggarakan oleh PT PLN (Persero) bekerjasama dengan Yayasan Baitul Maal (YBM) PLN, dan dikelola oleh Race Organizer profesional yang berpengalaman di bidangnya.",
      },
      {
        q: "Dimana saya dapat memperoleh informasi perihal PLN ELECTRIC RUN?",
        a: "Informasi resmi dapat diakses melalui situs web ini, media sosial Instagram @plnelectricrun, serta pemberitahuan resmi di aplikasi PLN Mobile.",
      },
      {
        q: "Siapa yang dapat dihubungi untuk informasi lomba lebih lanjut?",
        a: "Anda dapat mengirimkan surat elektronik ke info@plnelectricrun.id atau menghubungi hotline layanan pelanggan kami yang tertera di menu 'Hubungi Kami'.",
      },
      {
        q: "Apa yang menyebabkan akun saya terblokir ketika melakukan registrasi?",
        a: "Pemblokiran akun otomatis dapat terjadi jika sistem mendeteksi aktivitas mencurigakan, seperti pengisian formulir berulang yang tidak wajar atau kegagalan transaksi pembayaran berkali-kali menggunakan metode yang sama. Silakan hubungi admin kami untuk membuka blokir.",
      },
      {
        q: "Berapa peserta yang bisa saya daftarkan dalam satu akun PLN Mobile?",
        a: "Satu akun PLN Mobile dapat mendaftarkan maksimal hingga 5 (lima) orang peserta yang berbeda dengan melampirkan kartu identitas unik masing-masing peserta.",
      },
    ],
  },
];

const Faq = () => {
  const [activeCategory, setActiveCategory] = useState("Informasi Umum");
  const [expandedItems, setExpandedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedSession = localStorage.getItem("userSession");
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch (e) {
        console.error("Gagal parse session", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    setUser(null);
  };

  const toggleAccordion = (catId, index) => {
    const key = `${catId}-${index}`;
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter questions based on search query AND/OR selected category
  const filteredData = faqData
    .map((cat) => {
      const filteredQuestions = cat.questions.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      return {
        ...cat,
        questions: filteredQuestions,
      };
    })
    .filter((cat) => {
      if (searchQuery) {
        return cat.questions.length > 0;
      }
      return cat.category === activeCategory;
    });

  return (
    <div className="faq-page-container">
      {/* Navigation Header */}
      <header className="navbar">
        <div className="nav-logo">
          <Link to="/">
            <img src={Logo} alt="Logo PLN" className="pln-logo" />
          </Link>
          <div className="nav-brand-text">
            <span className="brand-main">PLN ELECTRIC RUN</span>
            <span className="brand-year">2025</span>
          </div>
        </div>
        <nav className="nav-links">
          <a href="/#kategori" className="nav-link">
            Kategori
          </a>
          <a href="/#cara-bergabung" className="nav-link">
            Cara Bergabung
          </a>
          <a href="/#hubungi-kami" className="nav-link">
            Hubungi Kami
          </a>
          {/* admin */}
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
          {/*  */}
          <Link to="/faq" className="nav-link active">
            FAQ
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="nav-link font-semibold text-gradient"
                style={{ fontWeight: 700 }}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-secondary nav-cta"
                style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-link login-nav-link"
                style={{ marginRight: "0.5rem" }}
              >
                Masuk
              </Link>
              <Link to="/register" className="btn btn-primary nav-cta">
                Daftar
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Main FAQ Section */}
      <main className="faq-main-content">
        <div className="faq-header-section">
          <h1 className="faq-title">Soal Sering Ditanya (SSD)</h1>
          <p className="faq-intro-text">
            Semua peserta diwajibkan untuk membaca dan memahami peraturan dan
            ketentuan (“Peraturan & Ketentuan“) sebelum mendaftar untuk PLN
            Electric Run 2026. Harap dicatat bahwa para peserta merupakan pihak
            yang menerima surel konfirmasi resmi PLN Electric Run 2026 yang
            mengkonfirmasi masuknya pihak tersebut sebagai peserta PLN Electric
            Run 2026, baik melalui pendaftaran online, atau program pendaftaran
            lainnya dari PLN Electric Run (“Peserta”).
          </p>
        </div>

        {/* Search Bar */}
        <div className="faq-search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Cari pertanyaan atau jawaban..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery("")}>
              ✕
            </button>
          )}
        </div>

        {/* Category Tabs (hidden if searching) */}
        {!searchQuery && (
          <div className="faq-categories-tabs">
            {faqData.map((cat) => (
              <button
                key={cat.id}
                className={`category-tab-btn ${activeCategory === cat.category ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.category)}
              >
                {cat.category}
              </button>
            ))}
          </div>
        )}

        {/* Accordions */}
        <div className="faq-accordion-list">
          {filteredData.length === 0 ? (
            <div className="no-results-found">
              <span className="no-results-icon">💡</span>
              <p>Tidak ada hasil yang cocok dengan pencarian Anda.</p>
            </div>
          ) : (
            filteredData.map((cat) => (
              <div key={cat.id} className="faq-category-group">
                {searchQuery && (
                  <h3 className="search-category-title">{cat.category}</h3>
                )}
                <div className="accordion-group-items">
                  {cat.questions.map((item, idx) => {
                    const isExpanded = !!expandedItems[`${cat.id}-${idx}`];
                    return (
                      <div
                        key={idx}
                        className={`faq-accordion-item ${isExpanded ? "open" : ""}`}
                      >
                        <button
                          type="button"
                          className="faq-accordion-header"
                          onClick={() => toggleAccordion(cat.id, idx)}
                          aria-expanded={isExpanded}
                        >
                          <span className="question-text">{item.q}</span>
                          <span
                            className={`toggle-icon-badge ${isExpanded ? "expanded" : ""}`}
                          >
                            {isExpanded ? "−" : "+"}
                          </span>
                        </button>
                        <div
                          className={`faq-accordion-collapse ${isExpanded ? "show" : ""}`}
                        >
                          <div className="faq-accordion-body">
                            <p className="answer-text">{item.a}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Partners and Sponsors Section */}
      <section className="partners-section">
        <div className="partners-container">
          {/* Row 1: Powered & Organized */}
          <div className="partners-row main-partners">
            <div className="partner-group">
              <span className="group-label">Powered by</span>
              <img
                src={PLN}
                alt="pln"
                className="brand-logo-card"
                style={{ width: "260px" }}
              />
            </div>
            <div className="partner-group">
              <span className="group-label">Organized by</span>
              <img
                src={YBM}
                alt="ybm"
                className="brand-logo-card"
                style={{ width: "200px" }}
              />
            </div>
          </div>

          {/* Row 2: Mineral Water & Healthy Drink & Insurance */}
          <div className="partners-row official-suppliers">
            <div className="partner-group">
              <span className="group-label">Official Mineral Water</span>
              <div className="brand-logo-card flat-badge blue-accent">
                💧 Aqua Pure
              </div>
            </div>
            <div className="partner-group">
              <span className="group-label">Official Healthy Drink</span>
              <div className="brand-logo-card flat-badge green-accent">
                🍃 Entrasol Active
              </div>
            </div>
            <div className="partner-group">
              <span className="group-label">Official Insurance</span>
              <div className="brand-logo-card flat-badge orange-accent">
                🛡️ BNI Life
              </div>
            </div>
          </div>

          {/* Row 3: Co-Sponsors */}
          <div className="partner-group sponsors-fullwidth">
            <span className="group-label">Co-Sponsor</span>
            <div className="cosponsors-grid">
              <div className="sponsor-tag">PLN Indonesia Power</div>
              <div className="sponsor-tag">PLN Nusantara Power</div>
              <div className="sponsor-tag">Siemens</div>
              <div className="sponsor-tag">Entrasol</div>
              <div className="sponsor-tag">
                <img src={BRI} alt="bri" className="bri-logo" />
              </div>
              <div className="sponsor-tag">
                <img
                  src={BNI}
                  alt="bni"
                  style={{ width: "70px", alignitems: "center" }}
                />
              </div>
              <div className="sponsor-tag ">Sinarmas Land</div>
              <div className="sponsor-tag">Decathlon</div>
              <div className="sponsor-tag">WM Center</div>
              <div className="sponsor-tag">AMPM</div>
              <div className="sponsor-tag">RS Bethsaida</div>
              <div className="sponsor-tag">RS St Carolus</div>
            </div>
          </div>

          {/* Row 4: Sustainability & Media Partner */}
          <div className="partners-row bottom-partners">
            <div className="partner-group">
              <span className="group-label">Mitra Keberlanjutan</span>
              <div className="brand-logo-card flat-badge leaf-badge">
                🌱 Rekosistem
              </div>
            </div>
            <div className="partner-group">
              <span className="group-label">Media Partner</span>
              <div className="brand-logo-card flat-badge tv-badge">
                📺 Garuda TV
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="faq-footer">
        <div className="footer-grid">
          <div className="footer-info">
            <div className="footer-logo-area">
              <img src={Logo} alt="PLN Logo" className="footer-logo-img" />
              <span>PLN ELECTRIC RUN 2025</span>
            </div>
            <p className="footer-desc">
              Kolaborasi PT PLN (Persero) & YBM PLN dalam menggerakkan energi
              baik lewat olahraga lari dan kepedulian sosial.
            </p>
          </div>
          <div className="footer-contact">
            <h4>Kontak Kami</h4>
            <div className="contact-details">
              <a href="mailto:info@plnelectricrun.id" className="contact-item">
                📧 info@plnelectricrun.id
              </a>
              <a
                href="https://instagram.com/plnelectricrun"
                target="_blank"
                rel="noreferrer"
                className="contact-item"
              >
                📸 @plnelectricrun
              </a>
            </div>
          </div>
        </div>
        <div className="footer-divider-bar"></div>
        <p className="footer-copyright">
          &copy; 2025 PT PLN (Persero) & YBM PLN. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Faq;
