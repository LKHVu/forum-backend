import {User} from '../models'
import {createJWT, getPwHash} from '../helpers'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

const upload = multer({storage, 
    onFileUploadStart: (file) => {
        console.log(file.originalname + ' is starting ...')
    },
})

exports.create = async (req, res) => {
    const {password, email, name} = req.body
    const hashedPw = getPwHash(password)

    if (await isExisted(name)){ // why is this a promise ???
        return res.status(500).json({"error": "Username existed"})
    }
    if (await isExisted(email)){
        return res.status(500).json({"error": "Email existed"})
    }

    const newUser = new User({
        name,
        email,
        password: hashedPw
    })

    try {
        let savedUser = await newUser.save()
        const token = createJWT(savedUser)
        res.status(201).json({"error": 'User Created', token})
    } catch(err) {
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.getByName = async (req, res) => {
    const {name} = req.params
    try {
        const user = await User.findOne({name})
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
    const _id = req.params.id
    try {
        const user = await User.findOne({_id})
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
    const {name} = req.params
    try {
        const user = await User.deleteOne({name})
        res.status(200).json(user)
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.single = upload.single('avatar')

exports.addAvatar = async (req, res) => {
    console.log(req)
    return res.status(500).send("abc")
}

async function isExisted(uniqueKey){
    let user
    try {
        if (validator.isEmail(uniqueKey)){
            user = await User.findOne({email: uniqueKey})
        } else {
            user = await User.findOne({name: uniqueKey})
        }
    } catch(err) {
        console.log(err)
    }
    if (!user){
        console.log("User not found")
        return false
    } else {
        console.log("User found")
        return true
    }
}



