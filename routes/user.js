import {Router} from 'express'
import {User} from '../controllers'
import {requireLogin, requireAdmin} from '../helpers'

const router = Router()

router.get('/', requireAdmin, User.getAll)

router.get('/:name', requireAdmin, User.getByName)

router.post('/', requireAdmin, User.create)

router.delete('/:name', requireAdmin, User.delete)

// router.post('/avatar', User.single, User.addAvatar)

router.put('/profile/password', User.changePassword)

router.put('/profile/email', User.changeEmail)


// userRouter.put('/:name')

export default router
