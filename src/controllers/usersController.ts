import { parse } from 'path';
import Prisma from '../models/user'
import {Request, Response} from 'express'
import { hashPassword } from '../services/passwordServices';



export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try{

        const users = await Prisma.findMany();
        res.status(200).json({users})
    }
    catch (error: any) {
        console.log(error)
        res.status(500).json({message: 'Error en el servidor'})
    }
}


export const getUserBydId = async(req: Request, res: Response): Promise<void> =>{

    const id = parseInt(req.params.id)

    try{

        const user = await Prisma.findUnique({
            where: {
                id 
            }
        })

        if(!user){
            res.status(404).json({message: 'El usuario no existe'})
        }

        res.status(200).json({user})

    }

    catch(error){
        console.log(error)
        res.status(500).json({message: 'Error en el servidor'})
    }

}


export const updateUser = async (req: Request, res:Response): Promise<void> => {
    const id = parseInt(req.params.id)

    const { correo, password} = req.body

    try{

        let dataUpdate: any = {...req.body}

        if(!password){
            res.status(400).json({message: 'Debes mandas una constraseña'})
        }

        if(!correo){
            res.status(400).json({message: 'Debes mandar un correo'})
        }

        const hashPass = await hashPassword(password);
        dataUpdate.passsowrd = hashPass

        dataUpdate.correo = correo

        const user = await Prisma.update({
            where:{
                id
            },
            data: dataUpdate

        })

        res.status(200).json({user})
        
    }
    catch (error: any) {
        if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(400).json({message: 'El correo ingreso ya existe'})
        } else if (error?.code == 'P2025'){
            res.status(404).json({message: 'Usuario no encontrado'})
        }else{
            console.log(error)
            res.status(500).json({error: 'Error en el servidor'})
        }
    }
}