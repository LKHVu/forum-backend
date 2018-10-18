import {Subforum, Thread} from '../models'

exports.create = async (req, res) => {
    const {title, description} = req.body
    if (await isExisted(title)){ // why is this a promise ???
        return res.status(500).send({"error": "Subforum existed"})
    }
    if (!title || !description){
        return res.status(500).send({"error": "Title or description is empty"})
    }

    const newSubforum = new Subforum({
        title,
        description
    })

    try {
        const savedSubforum = await newSubforum.save()
        res.status(200).json({"success": 'Subforum Created', savedSubforum})
    } catch(err) {
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.getOne = async (req, res) => {
    const {id} = req.params
    try {
        const subforum = await Subforum.findById(id)
        if (!subforum){
            res.status(500).json({"error": "Subforum not found"})
        } else {
            res.status(200).json(subforum)
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.getAll = async (req, res) => {
    try {
        const subforums = await Subforum.find({})
        res.status(200).json(subforums)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.delete = async (req, res) => {
    const {id} = req.params
    try {
        const subforum = await Subforum.findByIdAndDelete(id)
        res.status(200).json(subforum)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.getNewest = async (req, res) => {
    const subforum = req.params.id
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
    const threads = await Thread.paginate({subforum}, options)
    res.status(200).send(threads)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occurred", err})
    }
}

exports.getPopular = async (req, res) => {
    const subforum = req.params.id
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
    const threads = await Thread.paginate({subforum}, options)
    res.status(200).send(threads)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occurred", err})
    }
}

exports.getRating = async (req, res) => {
    const subforum = req.params.id
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
    const threads = await Thread.paginate({subforum}, options)
    res.status(200).send(threads)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occurred", err})
    }
}

exports.getReplied = async (req, res) => {
    const subforum = req.params.id
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const options = {
        sort: {commentCounts: -1},
        lean: true,
        populate: {'path': 'author', select: ['name', '_id']},
        page,
        limit
    }
    try {
    const threads = await Thread.paginate({subforum}, options)
    res.status(200).send(threads)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occurred", err})
    }
}

async function isExisted(title){
    try {
        subforum = await Subforum.findOne({title})
        if (!subforum){
            return false
        } else {
            return true
        }    
    } catch(err) {
        console.log(err)
        return false
    }
}
