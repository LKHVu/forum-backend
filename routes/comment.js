import {Router} from 'express'
import {Comment} from '../controllers'
import {requireLogin} from '../helpers'

const router = Router()

router.get('/', Comment.getAll)

router.get('/:id', Comment.getOne)

router.post('/', requireLogin, Comment.create)

router.put('/:id/downvote', requireLogin, Comment.downvote)

router.put('/:id/upvote', requireLogin, Comment.upvote)

router.put('/:id/unvote', requireLogin, Comment.unvote)

router.delete('/:id', requireLogin, Comment.delete)

// // userRouter.put('/:name')

export default router
