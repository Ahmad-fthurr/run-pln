import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Admin.css";

const ADMIN_PASSWORD = "admin123pln";

// Helper
const getCatClass = (cat) => {
  if (!cat) return "";
  if (cat === "5k") return "cat-5k";
  if (cat === "10k") return "cat-10k";
  if (cat === "21k") return "cat-21k";
  return "";
};

const getPayClass = (status, isPaid) => {
  if (isPaid || status === "Lunas") return "pay-lunas";
  if (status === "Menunggu Verifikasi") return "pay-verifikasi";
  return "pay-belum";
};

const getPayLabel = (status, isPaid) => {
  if (isPaid || status === "Lunas") return "✅ Lunas";
  if (status === "Menunggu Verifikasi") return "⏳ Menunggu Verifikasi";
  return "⚠️ Belum Bayar";
};

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ────────────────────────────────────────────────────────────
// Admin Login Gate
// ────────────────────────────────────────────────────────────
const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("Password admin salah. Coba lagi.");
      setPassword("");
    }

    if (!password) {
      setError("Silahkan masukkan password admin!");
    }
  };

  return (
    <div className="admin-login-wrap">
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

      <div className="admin-login-card">
        <div className="admin-login-icon">🛡️</div>
        <h2>Admin Portal</h2>
        <p>PLN Energy Run 2026 · Panel Manajemen</p>

        {error && <div className="admin-login-error">{error}</div>}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div className="admin-input-group">
            <label>Password Admin</label>
            <input
              type="password"
              placeholder="Masukkan password admin"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              autoFocus
            />
          </div>
          <button type="submit" className="btn-admin-login">
            Masuk sebagai Admin
          </button>
        </form>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────
// User Detail Modal
// ────────────────────────────────────────────────────────────
const UserModal = ({ user, onClose, onVerify, verifying }) => {
  const [lightbox, setLightbox] = useState(false);

  const buktiUrl = user.bukti_pembayaran
    ? `${BASE_URL}/uploads/${user.bukti_pembayaran}`
    : null;

  const isLunas = user.isPaid || user.status_pembayaran === "Lunas";

  // Close on backdrop click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <div className="admin-modal-overlay" onClick={handleOverlayClick}>
        <div className="admin-modal">
          {/* Header */}
          <div className="modal-header">
            <div className="modal-header-info">
              <h3>{user.nama}</h3>
              <p>
                {user.email} · {user.no_telepon}
              </p>
            </div>
            <button className="modal-close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Informasi Akun */}
            <div>
              <div className="modal-section-title">Informasi Akun & Lomba</div>
              <div className="modal-info-grid">
                <div className="modal-info-item">
                  <span className="info-label">Kategori</span>
                  <span className="info-value">
                    <span className={`cat-badge ${getCatClass(user.category)}`}>
                      {user.category?.toUpperCase()}
                    </span>
                  </span>
                </div>
                <div className="modal-info-item">
                  <span className="info-label">Status Pembayaran</span>
                  <span className="info-value">
                    <span
                      className={`pay-badge ${getPayClass(user.status_pembayaran, user.isPaid)}`}
                    >
                      {getPayLabel(user.status_pembayaran, user.isPaid)}
                    </span>
                  </span>
                </div>
                <div className="modal-info-item">
                  <span className="info-label">Virtual Account</span>
                  <span
                    className="info-value"
                    style={{ fontFamily: "monospace", letterSpacing: "0.05em" }}
                  >
                    {user.virtual_account || "-"}
                  </span>
                </div>
                <div className="modal-info-item">
                  <span className="info-label">Ukuran Kaos</span>
                  <span className="info-value">{user.ukuran_kaos || "-"}</span>
                </div>
              </div>
            </div>

            {/* Data Pribadi */}
            <div>
              <div className="modal-section-title">Data Pribadi</div>
              <div className="modal-info-grid">
                <div className="modal-info-item">
                  <span className="info-label">Nama Lengkap</span>
                  <span className="info-value">{user.nama}</span>
                </div>
                <div className="modal-info-item">
                  <span className="info-label">Jenis Kelamin</span>
                  <span className="info-value">
                    {user.jenis_kelamin || "-"}
                  </span>
                </div>
                <div className="modal-info-item">
                  <span className="info-label">Tanggal Lahir</span>
                  <span className="info-value">
                    {user.tanggal_lahir || "-"}
                  </span>
                </div>
                <div className="modal-info-item">
                  <span className="info-label">Kewarganegaraan</span>
                  <span className="info-value">
                    {user.kewarganegaraan}
                    {user.negara_txt ? ` · ${user.negara_txt}` : ""}
                  </span>
                </div>
                <div className="modal-info-item">
                  <span className="info-label">Kota Domisili</span>
                  <span className="info-value">{user.kota || "-"}</span>
                </div>
                <div className="modal-info-item">
                  <span className="info-label">Golongan Darah</span>
                  <span className="info-value">
                    {user.golongan_darah || "-"}
                  </span>
                </div>
                {user.riwayat_penyakit && (
                  <div
                    className="modal-info-item"
                    style={{ gridColumn: "1/-1" }}
                  >
                    <span className="info-label">Riwayat Penyakit</span>
                    <span className="info-value">{user.riwayat_penyakit}</span>
                  </div>
                )}
                {user.komunitas_lari && (
                  <div className="modal-info-item">
                    <span className="info-label">Komunitas Lari</span>
                    <span className="info-value">{user.komunitas_lari}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Kontak Darurat */}
            <div>
              <div className="modal-section-title">Kontak Darurat</div>
              <div className="modal-info-grid">
                <div className="modal-info-item">
                  <span className="info-label">Nama</span>
                  <span className="info-value">
                    {user.kontak_darurat_nama || "-"}
                  </span>
                </div>
                <div className="modal-info-item">
                  <span className="info-label">No. Telepon</span>
                  <span className="info-value">
                    {user.kontak_darurat_telepon || "-"}
                  </span>
                </div>
                <div className="modal-info-item">
                  <span className="info-label">Hubungan</span>
                  <span className="info-value">
                    {user.kontak_darurat_hubungan || "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Racepack */}
            <div>
              <div className="modal-section-title">Pengambilan Racepack</div>
              <div className="modal-info-grid">
                <div className="modal-info-item">
                  <span className="info-label">Metode</span>
                  <span
                    className="info-value"
                    style={{ textTransform: "capitalize" }}
                  >
                    {user.pengambilan_racepack || "-"}
                  </span>
                </div>
                {user.pengambilan_racepack === "pickup" && (
                  <div className="modal-info-item">
                    <span className="info-label">Waktu Pengambilan</span>
                    <span className="info-value">
                      {user.waktu_pengambilan || "-"}
                    </span>
                  </div>
                )}
                {user.pengambilan_racepack === "delivery" && (
                  <>
                    <div className="modal-info-item">
                      <span className="info-label">Nama Penerima</span>
                      <span className="info-value">
                        {user.penerima_nama || "-"}
                      </span>
                    </div>
                    <div className="modal-info-item">
                      <span className="info-label">Telepon Penerima</span>
                      <span className="info-value">
                        {user.penerima_telepon || "-"}
                      </span>
                    </div>
                    <div className="modal-info-item">
                      <span className="info-label">Kota Pengiriman</span>
                      <span className="info-value">
                        {user.pengiriman_kota || "-"}
                      </span>
                    </div>
                    <div className="modal-info-item">
                      <span className="info-label">Kode Pos</span>
                      <span className="info-value">
                        {user.pengiriman_kodepos || "-"}
                      </span>
                    </div>
                    <div
                      className="modal-info-item"
                      style={{ gridColumn: "1/-1" }}
                    >
                      <span className="info-label">Alamat Lengkap</span>
                      <span className="info-value">
                        {user.pengiriman_alamat || "-"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bukti Pembayaran */}
            <div>
              <div className="modal-section-title">Bukti Pembayaran</div>
              <div className="bukti-section">
                {buktiUrl ? (
                  <div
                    className="bukti-image-wrap"
                    onClick={() => setLightbox(true)}
                  >
                    <img src={buktiUrl} alt="Bukti Pembayaran" />
                    <div className="bukti-image-overlay">
                      🔍 Klik untuk perbesar
                    </div>
                  </div>
                ) : (
                  <div className="bukti-empty">
                    📂 Belum ada bukti pembayaran yang diunggah.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn-modal-close" onClick={onClose}>
              Tutup
            </button>
            {!isLunas && buktiUrl && (
              <button
                className="btn-verify"
                onClick={() => onVerify(user.id)}
                disabled={verifying}
              >
                {verifying ? "Memverifikasi..." : "✅ Verifikasi Pembayaran"}
              </button>
            )}
            {isLunas && (
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#16a34a",
                  fontWeight: 700,
                }}
              >
                ✅ Pembayaran sudah terverifikasi
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(false)}>
          <button className="lightbox-close" onClick={() => setLightbox(false)}>
            ✕
          </button>
          <img
            src={buktiUrl}
            alt="Bukti Pembayaran (Full)"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

// ────────────────────────────────────────────────────────────
// Main Admin Dashboard
// ────────────────────────────────────────────────────────────

const AdminDashboard = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/user`);
      setUsers(res.data.users || []);
    } catch (err) {
      setError("Gagal memuat data peserta dari server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.nama?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.kota?.toLowerCase().includes(q) ||
        u.category?.toLowerCase().includes(q),
    );
  }, [users, search]);

  // Helper untuk mendapatkan status label Racepack saat ini
  const getRacepackStatusLabel = (method, isHandled) => {
    const isPickup = method?.toLowerCase() === "pickup";
    if (isHandled) {
      return isPickup ? "✅ Sudah Diambil" : "🚚 Sudah Dikirim";
    }
    return isPickup ? "⏳ Belum Diambil" : "📦 Belum Dikirim";
  };

  // Fungsi untuk mengubah status pengambilan/pengiriman racepack
  const handleToggleRacepack = async (id, currentMethod, currentStatus) => {
    const isPickup = currentMethod?.toLowerCase() === "pickup";
    const nextStatus = !currentStatus; // beralih benar jika sebelumnya salah

    const actionText = isPickup
      ? `Ubah menjadi ${nextStatus ? '"Sudah Diambil"' : '"Belum Diambil"'}?`
      : `Ubah menjadi ${nextStatus ? '"Sudah Dikirim"' : '"Belum Dikirim"'}?`;

    const result = await Swal.fire({
      title: "Update Status Racepack",
      text: actionText,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Ya, Ubah!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      // Menembak API patch ke backend bawa status baru (is_racepack_handled)
      await axios.patch(`${BASE_URL}/api/user/update-racepack/${id}`, {
        is_racepack_handled: nextStatus,
      });

      // Update state local biar tabel langsung berubah tanpa reload halaman
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, is_racepack_handled: nextStatus } : u,
        ),
      );

      Swal.fire({
        title: "Berhasil!",
        text: "Status logistik racepack berhasil diperbarui.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        title: "Gagal!",
        text:
          err.response?.data?.message || "Gagal memperbarui status racepack.",
        icon: "error",
      });
    }
  };

  // Stats
  const totalPeserta = users.length;
  const totalLunas = users.filter(
    (u) => u.isPaid || u.status_pembayaran === "Lunas",
  ).length;
  const totalVerifikasi = users.filter(
    (u) => u.status_pembayaran === "Menunggu Verifikasi" && !u.isPaid,
  ).length;
  const totalBelum = users.filter(
    (u) => u.status_pembayaran === "Belum Lunas",
  ).length;

  const handleVerify = async (id) => {
    setVerifying(true);
    try {
      await axios.patch(`${BASE_URL}/api/user/verify-payment/${id}`);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status_pembayaran: "Lunas", isPaid: true } : u,
        ),
      );
      if (selectedUser?.id === id) {
        setSelectedUser((prev) => ({
          ...prev,
          status_pembayaran: "Lunas",
          isPaid: true,
        }));
      }
      alert("Pembayaran berhasil diverifikasi! Status berubah menjadi Lunas.");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal memverifikasi pembayaran.");
    } finally {
      setVerifying(false);
    }
  };

  // delete user
  const handleDelete = async (id, nama) => {
    const result = await Swal.fire({
      title: "Hapus Peserta?",
      text: `Apakah Anda yakin ingin menghapus "${nama}" dari daftar PLN Energy Run 2026? Data yang dihapus tidak bisa dikembalikan!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      background: "#ffffff",
      iconColor: "#f8bb86",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${BASE_URL}/api/user/delete/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      Swal.fire({
        title: "Terhapus!",
        text: "Data peserta berhasil dihapus.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        title: "Gagal!",
        text: err.response?.data?.message || "Gagal menghapus data peserta.",
        icon: "error",
      });
    }
  };

  return (
    <div className="admin-page">
      {/* Top Bar */}
      <div className="admin-topbar">
        <div className="admin-topbar-brand">
          <span className="admin-shield">🛡️</span>
          <div>
            <h1>Admin Panel</h1>
            <span>PLN Energy Run 2026</span>
          </div>
        </div>
        <div className="admin-topbar-right">
          <div className="admin-topbar-stats">
            <div className="stat-chip">
              <span className="stat-number">{totalPeserta}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-chip">
              <span className="stat-number">{totalLunas}</span>
              <span className="stat-label">Lunas</span>
            </div>
            <div className="stat-chip">
              <span className="stat-number">{totalVerifikasi}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
          <button className="btn-admin-logout" onClick={onLogout}>
            Keluar
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="admin-content">
        {/* Header */}
        <div className="admin-content-header">
          <div>
            <h2>Daftar Peserta</h2>
            <p>Klik baris untuk melihat detail lengkap dan bukti pembayaran</p>
          </div>
          <div className="admin-search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Cari nama, email, kota..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="admin-summary-cards">
          <div className="summary-card">
            <div className="summary-card-icon blue">👥</div>
            <div className="summary-card-info">
              <div className="summary-number">{totalPeserta}</div>
              <div className="summary-label">Total Peserta</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon green">✅</div>
            <div className="summary-card-info">
              <div className="summary-number">{totalLunas}</div>
              <div className="summary-label">Pembayaran Lunas</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon yellow">⏳</div>
            <div className="summary-card-info">
              <div className="summary-number">{totalVerifikasi}</div>
              <div className="summary-label">Menunggu Verifikasi</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon purple">⚠️</div>
            <div className="summary-card-info">
              <div className="summary-number">{totalBelum}</div>
              <div className="summary-label">Belum Bayar</div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: 12,
              padding: "1rem",
              color: "#dc2626",
              marginBottom: "1rem",
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}

        {/* Table */}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Peserta</th>
                <th>Kategori</th>
                <th>Kota</th>
                <th>Ukuran Kaos</th>
                <th>Racepack</th>
                <th>Status Bayar</th>
                <th>Bukti</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="table-loading">
                    ⏳ Memuat data peserta...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="table-no-data">
                    {search
                      ? `Tidak ada peserta yang cocok dengan pencarian "${search}"`
                      : "Belum ada peserta terdaftar."}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, index) => (
                  <tr key={u.id} onClick={() => setSelectedUser(u)}>
                    <td
                      style={{
                        color: "var(--text-muted)",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                      }}
                    >
                      {index + 1}
                    </td>
                    <td>
                      <div className="td-name">{u.nama}</div>
                      <div className="td-email">{u.email}</div>
                    </td>
                    <td>
                      <span className={`cat-badge ${getCatClass(u.category)}`}>
                        {u.category?.toUpperCase() || "-"}
                      </span>
                    </td>
                    <td>{u.kota || "-"}</td>
                    <td style={{ fontWeight: 700 }}>{u.ukuran_kaos || "-"}</td>

                    {/* BAGIAN RACEPACK DENGAN BUTTON INTERAKTIF */}
                    <td onClick={(e) => e.stopPropagation()}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                        }}
                      >
                        <span
                          style={{
                            textTransform: "capitalize",
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          📦 {u.pengambilan_racepack || "-"}
                        </span>
                        <button
                          className={`btn-racepack-status ${u.is_racepack_handled ? "handled" : "pending"}`}
                          onClick={() =>
                            handleToggleRacepack(
                              u.id,
                              u.pengambilan_racepack,
                              u.is_racepack_handled,
                            )
                          }
                          style={{
                            padding: "4px 8px",
                            fontSize: "0.75rem",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "600",
                            textAlign: "center",
                            width: "fit-content",
                            background: u.is_racepack_handled
                              ? "#e8f5e9"
                              : "#fff3e0",
                            color: u.is_racepack_handled
                              ? "#2e7d32"
                              : "#ef6c00",
                            border: u.is_racepack_handled
                              ? "1px solid #a5d6a7"
                              : "1px solid #ffe0b2",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {getRacepackStatusLabel(
                            u.pengambilan_racepack,
                            u.is_racepack_handled,
                          )}
                        </button>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`pay-badge ${getPayClass(u.status_pembayaran, u.isPaid)}`}
                      >
                        {getPayLabel(u.status_pembayaran, u.isPaid)}
                      </span>
                    </td>
                    <td>
                      {u.bukti_pembayaran ? (
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "#16a34a",
                            fontWeight: 700,
                          }}
                        >
                          ✅ Ada
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          —
                        </span>
                      )}
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button
                        className="btn-detail"
                        onClick={() => setSelectedUser(u)}
                      >
                        Detail
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(u.id, u.nama)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onVerify={handleVerify}
          verifying={verifying}
        />
      )}
    </div>
  );
};
// ────────────────────────────────────────────────────────────
// Root Admin Component
// ────────────────────────────────────────────────────────────
const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("adminAuth") === "true";
  });

  const handleLogin = () => {
    sessionStorage.setItem("adminAuth", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
};

export default Admin;
