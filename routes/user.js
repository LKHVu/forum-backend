import {Router} from 'express'
import {User} from '../controllers'

const router = Router()

router.get('/', User.getAll)

router.get('/:name', User.getByName)

router.post('/', User.create)

router.delete('/:name', User.delete)

// userRouter.put('/:name')

export default router
