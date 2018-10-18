import {Router} from 'express'
import {Subforum} from '../controllers'
import {requireLogin, requireAdmin} from '../helpers'

const router = Router()

router.get('/', Subforum.getAll)

router.get('/:id', Subforum.getOne)

router.get('/:id/newest', Subforum.getNewest)
router.get('/:id/popular', Subforum.getPopular)
router.get('/:id/rating', Subforum.getRating)
router.get('/:id/replied', Subforum.getReplied)

router.post('/', requireLogin, requireAdmin, Subforum.create)

router.delete('/:id', requireLogin, requireAdmin, Subforum.delete)

export default router
