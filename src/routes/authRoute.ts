

import express from 'express';
import { registrar } from '../controllers/authController';



const router = express.Router();

router.post('/registro', registrar);
router.post('/login');


export default router;