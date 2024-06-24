

import bcrypt from 'bcrypt';

const salt_rouns:number = 10;




// Encriptacion para contrasñas mediante TypeScript
export const hashPassword = async (password:string): Promise<string> => {
    return await bcrypt.hash(password, salt_rouns);

}

export const compararPassword = async (password: string, hash: string): Promise<boolean> => {

    return await bcrypt.compare(password, hash)
}