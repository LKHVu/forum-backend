import jwt from 'jsonwebtoken'
import _ from 'lodash'
import {jsonwt} from '../config'

const { expiresIn, issuer, secret } = jsonwt

export default function createJWT(data){
    
    if (typeof data !== 'object'){
        data = {}
    }
    
    data = _.reduce(data || {}, (item, val, key ) => {
        if (typeof val !== 'function' && key !== 'password'){
            item[key] = val
        }
        return item
    }, {})
    
    let token = jwt.sign({data},
        secret, 
        {expiresIn, issuer})

    return token
}