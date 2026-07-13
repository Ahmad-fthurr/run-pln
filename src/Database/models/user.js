'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({

     id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_telepon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama_depan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama_belakang: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jenis_kelamin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggal_lahir: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      kewarganegaraan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      negara_txt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      kota: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      golongan_darah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      riwayat_penyakit: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      kontak_darurat_nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kontak_darurat_telepon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kontak_darurat_hubungan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ukuran_kaos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pengambilan_racepack: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      waktu_pengambilan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      penerima_nama: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      penerima_telepon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pengiriman_kota: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pengiriman_alamat: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      pengiriman_kodepos: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      komunitas_lari: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      persetujuan_asuransi: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      status_pembayaran: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Belum Lunas",
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      virtual_account: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bukti_pembayaran: {
        type: DataTypes.STRING,
        allowNull: true,
      }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
  });
  return User;
};