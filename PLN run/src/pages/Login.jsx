import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.png";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
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
    if (!form.email || !form.password) {
      setError("Harap isi Email dan Password anda.");
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

      const response = await axios.post(`${baseUrl}/api/user/login`, {
        email: form.email,
        password: form.password,
      });

      if (response.status === 200 || response.status === 201) {
        const userData = response.data.user ||
          response.data || {
            password: form.password,
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

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Gagal masuk. Silakan periksa kembali email dan password Anda.";

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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Masukkan Password Anda"
              value={form.password}
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
          Belum mendaftar sebagai peserta?{" "}
          <Link to="/register" className="text-link">
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
