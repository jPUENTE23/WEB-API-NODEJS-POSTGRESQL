
import {NextFunction, Request, Response} from 'express';

import express from 'express';
import { getAllUsers, getUserBydId, updateUser } from '../controllers/usersController';
import { registrar } from '../controllers/authController';
import jwt from 'jsonwebtoken';


const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || 'mayberry'

const authToken = (req: Request,res:Response, next: NextFunction) =>{

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({message: "NO autorizado"})
    }

    jwt.verify(token, SECRET_KEY, (err, decode) => {

        if(err){
            console.error("Error en la autenticacion", err)

            return res.status(401).json({message: "No tienes acceso a este recurso"})
        }

        next();
    })
}


router.post('/', authToken, registrar)
router.get('/', authToken, getAllUsers)
router.get('/:id',authToken, getUserBydId)
router.put('/:id', authToken, updateUser)
router.delete('/:id', authToken, ()=> {return console.log("Eliminar usuario")})


export default router;