import {ExtractJwt, Strategy} from 'passport-jwt'
import {jsonwt} from '../config'

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
opts.secretOrKey = jsonwt.secretOrKey
console.log(opts)
const JWTStrategy = new Strategy(opts, (jwtPayload, next) => {
    console.log("hello")
})

export default function(passport){
    passport.use(JWTStrategy)
}