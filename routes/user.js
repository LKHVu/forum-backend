import {Router} from 'express'
import {User} from '../controllers'

const userRouter = Router()

userRouter.get('/', User.getAll)

userRouter.get('/:name', User.getByName)

userRouter.post('/', User.create)

userRouter.delete('/:name', User.delete)

// userRouter.put('/:name')

export default userRouter
