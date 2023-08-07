import express from "express"
const router = express.Router();

import { signup, login, sendOtp } from "../controller/auth";



router.post('/login', login);
router.post('/signup', signup);
router.post('/sendOtp', sendOtp);



export default router;
