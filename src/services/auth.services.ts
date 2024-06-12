
import { user } from '../models/user.interface';

import jwt from 'jsonwebtoken';


const secret_key = process.env.SECRET_KEY || 'JLEVEM';

export const generarToken = (user: user): string => {
    return jwt.sign({id: user.id, correo:user.correo, password: user.password}, secret_key, {expiresIn: '1hr'})
}