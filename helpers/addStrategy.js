import {ExtractJwt, Strategy} from 'passport-jwt'
import {jsonwt} from '../config'
import {User} from '../models'

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT')
opts.secretOrKey = jsonwt.secretOrKey
const JWTStrategy = new Strategy(opts, async function(jwtPayload, next){
    try {
        const user = await User.findById(jwtPayload._id)
        console.log(jwtPayload)
        if (user){
            next(null, user)
        } else {
            next(null, false)
        }
    } catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})

export default function(passport){
    passport.use(JWTStrategy)
}