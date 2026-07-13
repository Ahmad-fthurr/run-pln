const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsDir));

// --- IMPORT ROUTER ---
const routerAuth = require("./src/auth/router.js");
const routerUser = require("./src/user/router.js");
const routerLogin = require("./src/login/login.js");

// --- USE ROUTER ---
app.use("/api/auth", routerAuth);

app.use("/api/user", routerUser);

app.use("/api/user", routerLogin);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di: http://localhost:${PORT}`);
});
