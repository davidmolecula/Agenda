import 'dotenv/config.js'
import crypto from 'crypto'
import { Buffer } from 'buffer';
const secretKey=import.meta.env.VITE_APP_SECRET_KEY_CIPHER;
const algoritmo='aes-256-cbc';
const key=Buffer.from(secretKey,'hex')
const iv=crypto.randomBytes(16)


const encriptar=(account,password)=>{
    const cipher=crypto.createCipheriv(algoritmo,key,iv)
    const cipher2=crypto.createCipheriv(algoritmo,key,iv)
    const passwordEncrypted=Buffer.concat([cipher.update(password),cipher.final()])
    const accountEncrypted=Buffer.concat([cipher2.update(account),cipher2.final()])
    return{
        iv:iv.toString('hex'),
        encryptedAcc:accountEncrypted.toString('hex'),
        encryptedPass:passwordEncrypted.toString('hex'),
    }
}


export default encriptar


