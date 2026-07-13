import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroImg from "../../assets/pln_run_hero.png";
import "./LandingPage.css";
import Logo from "../../assets/Logo.png";

const LandingPage = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submittedMessage, setSubmittedMessage] = useState(false);
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

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert("Harap lengkapi Nama, Email, dan Pesan Anda.");
      return;
    }
    setSubmittedMessage(true);
    setContactForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => {
      setSubmittedMessage(false);
    }, 5000);
  };

  return (
    <div className="landing-container">
      {/* Navigation Header */}
      <header className="navbar">
        <div className="nav-logo">
          <a href="/">
            <img src={Logo} alt="Logo PLN" className="pln-logo" />
          </a>
          <div className="nav-brand-text">
            <span className="brand-main">PLN ELECTRIC RUN</span>
            <span className="brand-year">2026</span>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#kategori" className="nav-link">
            Kategori
          </a>
          <a href="#cara-bergabung" className="nav-link">
            Cara Bergabung
          </a>
          <a href="#hubungi-kami" className="nav-link">
            Hubungi Kami
          </a>

          {/* admin */}
          <Link to="/admin" className="nav-link">Admin</Link>
          {/*  */}

          <Link to="/faq" className="nav-link">
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

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="section-tag">National Running Event</span>
            <h1 className="hero-title">
              Power Up <span className="text-gradient">Your Pace</span>,<br />
              Light Up <span className="text-gradient">The Nation</span>
            </h1>
            <p className="hero-description">
              Sambut lari massal paling bertenaga tahun ini! Bergabunglah dalam{" "}
              <strong>PLN Electric Run 2026</strong>. Setiap langkah Anda
              berkontribusi untuk mendukung gaya hidup sehat sekaligus
              menyebarkan energi baik ke seluruh penjuru nusantara.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-val">12 OKT</span>
                <span className="stat-lbl">Oktober 2026</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-val">GBK</span>
                <span className="stat-lbl">Senayan, Jakarta</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-val">150JT</span>
                <span className="stat-lbl">Total Hadiah</span>
              </div>
            </div>

            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                Daftar Sekarang
                <svg
                  className="arrow-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a href="#kategori" className="btn btn-secondary">
                Lihat Detail
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="image-wrapper">
              <img
                src={heroImg}
                alt="PLN Energy Run Runners"
                className="hero-banner-img"
              />
              <div className="glow-effect"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="kategori" className="categories-section">
        <div className="section-header">
          <span className="section-tag">PILIHAN KATEGORI</span>
          <h2 className="section-title">Kategori Lari & Biaya Pendaftaran</h2>
          <p className="section-subtitle">
            Tentukan jarak larimu dan tantang batas kemampuanmu dengan pilihan
            kategori di bawah ini.
          </p>
        </div>

        <div className="categories-grid">
          {/* 5K Card */}
          <div className="category-card glass-card">
            <div className="card-badge green-badge">FUN RUN</div>
            <h3 className="category-distance">5K</h3>
            <p className="category-desc">
              Cocok untuk pemula, keluarga, dan pelari rekreasi yang ingin
              menikmati atmosfer keseruan lari bersama.
            </p>
            <div className="card-price">
              <span className="price-label">Biaya Registrasi</span>
              <span className="price-value">Rp 150.000</span>
            </div>
            <ul className="card-features">
              <li>Exclusive Jersey & BIB</li>
              <li>Medali Finisher (All Finishers)</li>
              <li>Refreshment & Voucher</li>
            </ul>
          </div>

          {/* 10K Card */}
          <div className="category-card glass-card popular">
            <div className="card-badge blue-badge">MOST POPULAR</div>
            <h3 className="category-distance">10K</h3>
            <p className="category-desc">
              Tingkatkan performamu! Kategori kompetitif dengan chip pencatat
              waktu resmi untuk mengukur hasil larimu.
            </p>
            <div className="card-price">
              <span className="price-label">Biaya Registrasi</span>
              <span className="price-value">Rp 250.000</span>
            </div>
            <ul className="card-features">
              <li>Exclusive Jersey, BIB, & Timing Chip</li>
              <li>Medali Finisher bagi yang finish under COT</li>
              <li>Refreshment, Hydration, & Finisher Tee</li>
            </ul>
          </div>

          {/* 21K Card */}
          <div className="category-card glass-card">
            <div className="card-badge yellow-badge">CHALLENGE</div>
            <h3 className="category-distance">21K</h3>
            <p className="category-desc">
              Tantangan Half Marathon sejati. Jalur lari menantang dengan
              standar pengamanan dan sterilisasi rute terbaik.
            </p>
            <div className="card-price">
              <span className="price-label">Biaya Registrasi</span>
              <span className="price-value">Rp 400.000</span>
            </div>
            <ul className="card-features">
              <li>Exclusive Jersey, BIB, & Timing Chip</li>
              <li>Finisher Medal & Premium Finisher Tee</li>
              <li>Recovery Area & Medical Support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Racepack Section */}
      <section id="racepack" className="racepack-section">
        <div className="section-header">
          <span className="section-tag">RUNNER KIT</span>
          <h2 className="section-title">Kelengkapan Race Pack</h2>
          <p className="section-subtitle">
            Setiap peserta terdaftar berhak mendapatkan paket perlengkapan lari
            eksklusif bernilai tinggi.
          </p>
        </div>

        <div className="racepack-grid">
          <div className="racepack-info-card glass-card">
            <div className="info-icon-wrapper">👕</div>
            <h4>Jersey Eksklusif</h4>
            <p>
              Bahan premium dry-fit yang ringan dan menyerap keringat dengan
              desain neon bertema energi PLN.
            </p>
          </div>
          <div className="racepack-info-card glass-card">
            <div className="info-icon-wrapper">🏅</div>
            <h4>Medali Finisher</h4>
            <p>
              Medali logam berkualitas tinggi dengan ukiran khusus lambang PLN
              Run untuk setiap pelari yang menyelesaikan rute.
            </p>
          </div>
          <div className="racepack-info-card glass-card">
            <div className="info-icon-wrapper">🏃‍♂️</div>
            <h4>BIB & Timing Chip</h4>
            <p>
              Nomor dada peserta resmi yang dilengkapi chip pelacak waktu
              elektronik akurat (khusus kategori 10K & 21K).
            </p>
          </div>
          <div className="racepack-info-card glass-card">
            <div className="info-icon-wrapper">🎒</div>
            <h4>Goodie Bag & Voucher</h4>
            <p>
              Drawstring bag menarik berisi suplemen, produk sponsor, dan
              voucher listrik PLN senilai Rp 50.000!
            </p>
          </div>
        </div>
      </section>

      {/* Cara Bergabung Section */}
      <section id="cara-bergabung" className="joining-section">
        <div className="section-header">
          <span className="section-tag">PANDUAN PENDAFTARAN</span>
          <h2 className="section-title">Cara Bergabung</h2>
          <p className="section-subtitle">
            Ikuti 4 langkah mudah berikut untuk menjadi bagian dari PLN Electric
            Run 2026.
          </p>
        </div>

        <div className="joining-steps-grid">
          <div className="step-card glass-card">
            <div className="step-number">01</div>
            <h4>Daftar Akun</h4>
            <p>
              Klik tombol 'Daftar' di navigasi atas atau buka menu event di
              aplikasi PLN Mobile untuk mendaftar.
            </p>
          </div>
          <div className="step-card glass-card">
            <div className="step-number">02</div>
            <h4>Pilih Kategori</h4>
            <p>
              Pilih kategori lari yang Anda inginkan (5K, 10K, atau 21K) sesuai
              dengan kesiapan fisik Anda.
            </p>
          </div>
          <div className="step-card glass-card">
            <div className="step-number">03</div>
            <h4>Lakukan Pembayaran</h4>
            <p>
              Selesaikan pembayaran melalui Virtual Account bank transfer atau
              e-wallet dalam waktu 24 jam.
            </p>
          </div>
          <div className="step-card glass-card">
            <div className="step-number">04</div>
            <h4>Ambil Race Pack</h4>
            <p>
              Bawa surel konfirmasi dan KTP Anda untuk mengambil perlengkapan
              lari pada 9-11 Oktober 2025.
            </p>
          </div>
        </div>
      </section>

      {/* Hubungi Kami Section */}
      <section id="hubungi-kami" className="contact-section">
        <div className="section-header">
          <span className="section-tag">KONTAK & HUBUNGI KAMI</span>
          <h2 className="section-title">Hubungi Kami</h2>
          <p className="section-subtitle">
            Punya pertanyaan seputar PLN Electric Run 2026? Tulis komentar atau
            kirim pesan langsung kepada kami.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left side: Message/Comment form */}
          <div className="contact-form-card glass-card">
            <h4>Kirim Komentar atau Pesan</h4>
            {submittedMessage && (
              <div className="contact-success-alert">
                <span>✓</span> Pesan Anda berhasil dikirim! Kami akan
                menghubungi Anda segera.
              </div>
            )}
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label htmlFor="contact-name">Nama Lengkap</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Nama Anda"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                  />
                </div>
                <div className="contact-form-group">
                  <label htmlFor="contact-email">Alamat Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="email@contoh.com"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                  />
                </div>
              </div>
              <div className="contact-form-group">
                <label htmlFor="contact-subject">Subjek</label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  placeholder="Pertanyaan Umum / Pendaftaran / Sponsor"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                />
              </div>
              <div className="contact-form-group">
                <label htmlFor="contact-message">Pesan / Komentar</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Tuliskan komentar atau pertanyaan Anda di sini..."
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary submit-contact-btn"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Right side: Contact info card */}
          <div className="contact-info-card glass-card">
            <h4>Informasi Kontak Resmi</h4>
            <p className="contact-info-desc">
              Anda juga dapat menghubungi tim panitia penyelenggara kami secara
              langsung melalui saluran komunikasi resmi di bawah ini:
            </p>

            <div className="contact-channels">
              <div className="channel-item">
                <div className="channel-icon">📧</div>
                <div className="channel-text">
                  <span className="channel-label">Alamat Email Resmi</span>
                  <a
                    href="mailto:info@plnelectricrun.id"
                    className="channel-link"
                  >
                    info@plnelectricrun.id
                  </a>
                </div>
              </div>

              <div className="channel-item">
                <div className="channel-icon">📸</div>
                <div className="channel-text">
                  <span className="channel-label">Instagram Resmi</span>
                  <a
                    href="https://instagram.com/plnelectricrun"
                    target="_blank"
                    rel="noreferrer"
                    className="channel-link"
                  >
                    @plnelectricrun
                  </a>
                </div>
              </div>

              <div className="channel-item">
                <div className="channel-icon">📞</div>
                <div className="channel-text">
                  <span className="channel-label">Hotline Layanan</span>
                  <span className="channel-val">
                    +62 812-3456-7890 (WhatsApp Only)
                  </span>
                </div>
              </div>

              <div className="channel-item">
                <div className="channel-icon">📍</div>
                <div className="channel-text">
                  <span className="channel-label">Lokasi Penyelenggara</span>
                  <span className="channel-val">
                    PT PLN (Persero) Kantor Pusat, Kebayoran Baru, Jakarta
                    Selatan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="impact-section glass-card">
        <div className="impact-content">
          <h2 className="impact-title">Lari untuk Berbagi Energi</h2>
          <p className="impact-text">
            Melalui program <strong>"PLN ELECTRIC RUN"</strong>, Setiap jejak
            langkah kita adalah bukti kekompakan untuk mempererat soliditas.
            Setiap kilometer yang kita lewati adalah simbol komitmen kita untuk
            saling mendukung dan membantu sesama Insan PLN. Mari satukan
            langkah, bakar semangatmu, dan jadikan energi kita kekuatan untuk
            maju bersama!
          </p>
          <div className="impact-quote">
            "Setiap meter langkah Anda adalah seberkas cahaya bagi mereka yang
            membutuhkan."
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="cta-section">
        <div className="cta-box glass-card">
          <div className="cta-spark">⚡</div>
          <h2 className="cta-title">Segera Amankan Tiket Anda!</h2>
          <p className="cta-subtitle">
            Slot terbatas untuk masing-masing kategori. Pendaftaran akan
            otomatis ditutup apabila kuota peserta telah terpenuhi.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Daftar Sekarang
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-logo">
            <img src={Logo} alt="PLN Logo" className="footer-pln-logo" />
            <span style={{ color: "#9ea2ac" }}>PLN ELECTRIC RUN 2026</span>
          </div>
          <p className="footer-tagline">
            Diselenggarakan oleh PT PLN (Persero) & YBM PLN untuk mendukung gaya
            hidup sehat, berkelanjutan, dan kepedulian sosial.
          </p>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p className="copyright">
            &copy; 2026 PT PLN (Persero) & YBM PLN. Hak Cipta Dilindungi.
          </p>
          <div className="footer-links">
            <a href="mailto:info@plnelectricrun.id">info@plnelectricrun.id</a>
            <a
              href="https://instagram.com/plnelectricrun"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a href="#hubungi-kami">Hubungi Kami</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
