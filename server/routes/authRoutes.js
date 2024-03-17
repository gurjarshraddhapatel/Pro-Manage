const express = require("express");
const {
  login,
  signup,
  logout,
  update,
} = require("../controlers/authController");

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.put("/update/:id", update);

module.exports = router;
