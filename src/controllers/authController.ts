

import { Request, Response } from "express";
import { hashPassword } from "../services/passwordServices";
import prisma from '../models/user'
import { generarToken } from "../services/auth.services";


export const registrar = async (req: Request, res: Response): Promise<void> => {

    const {correo, password} = req.body;

    try{

        const encrptado = await hashPassword(password);
        console.log(encrptado);

        const user = await prisma.create({

            data: {
                correo,
                password: encrptado
            }
        })


        const token = generarToken(user);

        res.status(201).json({
            token: token
        });

    }
    catch (error){
        console.log(error);
        res.status(500).json({message: "Se genero un error"})
    }

}