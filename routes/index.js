import {Router} from 'express'
import User from './user'
import Thread from './thread'
import Comment from './comment'
import Subforum from './subforum'
import {Auth} from '../controllers'
import {requireLogin} from '../helpers'

const API = Router()

API.use('/user', requireLogin, User)
API.use('/thread', Thread)
API.use('/comment', Comment)
API.use('/subforum', Subforum)

API.post('/signin', Auth.signin)
API.post('/signup', Auth.signup)

export default API