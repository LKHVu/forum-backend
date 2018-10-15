import {Thread, Comment} from '../models'

exports.getOne = async (req, res) => {
    const {id} = req.params
    try {
        const comment = await Comment.findById(id).populate('author', 'name')
        res.status(200).json(comment)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.getAll = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate('author', 'name')
        res.status(200).json(comments)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.create = async (req, res) => {
    const author = req.user._id
    const {thread, content} = req.body
    try {
        const currentThread = await Thread.findById(thread)
        if (!currentThread){
            return res.status(500).json({"error" : "Thread not found"})
        }
        const newComment = new Comment({
            author,
            content,
            thread
        })
        
        const savedComment = await newComment.save()
        currentThread.comments.push(savedComment)
        currentThread.save()
        res.status(200).json({"success": "You posted a comment", savedComment})
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.delete = async (req, res) => {
    const {id} = req.params
    const author = req.user._id 
    try {
        const comment = await Comment.findOneAndDelete({_id: id, author})
        if (!comment){
            return res.status(200).json({"error": "Could not delete comment"})
        }
        console.log(comment)
        res.status(200).json({"success": "Comment deleted"})
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.upvote = async (req, res) => {
    const userId = req.user._id
    const {id} = req.params
    try {
        const comment = await Comment.findById(id)
        comment.downvotes.pull(userId)
        comment.upvotes.addToSet(userId)
        comment.score = comment.upvotes.length - comment.downvotes.length
        const savedComment = await comment.save()
        res.status(200).json({"success": "You up-voted", score: savedComment.score})
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.downvote = async (req, res) => {
    const userId = req.user._id
    const {id} = req.params
    try {
        const comment = await Comment.findById(id)
        comment.upvotes.pull(userId)
        comment.downvotes.addToSet(userId)
        comment.score = comment.upvotes.length - comment.downvotes.length
        const savedComment = await comment.save()
        res.status(200).json({"success": "You down-voted", score: savedComment.score})
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.unvote = async (req, res) => {
    const userId = req.user._id
    const {id} = req.params
    try {
        const comment = await Comment.findById(id)
        comment.downvotes.pull(userId)
        comment.upvotes.pull(userId)
        comment.score = comment.upvotes.length - comment.downvotes.length
        const savedComment = await comment.save()
        res.status(200).json({"success": "You unvoted", score: savedComment.score})
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}
