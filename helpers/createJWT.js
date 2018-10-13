import jwt from 'jsonwebtoken'
import _ from 'lodash'
import {jsonwt} from '../config'

const { expiresIn, issuer, secretOrKey } = jsonwt
export default function createJWT(data){
    let token = jwt.sign(data,
        secretOrKey, 
        {expiresIn, issuer})
    return token
}