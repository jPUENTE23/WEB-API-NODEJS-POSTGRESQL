

import express from 'express';
import { login, registrar } from '../controllers/authController';



const router = express.Router();

router.post('/registro', registrar);
router.post('/login', login);


export default router;