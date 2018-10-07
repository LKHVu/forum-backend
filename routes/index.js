import {Router} from 'express'
import User from './user'

const API = Router()

API.use('/user', User)

export default API