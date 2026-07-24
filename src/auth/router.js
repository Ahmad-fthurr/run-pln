const express = require("express");
const router = express.Router();
const { register, login, checkEmail } = require("./controller.js");

router.post("/register", register);
router.post("/check-email", checkEmail);
router.post("/login", login);

module.exports = router;
