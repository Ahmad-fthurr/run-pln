'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      no_telepon: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category : {
        type: Sequelize.STRING,
        allowNull: false
      },
      nama_depan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nama_belakang: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jenis_kelamin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tanggal_lahir: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      kewarganegaraan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      negara_txt: {
        type: Sequelize.STRING,
        allowNull: true
      },
      kota: {
        type: Sequelize.STRING,
        allowNull: false
      },
      golongan_darah: {
        type: Sequelize.STRING,
        allowNull: false
      },
      riwayat_penyakit: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      kontak_darurat_nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kontak_darurat_telepon: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kontak_darurat_hubungan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ukuran_kaos: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pengambilan_racepack: {
        type: Sequelize.STRING,
        allowNull: false
      },
      waktu_pengambilan: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: false
      },
      penerima_nama: {
        type: Sequelize.STRING,
        allowNull: true
      },
      penerima_telepon: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pengiriman_kota: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pengiriman_alamat: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      pengiriman_kodepos: {
        type: Sequelize.STRING,
        allowNull: true
      },
      komunitas_lari: {
        type: Sequelize.STRING,
        allowNull: true
      },
      persetujuan_asuransi: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      status_pembayaran: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Belum Lunas'
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      virtual_account: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bukti_pembayaran: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_racepack_handled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};