import {Router} from 'express'
import {Thread} from '../controllers'
import {requireLogin} from '../helpers'

const router = Router()

router.get('/', Thread.getAll)

router.get('/newest', Thread.getNewest)

router.get('/:id', Thread.getOne)

router.post('/', requireLogin, Thread.create)

router.put('/:id/downvote', requireLogin, Thread.downvote)

router.put('/:id/upvote', requireLogin, Thread.upvote)

router.put('/:id/unvote', requireLogin, Thread.unvote)

router.delete('/:id', requireLogin, Thread.delete)


// router.get('/newest/updated', Thread.getNewestUpdated)

// router.get('/newest/created', Thread.getNewestCreated)

export default router
