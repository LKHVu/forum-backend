import bcrypt from 'bcryptjs'

export default function getPwHash(password){
    const saltRounds = 10
    const hash = bcrypt.hashSync(password, saltRounds)
    return hash
}
