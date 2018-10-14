import {Thread} from '../models'

exports.getOne = async (req, res) => {
    const {id} = req.params
    try {
        const thread = await Thread.findById(id).populate('author', ['name', 'email'])
        res.status(200).json(thread)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.getAll = async (req, res) => {
    try {
        const threads = await Thread.find({}).populate('author', ['name', 'email'])
        res.status(200).json(threads)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.create = async (req, res) => {
    const author = req.user._id
    const {title, category, content, bikeType} = req.body
    try {   
        const newThread = new Thread({
            author,
            title,
            category,
            content,
            bikeType
        })
        const savedThread = await newThread.save()
        res.status(200).json(savedThread)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.delete = async (req, res) => {
    const {id} = req.params
    const {author} = req.user._id
    // const author = req.user._id 
    try {
        const thread = await Thread.findOneAndDelete({_id: id, author})
        if (!thread){
            return res.status(200).json({"error": "Could not delete thread"})
        }
        console.log(thread)
        res.status(200).json({"success": "Thread deleted"})
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.upvote = async (req, res) => {
    const userId = req.user._id
    const {id} = req.params
    try {
        const thread = await Thread.findById(id)
        console.log(thread)
        thread.downvotes.pull(userId)
        thread.upvotes.addToSet(userId)
        thread.score = thread.upvotes.length - thread.downvotes.length
        const savedThread = await thread.save()
        res.status(200).json({"success": "You up-voted", score: savedThread.score})
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.downvote = async (req, res) => {
    const userId = req.user._id
    const {id} = req.params
    try {
        const thread = await Thread.findById(id)
        thread.upvotes.pull(userId)
        thread.downvotes.addToSet(userId)
        thread.score = thread.upvotes.length - thread.downvotes.length
        const savedThread = await thread.save()
        res.status(200).json({"success": "You down-voted", score: savedThread.score})
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.unvote = async (req, res) => {
    const userId = req.user._id
    const {id} = req.params
    try {
        const thread = await Thread.findById(id)
        thread.downvotes.pull(userId)
        thread.upvotes.pull(userId)
        thread.score = thread.upvotes.length - thread.downvotes.length
        const savedThread = await thread.save()
        res.status(200).json({"success": "You unvoted", score: savedThread.score})
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}