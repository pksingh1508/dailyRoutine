
const express = require("express")
const router = express.Router();

// import { signup, login, sendOtp } from "../controller/auth";
const { signup, login, sendOtp } = require("../controller/auth");



router.post('/login', login);
router.post('/signup', signup);
router.post('/sendOtp', sendOtp);



module.exports = router;
