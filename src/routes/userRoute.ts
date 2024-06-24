
import {NextFunction, Request, Response} from 'express';

import express from 'express';

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


router.post('/', authToken,() => { return console.log("Registrar")})
router.get('/', authToken, ()=> { return console.log("GetAll")})
router.get('/:id',authToken, ()=> { return console.log("Un usuario")})
router.put('/:id', authToken, ()=> {return console.log("Modificar")})
router.delete('/:id', authToken, ()=> {return console.log("Eliminar usuario")})


export default router;