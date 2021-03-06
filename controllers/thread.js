import {Thread, Subforum} from '../models'

exports.getOne = async (req, res) => {
    const {id} = req.params 
    try {
        const query = [{'path': 'author', 'select': ['name', 'avatar', 'id']}, {'path': 'comments'}]
        const thread = await Thread.findById(id)
            .populate(query)
        console.log(thread._id)
        thread.views++
        thread.save()

        res.status(200).json(thread)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.getAll = async (req, res) => {
    try {
        const query = [{'path': 'author', 'select': ['name', 'email']}, {'path': 'comments'}]
        const threads = await Thread.find({})
            // .populate(query)
        res.status(200).json(threads)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.create = async (req, res) => {
    const author = req.user._id

    const {title, subforum, content, tags, model, type, problem} = req.body
    if (!subforum){
        return res.status(500).json({"error": "Please select a subforum"})
    }
    try {   
        const currentSubforum = await Subforum.findById(subforum)
        if (!currentSubforum){
            return res.json(500).json({"error" : "Subforum not found"})
        }
        const newThread = new Thread({
            author,
            title,
            subforum,
            content,
            model,
            type,
            problem
        })
        const savedThread = await newThread.save()
        currentSubforum.threads.push(savedThread)
        currentSubforum.threadCount = currentSubforum.threads.length
        currentSubforum.save()
        res.status(200).json(savedThread)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.delete = async (req, res) => {
    const _id = req.params.id
    const author = req.user._id
    try {
        const thread = await Thread.findOneAndDelete({_id, author})
        if (!thread){
            return res.status(200).json({"error": "Could not delete thread"})
        }
        console.log(thread)
        res.status(200).json({"success": "Thread deleted"})
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occured", err})
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
        res.status(500).json({"error": "An error occured", err})
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
        res.status(500).json({"error": "An error occured", err})
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
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.getNewest = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const options = {
        sort: {createdAt: -1},
        lean: true,
        populate: {'path': 'author', select: ['name', '_id']},
        page,
        limit
    }
    try {
    const threads = await Thread.paginate({}, options)
    res.status(200).send(threads)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occurred", err})
    }
}

exports.getPopular = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const options = {
        sort: {views: -1},
        lean: true,
        populate: {'path': 'author', select: ['name', '_id']},
        page,
        limit
    }
    try {
    const threads = await Thread.paginate({}, options)
    res.status(200).send(threads)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occurred", err})
    }
}

exports.getRating = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const options = {
        sort: {score: -1},
        lean: true,
        populate: {'path': 'author', select: ['name', '_id']},
        page,
        limit
    }
    try {
    const threads = await Thread.paginate({}, options)
    res.status(200).send(threads)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occurred", err})
    }
}

exports.getReplied = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const options = {
        sort: {commentCount: -1},
        lean: true,
        populate: {'path': 'author', select: ['name', '_id']},
        page,
        limit
    }
    try {
    const threads = await Thread.paginate({}, options)
    res.status(200).send(threads)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occurred", err})
    }
}

exports.getOwnedThreads = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const options = {
        sort: {date: -1},
        lean: true,
        populate: {'path': 'author', select: ['name', '_id']},
        page,
        limit
    }
    try {
    const threads = await Thread.paginate({}, options)
    res.status(200).send(threads)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occurred", err})
    }
}
