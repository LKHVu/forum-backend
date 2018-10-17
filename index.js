import express from 'express'
import _ from 'lodash'
import bodyParser from 'body-parser'
import socketIo from 'socket.io'
import http from 'http'
import logger from 'morgan'
import cors from 'cors'
import passport from 'passport'
import API from './routes'
import {addStrategy} from './helpers'
import multer from 'multer'

const app = express()
addStrategy(passport)

app.use(passport.initialize())
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
app.use(express.static('public'))
app.use('/api', API)

app.listen(8000, () => {
    console.log("App is running")
})
// const server = http.createServer(app)
// const io = socketIo(server)

// io.on('connection', socket => {
//     console.log('New client connected to global')
//     socket.on('disconnect', () => console.log('Client disconnected'))
// })

// server.listen(8000, () => console.log('Server is running'))
