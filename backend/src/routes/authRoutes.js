const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validateMiddleware");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

const router = express.Router();

router.post("/register", registerValidator, validateRequest, registerUser);
router.post("/login", loginValidator, validateRequest, loginUser);
router.get("/me", protect, getProfile);

module.exports = router;
