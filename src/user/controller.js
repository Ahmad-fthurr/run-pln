const { findAllUser, createUser, deleteUser, findUserById, updateUser } = require("./servis.js");
const bcrypt = require("bcrypt");

const findAll = async (req, res) => {
  const users = await findAllUser();
  res.status(200).json({ message: "User ditemukan", users });
};

const hapusUser = async (req, res) => {
  const { id } = req.params;
  const deleted = await deleteUser(id);
  res.status(200).json({ message: "User berhasil dihapus" });
};

const buatUser = async (req, res) => {
  try {
    const {
      nama,
      email,
      password,
      no_telepon,
      category,
      nama_depan,
      nama_belakang,
      jenis_kelamin,
      tanggal_lahir,
      kewarganegaraan,
      negara_txt,
      kota,
      golongan_darah,
      riwayat_penyakit,
      kontak_darurat_nama,
      kontak_darurat_telepon,
      kontak_darurat_hubungan,
      ukuran_kaos,
      pengambilan_racepack,
      waktu_pengambilan,
      penerima_nama,
      penerima_telepon,
      pengiriman_kota,
      pengiriman_alamat,
      pengiriman_kodepos,
      komunitas_lari,
      persetujuan_asuransi,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a 16-digit Virtual Account (prefixed with 8800 + 12 random digits)
    const virtual_account = "000000000";

    const user = await createUser({
      nama,
      email,
      password: hashedPassword,
      no_telepon,
      category,
      nama_depan,
      nama_belakang,
      jenis_kelamin,
      tanggal_lahir,
      kewarganegaraan,
      negara_txt,
      kota,
      golongan_darah,
      riwayat_penyakit,
      kontak_darurat_nama,
      kontak_darurat_telepon,
      kontak_darurat_hubungan,
      ukuran_kaos,
      pengambilan_racepack,
      waktu_pengambilan,
      penerima_nama,
      penerima_telepon,
      pengiriman_kota,
      pengiriman_alamat,
      pengiriman_kodepos,
      komunitas_lari,
      persetujuan_asuransi,
      status_pembayaran: "Belum Lunas",
      isPaid: false,
      virtual_account,
    });

    res.status(201).json({ message: "Pendaftaran Berhasil!!", user });
  } catch (error) {
    console.error("Error saat pendaftaran user:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Alamat email sudah terdaftar!" });
    }
    res.status(500).json({ message: "Terjadi kesalahan pada server saat pendaftaran" });
  }
};

const uploadBukti = async (req, res) => {
  try {
    const { id } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "Harap sertakan file bukti pembayaran!" });
    }

    if (!id) {
      return res.status(400).json({ message: "ID User tidak valid!" });
    }

    const userExist = await findUserById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    const updatedUser = await updateUser(id, {
      bukti_pembayaran: req.file.filename,
      status_pembayaran: "Menunggu Verifikasi"
    });

    res.status(200).json({
      message: "Bukti pembayaran berhasil diunggah!",
      user: {
        id: updatedUser.id,
        nama: updatedUser.nama,
        email: updatedUser.email,
        no_telepon: updatedUser.no_telepon,
        category: updatedUser.category,
        nama_depan: updatedUser.nama_depan,
        nama_belakang: updatedUser.nama_belakang,
        jenis_kelamin: updatedUser.jenis_kelamin,
        tanggal_lahir: updatedUser.tanggal_lahir,
        kewarganegaraan: updatedUser.kewarganegaraan,
        negara_txt: updatedUser.negara_txt,
        kota: updatedUser.kota,
        golongan_darah: updatedUser.golongan_darah,
        riwayat_penyakit: updatedUser.riwayat_penyakit,
        kontak_darurat_nama: updatedUser.kontak_darurat_nama,
        kontak_darurat_telepon: updatedUser.kontak_darurat_telepon,
        kontak_darurat_hubungan: updatedUser.kontak_darurat_hubungan,
        ukuran_kaos: updatedUser.ukuran_kaos,
        pengambilan_racepack: updatedUser.pengambilan_racepack,
        waktu_pengambilan: updatedUser.waktu_pengambilan,
        penerima_nama: updatedUser.penerima_nama,
        penerima_telepon: updatedUser.penerima_telepon,
        pengiriman_kota: updatedUser.pengiriman_kota,
        pengiriman_alamat: updatedUser.pengiriman_alamat,
        pengiriman_kodepos: updatedUser.pengiriman_kodepos,
        komunitas_lari: updatedUser.komunitas_lari,
        persetujuan_asuransi: updatedUser.persetujuan_asuransi,
        status_pembayaran: updatedUser.status_pembayaran,
        isPaid: updatedUser.isPaid,
        virtual_account: updatedUser.virtual_account,
        bukti_pembayaran: updatedUser.bukti_pembayaran,
      }
    });
  } catch (error) {
    console.error("Error saat mengunggah bukti pembayaran:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server saat mengunggah bukti pembayaran" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const userExist = await findUserById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    const updatedUser = await updateUser(id, {
      status_pembayaran: "Lunas",
      isPaid: true,
    });

    res.status(200).json({
      message: `Pembayaran ${updatedUser.nama} berhasil diverifikasi!`,
      user: {
        id: updatedUser.id,
        nama: updatedUser.nama,
        email: updatedUser.email,
        status_pembayaran: updatedUser.status_pembayaran,
        isPaid: updatedUser.isPaid,
      },
    });
  } catch (error) {
    console.error("Error saat verifikasi pembayaran:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat verifikasi pembayaran" });
  }
};

module.exports = { findAll, hapusUser, buatUser, uploadBukti, verifyPayment };
