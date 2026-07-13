const service = require("./servis.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { nama, email, password, } = req.body;

    const userExist = await service.findByEmail(email);
    if (userExist)
      return res.status(400).json({ msg: "Email sudah digunakan" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await service.create({
      nama,
      email,
      password: hashPassword,
    });

    res.status(201).json({ success: "Registrasi berhasil!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await service.findByEmail(email);

    console.log(user);

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    const token = jwt.sign(
      { id: user.id, nama: user.nama, },
      process.env.SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.status(200).json({
      id: user.id, 
      nama: user.nama, 
      token,
      msg: `Login berhasil ${user.nama}`,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { register, login };
