const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  buatUser,
  findAll,
  hapusUser,
  uploadBukti,
  verifyPayment,
  updateRacepack,
} = require("./controller.js");

// Configure Multer storage to retain original file extensions
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "bukti-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", findAll);
router.delete("/delete/:id", hapusUser);
router.post("/create", buatUser);
router.post("/upload-bukti", upload.single("bukti"), uploadBukti);
router.patch("/verify-payment/:id", verifyPayment);
router.patch("/update-racepack/:id", updateRacepack);

module.exports = router;
