import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.png";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setUploadError("");
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError("Pilih file bukti transfer terlebih dahulu!");
      return;
    }

    setUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("bukti", selectedFile);
    formData.append("id", user.id);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.post(
        `${baseUrl}/api/user/upload-bukti`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem("userSession", JSON.stringify(updatedUser));
        setSelectedFile(null);
        alert(
          "Bukti pembayaran berhasil diunggah! Status pembayaran Anda sedang dalam verifikasi admin.",
        );
      } else {
        throw new Error("Gagal mengunggah bukti pembayaran.");
      }
    } catch (err) {
      console.error(err);
      setUploadError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengunggah file bukti pembayaran.",
      );
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    // Membaca session user dari localStorage
    const savedSession = localStorage.getItem("userSession");
    if (!savedSession) {
      // Jika tidak ada session, arahkan ke login
      navigate("/login");
    } else {
      try {
        setUser(JSON.parse(savedSession));
      } catch (e) {
        console.error("Gagal parse session", e);
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Memuat profil peserta...</p>
      </div>
    );
  }

  const getCategoryDetails = (cat) => {
    switch (cat?.toLowerCase()) {
      case "5k":
        return { name: "5K Fun Run", price: "Rp 150.000", color: "#22c55e" };
      case "10k":
        return {
          name: "10K Competitive",
          price: "Rp 250.000",
          color: "#3b82f6",
        };
      case "21k":
        return {
          name: "21K Half Marathon",
          price: "Rp 400.000",
          color: "#eab308",
        };
      default:
        return { name: "5K Fun Run", price: "Rp 150.000", color: "#22c55e" };
    }
  };

  const catDetails = getCategoryDetails(user.category);

  const qrTextData =  `PLN ELECTRIC RUN 2026
   =====================
   NO. PESERTA   : ${user.id}
   NAMA PESERTA : ${user.nama}
   KATEGORI     : ${catDetails.name}
   NO. TELEPON  : ${user.no_telepon}
   EMAIL        : ${user.email}
   STATUS       : ${user.status_pembayaran || "Menunggu Verifikasi"}`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
    qrTextData,
  )}`;

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="nav-logo">
          <Link to="/">
            <img src={Logo} alt="Logo PLN" className="pln-logo" />
          </Link> 
          <div className="nav-brand-text">
            <span className="brand-main">PLN ELECTRIC RUN</span>
            <span className="brand-year">2026</span>
          </div>
        </div>

        <button
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Beranda
          </Link>
          <Link to="/faq" className="nav-link" onClick={() => setMenuOpen(false)}>
            FAQ
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="btn btn-secondary nav-cta logout-btn"
          >
            Keluar
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-header-banner">
          <div className="welcome-box">
            <h1>
              Selamat Datang, <span className="text-gradient">{user.nama}</span>
              !
            </h1>
            <p>
              Portal resmi peserta PLN Electric Run 2026. Pantau status tiket
              Anda di sini.
            </p>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Left Column: E-Ticket Card */}
          <div className="dashboard-card glass-card ticket-card">
            <div className="ticket-header">
              <img src={Logo} alt="PLN Logo" className="ticket-logo" />
              <div
                className="ticket-badge"
                style={{ backgroundColor: catDetails.color }}
              >
                {catDetails.name}
              </div>
            </div>
            <div className="ticket-divider-line"></div>
            <div className="ticket-body">
              <div className="ticket-details">
                <div className="detail-item">
                  <span className="detail-label">NAMA PESERTA</span>
                  <span className="detail-value">{user.nama}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">NOMOR TELEPON</span>
                  <span className="detail-value">{user.no_telepon}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">EMAIL</span>
                  <span className="detail-value email-value">{user.email}</span>
                </div>
              </div>
              <div className="ticket-qr-area">
                {/* Wrapper dengan relative position untuk menumpuk logo di tengah */}
                <div
                  className="qr-wrapper"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  {/* Gambar QR Code Hitam */}
                  <img
                    src={qrCodeUrl}
                    alt="Ticket QR Code"
                    className="qr-code-img"
                  />

                  {/* Gambar Logo Ditumpuk di Tengah */}
                  <img
                    src={Logo}
                    alt="Logo PLN Tengah"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "32px", 
                      height: "32px",
                      backgroundColor: "#ffffff", 
                      padding: "3px",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                </div>
                <span className="qr-hint">
                  Scan saat pengambilan Runner Kit
                </span>
              </div>
            </div>
            <div className="ticket-footer-strip">
              <span>PLN ELECTRIC RUN 2026 • GBK SENAYAN, JAKARTA</span>
            </div>
          </div>

          {/* Right Column: Billing and Action details */}
          <div className="dashboard-card glass-card billing-card">
            <h3>Status Pembayaran & Tagihan</h3>
            <div className="status-badge-container">
              <span
                className={`status-badge ${
                  user.status_pembayaran === "Lunas" || user.isPaid
                    ? "status-paid"
                    : user.status_pembayaran === "Menunggu Verifikasi"
                      ? "status-pending"
                      : "status-unpaid"
                }`}
              >
                {user.status_pembayaran === "Lunas" || user.isPaid
                  ? "Lunas (Terverifikasi)"
                  : user.status_pembayaran === "Menunggu Verifikasi"
                    ? "Menunggu Verifikasi"
                    : "Menunggu Pembayaran"}
              </span>
            </div>

            <div className="billing-details-list">
              <div className="billing-info-row">
                <span>Kategori Lari:</span>
                <strong>{catDetails.name}</strong>
              </div>
              <div className="billing-info-row">
                <span>Nominal Tagihan:</span>
                <strong className="text-blue">{catDetails.price}</strong>
              </div>
              <div className="billing-info-row">
                <span>Metode Pembayaran:</span>
                <span>Virtual Account</span>
              </div>
              {!(user.status_pembayaran === "Lunas" || user.isPaid) && (
                <div className="va-box">
                  <span className="va-label">Nomor Virtual Account (VA):</span>
                  <div className="va-number-container">
                    <strong className="va-number">
                      {"BRI/BSI"}
                    </strong>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("BRI/BSI");
                        alert("Nomor VA berhasil disalin!");
                      }}
                      className="btn-copy-va"
                    >
                      Salin
                    </button>
                  </div>
                  <p className="va-instructions">
                    Silakan lakukan transaksi digital pilihan Anda ke nomor VA
                    di atas dalam waktu 24 jam setelah mendaftar.
                  </p>
                </div>
              )}

              {user.status_pembayaran === "Menunggu Verifikasi" && (
                <div
                  className="upload-bukti-box"
                  style={{
                    background: "rgba(59, 130, 246, 0.05)",
                    borderColor: "rgba(59, 130, 246, 0.2)",
                  }}
                >
                  <span className="upload-success-text">
                    ⏳ Bukti pembayaran telah dikirim. Menunggu verifikasi
                    admin.
                  </span>
                </div>
              )}

              {user.status_pembayaran !== "Lunas" &&
                !user.isPaid &&
                user.status_pembayaran !== "Menunggu Verifikasi" && (
                  <form
                    onSubmit={handleUploadSubmit}
                    className="upload-bukti-box"
                  >
                    <span className="upload-bukti-title">
                      Upload Bukti Pembayaran:
                    </span>
                    <div className="upload-input-wrapper">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="upload-input-control"
                        required
                      />
                      {uploadError && (
                        <p className="upload-error-text">{uploadError}</p>
                      )}
                      <button
                        type="submit"
                        disabled={uploading || !selectedFile}
                        className="btn-upload-submit"
                      >
                        {uploading ? "Mengunggah..." : "Kirim Bukti Pembayaran"}
                      </button>
                    </div>
                  </form>
                )}
            </div>

            <div className="dashboard-helper-notes">
              <h4>Informasi Penting:</h4>
              <ul>
                <li>
                  Simpan halaman tiket ini di smartphone Anda untuk mempermudah
                  verifikasi.
                </li>
                <li>
                  Pengambilan Race Pack (Runner Kit) akan dilaksanakan pada
                  tanggal 9-11 Oktober 2026 di Jakarta.
                </li>
                <li>
                  Membawa KTP asli dan QR Code di samping saat penukaran tiket.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
