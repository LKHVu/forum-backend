import express from 'express'
import _ from 'lodash'
import passport from 'passport'
import {ExtractJwt, Strategy} from 'passport-jwt'
import bodyParser from 'body-parser'
import API from './routes'
import {database, jsonwt} from './config'
import socketIo from 'socket.io'
import http from 'http'
import logger from 'morgan'
import cors from 'cors'

const app = express()

const jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT')
jwtOptions.secretOrKey = jsonwt.secret

const jwtStrategy = new Strategy(jwtOptions, (jwt_payload, next) => {
    if (user){
        next(null, user)
    } else {
        next(null, false)
    }
})

passport.use(jwtStrategy)

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize())

app.use('/api', API)

const server = http.createServer(app)
const io = socketIo(server)

io.on('connection', socket => {
    console.log('New client connected to global')
    socket.on('disconnect', () => console.log('Client disconnected'))
})


server.listen(8000, () => console.log('Server is running'))
