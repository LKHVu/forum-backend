import {Router} from 'express'
import {Subforum} from '../controllers'
import {requireLogin, requireAdmin} from '../helpers'

const router = Router()

router.get('/', Subforum.getAll)

router.get('/:id', Subforum.getOne)

router.post('/', requireLogin, requireAdmin, Subforum.create)

router.delete('/:id', requireLogin, requireAdmin, Subforum.delete)

export default router
