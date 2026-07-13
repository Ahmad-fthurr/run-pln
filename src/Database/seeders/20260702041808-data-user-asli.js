"use strict";
const bcrypt = require("bcryptjs"); // Atau require('bcrypt') sesuaikan dengan package.json kamu

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123", salt); // password asli

    // 2. Masukkan data asli ke tabel 'users'
    await queryInterface.bulkInsert(
      "user",
      [
        {
          nama: "Zus Eka Putri",
          email: "zus.eka@pln.co.id",
          password: hashedPassword,
          no_telepon: "08123456789",
          category: "5k",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Zuraida",
          email: "zuraida2@pln.co.id",
          password: hashedPassword,
          no_telepon: "08123456789",
          category: "10k",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Zunaryati",
          email: "zunaryati@pln.co.id",
          password: hashedPassword,
          no_telepon: "08123456789",
          category: "5k",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Zummarudin Nizar",
          email: "Zummarudin.nizar@pln.co.id",
          password: hashedPassword,
          no_telepon: "08123456789",
          category: "5k",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Zulwendri Harahap",
          email: "zulwendri@pln.co.id",
          password: hashedPassword,
          no_telepon: "08123456789",
          category: "5k",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    // Perintah untuk mengosongkan kembali tabel jika seeder di-undo
    await queryInterface.bulkDelete("users", null, {});
  },
};
