import {Router} from 'express'
import User from './user'
import Thread from './thread'
import Comment from './comment'
import {Auth} from '../controllers'
import {requireLogin, requireAdmin} from '../helpers'

const API = Router()

API.use('/user', requireLogin, requireAdmin, User)
API.use('/thread', Thread)
API.use('/comment', Comment)

API.post('/signin', Auth.signin)
API.post('/signup', Auth.signup)

export default API