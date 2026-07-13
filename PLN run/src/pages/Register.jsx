import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.png";
import "./Register.css";

const CITIES = [
  "Jakarta Pusat",
  "Jakarta Barat",
  "Jakarta Timur",
  "Jakarta Utara",
  "Jakarta Selatan",
  "Tangerang",
  "Tangerang Selatan",
  "Bekasi",
  "Depok",
  "Bogor",
  "Bandung",
  "Surabaya",
  "Semarang",
  "Yogyakarta",
  "Surakarta",
  "Malang",
  "Denpasar",
  "Medan",
  "Palembang",
  "Pekanbaru",
  "Bandar Lampung",
  "Makassar",
  "Manado",
  "Banjarmasin",
  "Balikpapan",
  "Pontianak",
  "Samarinda",
  "Ambon",
  "Kupang",
  "Mataram",
  "Jayapura",
].sort();

const DAYS = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
const MONTHS = [
  { value: "01", label: "Januari" },
  { value: "02", label: "Februari" },
  { value: "03", label: "Maret" },
  { value: "04", label: "April" },
  { value: "05", label: "Mei" },
  { value: "06", label: "Juni" },
  { value: "07", label: "Juli" },
  { value: "08", label: "Agustus" },
  { value: "09", label: "September" },
  { value: "10", label: "Oktober" },
  { value: "11", label: "November" },
  { value: "12", label: "Desember" },
];
const YEARS = Array.from({ length: 90 }, (_, i) => String(2022 - i));

const Register = () => {
  const [form, setForm] = useState({
    // Kategori Lari
    category: "5k",

    // Akun Peserta
    email: "",
    no_telepon: "",
    password: "",

    // Informasi Pribadi
    nama_depan: "",
    nama_belakang: "",
    jenis_kelamin: "",
    tanggal_lahir_hari: "",
    tanggal_lahir_bulan: "",
    tanggal_lahir_tahun: "",
    kewarganegaraan: "WNI",
    negara_txt: "",
    kota: "",
    golongan_darah: "",
    riwayat_penyakit: "",

    // Kontak Darurat
    kontak_darurat_nama: "",
    kontak_darurat_telepon: "",
    kontak_darurat_hubungan: "",

    // Preferensi Lomba & Pengiriman
    ukuran_kaos: "",
    pengambilan_racepack: "pickup",
    waktu_pengambilan: "",

    // Detail Pengiriman
    penerima_nama: "",
    penerima_telepon: "",
    pengiriman_kota: "",
    pengiriman_alamat: "",
    pengiriman_kodepos: "",

    komunitas_lari: "",
    persetujuan_asuransi: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validasi Kolom Wajib Dasar
    if (
      !form.category ||
      !form.email ||
      !form.no_telepon ||
      !form.password ||
      !form.nama_depan ||
      !form.nama_belakang ||
      !form.jenis_kelamin ||
      !form.tanggal_lahir_hari ||
      !form.tanggal_lahir_bulan ||
      !form.tanggal_lahir_tahun ||
      !form.kewarganegaraan ||
      !form.kota ||
      !form.golongan_darah ||
      !form.kontak_darurat_nama ||
      !form.kontak_darurat_telepon ||
      !form.kontak_darurat_hubungan ||
      !form.ukuran_kaos ||
      !form.pengambilan_racepack
    ) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Pendaftaran Belum Lengkap",
        text: "Harap lengkapi semua kolom wajib (*)", // Opsional: teks ringkas
      });

      // Langsung scroll ke atas tanpa menunggu klik tombol
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // 2. Validasi Bersyarat WNA
    if (form.kewarganegaraan === "WNA" && !form.negara_txt) {
      setError("Harap masukkan nama negara kewarganegaraan Anda.");
      return;
    }

    // 3. Validasi Bersyarat Pengambilan Racepack
    if (form.pengambilan_racepack === "pickup" && !form.waktu_pengambilan) {
      Toast.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: "Harap pilih waktu pengambilan racepack.",
      });
      return;
    }

    if (form.pengambilan_racepack === "delivery") {
      if (
        !form.penerima_nama ||
        !form.penerima_telepon ||
        !form.pengiriman_kota ||
        !form.pengiriman_alamat ||
        !form.pengiriman_kodepos
      ) {
        Toast.fire({
          icon: "warning",
          title: "Data Belum Lengkap",
          text: "Harap lengkapi detail alamat pengiriman racepack.",
        });
        return;
      }
    }

    // 4. Validasi Asuransi
    if (!form.persetujuan_asuransi) {
      setError(
        "Anda harus menyetujui perlindungan Asuransi Jiwa & Kecelakaan.",
      );
      return;
    }
    // 5. Validasi Format Email
    const emailRegex =
      /^[^\s@]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      Toast.fire({
        icon: "error",
        title: "Email Tidak Valid",
        text: "Periksa kembali format alamat email Anda.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const emailLower = form.email.toLowerCase().trim();

    if (!emailLower.endsWith("@pln.co.id")) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Pendaftaran Belum Lengkap",
        text: "Alamat email tidak valid. Harus menggunakan email resmi @pln.co.id.",
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
      // alert(
      //   "Alamat email tidak valid. Harus menggunakan email resmi @pln.co.id.",
      // );
      // setError(
      //   "Alamat email tidak valid. Harus menggunakan email resmi @pln.co.id.",
      // );
      return;
    }

    // 6. Validasi Nomor Telepon
    if (form.no_telepon.length < 10 || form.no_telepon.length > 15) {
      setError("Nomor telepon harus terdiri dari 10 hingga 15 digit.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Gabungan Nama & Tanggal Lahir untuk dikirim ke backend
    const combinedNama = `${form.nama_depan} ${form.nama_belakang}`;
    const combinedTanggalLahir = `${form.tanggal_lahir_tahun}-${form.tanggal_lahir_bulan}-${form.tanggal_lahir_hari}`;

    const payload = {
      ...form,
      nama: combinedNama,
      tanggal_lahir: combinedTanggalLahir,
    };

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.post(`${baseUrl}/api/user/create`, payload);

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
      } else {
        throw new Error("Registrasi gagal, silakan coba lagi.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Gagal menghubungkan ke server.";
      setError(errorMessage);
    }
  };

  const getCategoryDetails = (cat) => {
    switch (cat) {
      case "5k":
        return { name: "5K Fun Run", price: "Rp 150.000" };
      case "10k":
        return { name: "10K Competitive", price: "Rp 250.000" };
      case "21k":
        return { name: "21K Half Marathon", price: "Rp 400.000" };
      default:
        return { name: "5K Fun Run", price: "Rp 150.000" };
    }
  };

  const selectedDetails = getCategoryDetails(form.category);

  if (submitted) {
    return (
      <div className="register-page-container">
        <div className="register-card glass-card success-card">
          <div className="success-icon">🎉</div>
          <h2 className="register-title">Registrasi Berhasil!</h2>
          <p className="success-message">
            Terima kasih telah mendaftar,{" "}
            <strong>
              {form.nama_depan} {form.nama_belakang}
            </strong>
            ! Anda telah berhasil mengamankan slot di kategori{" "}
            <strong>{selectedDetails.name}</strong>.
          </p>

          <div className="billing-summary">
            <div className="billing-row">
              <span>Nominal Tagihan:</span>
              <strong className="text-yellow">{selectedDetails.price}</strong>
            </div>
            <div className="billing-row">
              <span>Metode Pembayaran:</span>
              <span>Virtual Account (Kirim ke Email)</span>
            </div>
          </div>

          <p className="email-hint">
            Instruksi pembayaran dan detail telah dikirimkan ke{" "}
            <strong>{form.email}</strong>. Segera selesaikan pembayaran dalam
            waktu 24 jam untuk memverifikasi tiket Anda.
          </p>

          <Link
            to="/"
            className="btn btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page-container">
      <Link to="/" className="back-home-link">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Kembali ke Beranda
      </Link>

      <div className="register-card glass-card">
        <div className="register-header">
          <img src={Logo} alt="Logo PLN" className="register-pln-logo" />
          <h2 className="register-title">Formulir Pendaftaran</h2>
          <p className="register-subtitle">PLN Energy Run 2026</p>
        </div>

        {error && <div className="form-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          {/* KATEGORI LARI */}
          <div className="form-section">
            <div className="form-section-title">
              <span>Kategori Lomba</span>
            </div>
            <div className="form-group">
              <label htmlFor="category">
                Pilih Kategori Lari <span className="req-star">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="form-control"
              >
                <option value="5k">5K Fun Run - Rp 150.000</option>
                <option value="10k">10K Competitive - Rp 250.000</option>
                <option value="21k">21K Half Marathon - Rp 400.000</option>
              </select>
            </div>
          </div>

          {/* AKUN PESERTA */}
          <div className="form-section">
            <div className="form-section-title">
              <span>Akun Peserta</span>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="email">
                  Alamat Email <span className="req-star">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="contoh@pln.co.id"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="no_telepon">
                  Nomor Telepon / WhatsApp <span className="req-star">*</span>
                </label>
                <input
                  type="tel"
                  id="no_telepon"
                  name="no_telepon"
                  placeholder="081234567xxx"
                  value={form.no_telepon}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group grid-span-full">
                <label htmlFor="password">
                  Password Akun Peserta <span className="req-star">*</span>
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Buat password minimal 6 karakter"
                    value={form.password}
                    onChange={handleChange}
                    className="form-control password-control"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn-toggle-password"
                    aria-label="Tampilkan password"
                  >
                    {showPassword ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* INFORMASI PRIBADI & MEDIS */}
          <div className="form-section">
            <div className="form-section-title">
              <span>Informasi Pribadi &amp; Medis</span>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nama_depan">
                  Nama Depan <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  id="nama_depan"
                  name="nama_depan"
                  placeholder="Nama depan"
                  value={form.nama_depan}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="nama_belakang">
                  Nama Belakang <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  id="nama_belakang"
                  name="nama_belakang"
                  placeholder="Nama belakang"
                  value={form.nama_belakang}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>
                  Jenis Kelamin <span className="req-star">*</span>
                </label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="jenis_kelamin"
                      value="Pria"
                      checked={form.jenis_kelamin === "Pria"}
                      onChange={handleChange}
                    />
                    Pria
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="jenis_kelamin"
                      value="Wanita"
                      checked={form.jenis_kelamin === "Wanita"}
                      onChange={handleChange}
                    />
                    Wanita
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>
                  Tanggal Lahir <span className="req-star">*</span>
                </label>
                <div className="form-grid-3" style={{ gap: "0.5rem" }}>
                  <select
                    name="tanggal_lahir_hari"
                    value={form.tanggal_lahir_hari}
                    onChange={handleChange}
                    className="form-control"
                    style={{ padding: "0.85rem 0.5rem" }}
                  >
                    <option value="">Hari</option>
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {parseInt(d)}
                      </option>
                    ))}
                  </select>
                  <select
                    name="tanggal_lahir_bulan"
                    value={form.tanggal_lahir_bulan}
                    onChange={handleChange}
                    className="form-control"
                    style={{ padding: "0.85rem 0.5rem" }}
                  >
                    <option value="">Bulan</option>
                    {MONTHS.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                  <select
                    name="tanggal_lahir_tahun"
                    value={form.tanggal_lahir_tahun}
                    onChange={handleChange}
                    className="form-control"
                    style={{ padding: "0.85rem 0.5rem" }}
                  >
                    <option value="">Tahun</option>
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>
                  Kewarganegaraan <span className="req-star">*</span>
                </label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="kewarganegaraan"
                      value="WNI"
                      checked={form.kewarganegaraan === "WNI"}
                      onChange={handleChange}
                    />
                    WNI (Warga Negara Indonesia)
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="kewarganegaraan"
                      value="WNA"
                      checked={form.kewarganegaraan === "WNA"}
                      onChange={handleChange}
                    />
                    WNA
                  </label>
                </div>
              </div>

              {form.kewarganegaraan === "WNA" && (
                <div className="form-group">
                  <label htmlFor="negara_txt">
                    Nama Negara Asal <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="negara_txt"
                    name="negara_txt"
                    placeholder="Masukkan negara asal"
                    value={form.negara_txt}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="kota">
                  Kota Domisili <span className="req-star">*</span>
                </label>
                <select
                  id="kota"
                  name="kota"
                  value={form.kota}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Pilih Kota</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="golongan_darah">
                  Golongan Darah <span className="req-star">*</span>
                </label>
                <select
                  id="golongan_darah"
                  name="golongan_darah"
                  value={form.golongan_darah}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Pilih Golongan Darah</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="form-group grid-span-full">
                <label htmlFor="riwayat_penyakit">
                  Informasi Medis / Riwayat Penyakit (Opsional)
                </label>
                <textarea
                  id="riwayat_penyakit"
                  name="riwayat_penyakit"
                  rows="3"
                  placeholder="Masukkan riwayat medis penting (misal: asma, alergi obat, dll.)"
                  value={form.riwayat_penyakit}
                  onChange={handleChange}
                  className="form-control"
                  style={{ resize: "vertical" }}
                ></textarea>
                <div className="info-note">
                  * Harap isi bagian ini jika Anda memiliki kondisi kesehatan
                  khusus.
                </div>
              </div>
            </div>
          </div>

          {/* KONTAK DARURAT */}
          <div className="form-section">
            <div className="form-section-title">
              <span>Kontak Darurat</span>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="kontak_darurat_nama">
                  Nama Kontak Darurat <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  id="kontak_darurat_nama"
                  name="kontak_darurat_nama"
                  placeholder="Nama kontak darurat"
                  value={form.kontak_darurat_nama}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="kontak_darurat_telepon">
                  Nomor Telepon Darurat <span className="req-star">*</span>
                </label>
                <input
                  type="tel"
                  id="kontak_darurat_telepon"
                  name="kontak_darurat_telepon"
                  placeholder="Nomor telepon darurat"
                  value={form.kontak_darurat_telepon}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group grid-span-full">
                <label htmlFor="kontak_darurat_hubungan">
                  Hubungan Kontak Darurat <span className="req-star">*</span>
                </label>
                <select
                  id="kontak_darurat_hubungan"
                  name="kontak_darurat_hubungan"
                  value={form.kontak_darurat_hubungan}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Pilih Hubungan</option>
                  <option value="Suami / Istri">Suami / Istri</option>
                  <option value="Orang Tua / Wali">Orang Tua / Wali</option>
                  <option value="Anggota Keluarga">Anggota Keluarga</option>
                  <option value="Teman">Teman</option>
                  <option value="Pemimpin Grup">Pemimpin Grup</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>
          </div>

          {/* PREFERENSI LOMBA & PENGIRIMAN */}
          <div className="form-section">
            <div className="form-section-title">
              <span>Preferensi Lomba &amp; Pengiriman</span>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="ukuran_kaos">
                  Ukuran Kaos (Tee Size) <span className="req-star">*</span>
                </label>
                <select
                  id="ukuran_kaos"
                  name="ukuran_kaos"
                  value={form.ukuran_kaos}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Pilih Ukuran</option>
                  <option value="S">S - Small</option>
                  <option value="M">M - Medium</option>
                  <option value="L">L - Large</option>
                  <option value="XL">XL - Extra Large</option>
                  <option value="XXL">XXL - Double Extra Large</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="komunitas_lari">
                  Nama Komunitas Lari (Opsional)
                </label>
                <input
                  type="text"
                  id="komunitas_lari"
                  name="komunitas_lari"
                  placeholder="Masukkan nama komunitas"
                  value={form.komunitas_lari}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group grid-span-full">
                <label>
                  Metode Pengambilan Racepack{" "}
                  <span className="req-star">*</span>
                </label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="pengambilan_racepack"
                      value="pickup"
                      checked={form.pengambilan_racepack === "pickup"}
                      onChange={handleChange}
                    />
                    Ambil Sendiri (Pickup)
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="pengambilan_racepack"
                      value="delivery"
                      checked={form.pengambilan_racepack === "delivery"}
                      onChange={handleChange}
                    />
                    Dikirim Ke Alamat (Delivery)
                  </label>
                </div>
              </div>

              {/* JIKA AMBIL SENDIRI */}
              {form.pengambilan_racepack === "pickup" && (
                <div className="grid-span-full pickup-info-box">
                  <h5>Lokasi Pengambilan:</h5>
                  <p>
                    <strong>JCO Reserve Foresta BSD.</strong> Jl. BSD Raya
                    Utama, Tangerang, Banten.
                  </p>
                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label htmlFor="waktu_pengambilan">
                      Pilih Waktu Pengambilan{" "}
                      <span className="req-star">*</span>
                    </label>
                    <select
                      id="waktu_pengambilan"
                      name="waktu_pengambilan"
                      value={form.waktu_pengambilan}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">Pilih Jadwal</option>
                      <option value="TBC">
                        Akan Dikonfirmasi Kembali (TBC)
                      </option>
                      <option value="pickup_bsd_day1">
                        Foresta BSD - Hari 1 (10:00 - 18:00 WIB)
                      </option>
                      <option value="pickup_bsd_day2">
                        Foresta BSD - Hari 2 (10:00 - 18:00 WIB)
                      </option>
                    </select>
                  </div>
                </div>
              )}

              {/* JIKA DIKIRIM */}
              {form.pengambilan_racepack === "delivery" && (
                <div
                  className="grid-span-full form-grid"
                  style={{
                    padding: "1rem",
                    background: "var(--bg-secondary)",
                    borderRadius: "12px",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="penerima_nama">
                      Nama Penerima <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="penerima_nama"
                      name="penerima_nama"
                      placeholder="Nama penerima paket"
                      value={form.penerima_nama}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="penerima_telepon">
                      Nomor Telepon Penerima <span className="req-star">*</span>
                    </label>
                    <input
                      type="tel"
                      id="penerima_telepon"
                      name="penerima_telepon"
                      placeholder="No telepon penerima"
                      value={form.penerima_telepon}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pengiriman_kota">
                      Kota Pengiriman <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="pengiriman_kota"
                      name="pengiriman_kota"
                      placeholder="Kota pengiriman"
                      value={form.pengiriman_kota}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pengiriman_kodepos">
                      Kode Pos <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="pengiriman_kodepos"
                      name="pengiriman_kodepos"
                      placeholder="Kode pos"
                      value={form.pengiriman_kodepos}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group grid-span-full">
                    <label htmlFor="pengiriman_alamat">
                      Alamat Lengkap Pengiriman{" "}
                      <span className="req-star">*</span>
                    </label>
                    <textarea
                      id="pengiriman_alamat"
                      name="pengiriman_alamat"
                      rows="3"
                      placeholder="Masukkan alamat lengkap (jalan, nomor rumah, RT/RW, kecamatan, kelurahan)"
                      value={form.pengiriman_alamat}
                      onChange={handleChange}
                      className="form-control"
                      style={{ resize: "vertical" }}
                    ></textarea>
                  </div>
                </div>
              )}

              {/* PROTEKSI ASURANSI */}
              <div
                className="form-group grid-span-full"
                style={{ marginTop: "1rem" }}
              >
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="persetujuan_asuransi"
                    checked={form.persetujuan_asuransi}
                    onChange={handleChange}
                  />
                  <span>
                    <strong>
                      Persetujuan Asuransi Jiwa &amp; Kecelakaan Gratis:
                    </strong>{" "}
                    Saya bersedia didaftarkan untuk mendapatkan perlindungan
                    Asuransi Jiwa dan Kecelakaan Diri Gratis dari perusahaan
                    asuransi rekanan penyelenggara untuk durasi PLN Energy Run
                    2026. <span className="req-star">*</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary register-submit-btn">
            Selesaikan Pendaftaran ({selectedDetails.price})
          </button>
        </form>

        <div
          className="register-footer-text"
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
          }}
        >
          Sudah terdaftar sebagai peserta?{" "}
          <Link
            to="/login"
            style={{ color: "var(--pln-blue)", fontWeight: 700 }}
          >
            Masuk di Sini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
