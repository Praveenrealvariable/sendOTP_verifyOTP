import express from 'express';
import { sendOTP, verifyOTP } from "../../controllers/apiv1/userController.js";


const router = express.Router();

router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);

export default router;
