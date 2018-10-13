import {Router} from 'express'
import User from './user'
import {Auth} from '../controllers'
import passport from 'passport'
// import {addStrategy} from '../helpers'
import {ExtractJwt, Strategy} from 'passport-jwt'
import {jsonwt} from '../config'

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT')
opts.secretOrKey = jsonwt.secretOrKey
const JWTStrategy = new Strategy(opts, function(jwtPayload, next){
    next(null, true)
})
passport.use(JWTStrategy)

// addStrategy(passport)

const API = Router()

API.use('/user', passport.authenticate('jwt',{session: false}), User)

API.post('/signin', Auth.signin)
API.post('/signup', Auth.signup)

export default API