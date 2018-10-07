import {User} from '../models'
import {createJWT, getPwHash} from '../helpers'

exports.create = async (req, res) => {
    const hashedPw = getPwHash(req.body.password)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPw
    })
    try {
        let newUser = await user.save()
        const token = createJWT(user)
        res.status(201).json({message: 'User Created', token})
    } catch(err) {
        res.status(500).send(err)
    }
}

exports.getByName = async (req, res) => {
    console.log(req.params.name)
    try {
        const user = await User.findOne({name: req.params.name})
        if (!user){
            res.status(500).json({"Error": "User not found"})
        } else {
        res.status(200).json(user)
        }
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.getOne = async (req, res) => {
    console.log(req.params.id)
    try {
        const user = await User.findOne({_id: req.params.id})
        if (!user){
            res.status(500).json({"Error": "User not found"})
        } else {
        res.status(200).json(user)
        }
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.getAll = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const user = await User.deleteOne({_id: req.params.id})
        res.status(200).json(user)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }

}