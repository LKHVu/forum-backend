import {Subforum} from '../models'
import {createJWT, getPwHash} from '../helpers'

exports.create = async (req, res) => {
    const {title, description} = req.body
    if (await isExisted(title)){ // why is this a promise ???
        return res.status(500).send({"error": "Subforum existed"})
    }

    const newUser = new User({
        title,
        description
    })

    try {
        let savedUser = await newUser.save()
        const token = createJWT(savedUser)
        res.status(201).json({"success": 'User Created', token})
    } catch(err) {
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.getByName = async (req, res) => {
    console.log(req.params.name)
    try {
        const user = await User.findOne({name: req.params.name})
        if (!user){
            res.status(500).json({"error": "User not found"})
        } else {
            res.status(200).json(user)
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.getOne = async (req, res) => {
    console.log(req.params.id)
    try {
        const user = await User.findOne({_id: req.params.id})
        if (!user){
            res.status(500).json({"error": "User not found"})
        } else {
            res.status(200).json(user)
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.getAll = async (req, res) => {
    console.log(req.user)
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.delete = async (req, res) => {
    try {
        const subforum = await Subforum.deleteOne({name: req.params.name})
        res.status(200).json(subforum)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occured", err})
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
