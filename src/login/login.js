const express = require("express");
const router = express.Router();

// 1. Import objek 'db' dari folder models
// Jalur '../models' akan otomatis mencari file index.js di dalamnya
const db = require("../Database/models/index.js");

router.post("/login", async (req, res) => {
  const { email, nama } = req.body;

  // Validasi input kosong
  if (!email || !nama) {
    return res.status(400).json({ message: "Email dan Nama wajib diisi!" });
  }

  try {
    const userTerdaftar = await db.User.findOne({
      where: { email: email },
    });

    // Jika email tidak ditemukan di database
    if (!userTerdaftar) {
      return res.status(404).json({ message: "Alamat email belum terdaftar!" });
    }

    if (userTerdaftar.nama.toLowerCase() !== nama.toLowerCase()) {
      return res.status(400).json({
        message: "Nama lengkap tidak sesuai dengan data pendaftaran!",
      });
    }

    // Jika berhasil lolos semua pengecekan
    console.log(`User ${nama} berhasil masuk.`);
    return res.status(200).json({
      message: "Login berhasil!",
      user: {
        id: userTerdaftar.id,
        nama: userTerdaftar.nama,
        email: userTerdaftar.email,
        no_telepon: userTerdaftar.no_telepon,
        category: userTerdaftar.category,
        nama_depan: userTerdaftar.nama_depan,
        nama_belakang: userTerdaftar.nama_belakang,
        jenis_kelamin: userTerdaftar.jenis_kelamin,
        tanggal_lahir: userTerdaftar.tanggal_lahir,
        kewarganegaraan: userTerdaftar.kewarganegaraan,
        negara_txt: userTerdaftar.negara_txt,
        kota: userTerdaftar.kota,
        golongan_darah: userTerdaftar.golongan_darah,
        riwayat_penyakit: userTerdaftar.riwayat_penyakit,
        kontak_darurat_nama: userTerdaftar.kontak_darurat_nama,
        kontak_darurat_telepon: userTerdaftar.kontak_darurat_telepon,
        kontak_darurat_hubungan: userTerdaftar.kontak_darurat_hubungan,
        ukuran_kaos: userTerdaftar.ukuran_kaos,
        pengambilan_racepack: userTerdaftar.pengambilan_racepack,
        waktu_pengambilan: userTerdaftar.waktu_pengambilan,
        penerima_nama: userTerdaftar.penerima_nama,
        penerima_telepon: userTerdaftar.penerima_telepon,
        pengiriman_kota: userTerdaftar.pengiriman_kota,
        pengiriman_alamat: userTerdaftar.pengiriman_alamat,
        pengiriman_kodepos: userTerdaftar.pengiriman_kodepos,
        komunitas_lari: userTerdaftar.komunitas_lari,
        persetujuan_asuransi: userTerdaftar.persetujuan_asuransi,
        status_pembayaran: userTerdaftar.status_pembayaran,
        isPaid: userTerdaftar.isPaid,
        virtual_account: userTerdaftar.virtual_account,
        bukti_pembayaran: userTerdaftar.bukti_pembayaran,
      },
    });
  } catch (error) {
    console.error("Sequelize/Server Error:", error);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan pada internal server" });
  }
});

module.exports = router;
