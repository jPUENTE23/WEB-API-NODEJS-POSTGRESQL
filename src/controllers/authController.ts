

import { Request, Response } from "express";
import { compararPassword, hashPassword } from "../services/passwordServices";
import prisma from '../models/user'
import { generarToken } from "../services/auth.services";


export const registrar = async (req: Request, res: Response): Promise<void> => {

    const {correo, password} = req.body;

    try{

        if(!correo){
            res.status(401).json({
                message: "El correo es obligatorio"
            })
            return
        }

        if(!password){
            res.status(401).json({
                message: "El password es obligatorio"
            })
            return
        }

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
    catch (error: any){


        if(error?.code === 'P2002' && error?.target?.include('correo')){
            res.status(400).json({
                message: "El correo ingresdo ya existe"
            })
        }
        console.log(error);
        res.status(500).json({message: "Se genero un error"})
    }

}


export const login = async (req: Request, res: Response): Promise<void> => {

    const {correo, password} = req.body;

    try{

        if(!correo){
            res.status(400).json({
                message: "El correo es obligatorio"
            })
            return
        }

        if(!password){
            res.status(400).json({
                message: "El passsowrd es obligatorio"
            })
            return
        }


        const user = await prisma.findUnique({ where: { correo } })
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' })
            return
        }

        const passwordMatch = await compararPassword(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ error: 'Usuario y contraseñas no coinciden' })
        }

        const token = generarToken(user)

        res.status(200).json({
            token: token
        })

    }
    catch (error){
        console.log(error)
    }

}