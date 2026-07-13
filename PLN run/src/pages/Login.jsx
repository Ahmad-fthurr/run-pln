import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.png";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    nama: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validasi kolom kosong
    if (!form.email || !form.nama) {
      setError("Harap isi Email dan Nama Lengkap Anda.");
      return;
    }

    // 2. Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Format email tidak valid.");
      return;
    }

    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      
      // Mengirimkan request login dengan email dan nama sesuai instruksi user
      const response = await axios.post(`${baseUrl}/api/user/login`, {
        email: form.email,
        nama: form.nama,
      });

      if (response.status === 200 || response.status === 201) {
        const userData = response.data.user || response.data || {
          nama: form.nama,
          email: form.email,
        };

        // Simpan sesi ke localStorage
        localStorage.setItem("userSession", JSON.stringify(userData));
        
        navigate("/dashboard");
      } else {
        throw new Error("Gagal login, data tidak cocok.");
      }
    } catch (err) {
      console.error("Login error details:", err);
      
      // Fallback jika API endpoint /api/user/login belum siap atau error 404,
      // kita bisa memberikan opsi coba lagi atau simulasi data untuk keperluan frontend.
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Data pendaftaran tidak ditemukan. Pastikan email dan nama sesuai.";
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
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

      <div className="login-card glass-card">
        <div className="login-header">
          <img src={Logo} alt="Logo PLN" className="login-pln-logo" />
          <h2 className="login-title">Masuk Portal Peserta</h2>
          <p className="login-subtitle">PLN Electric Run 2026</p>
        </div>

        {error && <div className="form-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Alamat Email Terdaftar</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="contoh@email.com"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nama">Nama Lengkap Terdaftar</label>
            <input
              type="text"
              id="nama"
              name="nama"
              placeholder="Masukkan nama lengkap sesuai pendaftaran"
              value={form.nama}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary login-submit-btn"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="login-footer-text">
          Belum mendaftar sebagai peserta? <Link to="/register" className="text-link">Daftar Sekarang</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
