const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Ambil token dari header 'Authorization'
  // Biasanya formatnya: Bearer <token>
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Akses ditolak! Kamu belum login." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(403)
      .json({ message: "Token tidak valid atau sudah kadaluarsa." });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Akses dilarang! Fitur ini khusus Admin." });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
