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
    const id = req.params.id
    try {
        const user = await User.findById(id)
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

// exports.single = upload.single('avatar')

// exports.addAvatar = async (req, res) => {
//     console.log(req)
//     return res.status(500).send("abc")
// }

exports.changeEmail = async (req, res) => {
    const {name} = req.user
    const {email} = req.body
    if (!email){
        return res.status(500).json({"error": "Password not found"})
    }
    try {
        const user = await User.findOne({name})
        user.email = email
        const savedUser = await user.save()
        res.status(200).json({"success": "Email changed", email: savedUser.email})
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "an error occured", err})
    }
}

exports.changePassword = async (req, res) => {
    const {name} = req.user
    const {password} = req.body
    if (!password){
        return res.status(500).json({"error": "Password not found"})
    }
    const hashedPw = getPwHash(password)
    try {
        const user = await User.findOne({})
        user.password = hashedPw
        user.save()
        res.status(200).json({"success": "Password changed"})
    } catch(err) {
        console.log(err)
        res.status(500).json({"error": "an error occured", err})
    }
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



