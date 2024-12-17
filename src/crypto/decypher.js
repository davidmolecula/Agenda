import crypto from 'crypto'
const secretKey=import.meta.env.VITE_SECRET_KEY_CIPHER;
import encriptar from './cypher';

const desencriptar=(password)=>{
    const algoritmo='aes-256-cbc';
    const iv=Buffer.from(password.iv,'hex')
    const key=Buffer.from(secretKey,'hex')
    const encryptedAcc=Buffer.from(password.encryptedAcc,'hex')
    const encryptedPass=Buffer.from(password.encryptedPass,'hex')
    const accountDesencrypted=crypto.createDecipheriv(algoritmo,key,iv)
    const passwordDesencrypted=crypto.createDecipheriv(algoritmo,key,iv)
    return {
        encryptedAcc:Buffer.concat([accountDesencrypted.update(encryptedAcc),accountDesencrypted.final()]).toString(),
        encryptedPass:Buffer.concat([passwordDesencrypted.update(encryptedPass),passwordDesencrypted.final()]).toString()
    }
}


export default desencriptar