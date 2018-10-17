import {User} from '../models'
import {createJWT, getPwHash} from '../helpers'

exports.signin = async (req, res) => {
    const {name, password} = req.body
    try {
        const user = await User.findOne({name})
        if (!user){
            return res.status(500).json({"error": "User not found"})
        }
        if (password !== user.password){
            return res.status(500).json({"error": "Incorrect password"})
        }
        const data = user._doc
        const token = createJWT(data)
        return res.status(200).json({"success": "Login successfuly", token: "JWT " + token, data})

    } catch(err){
        console.log(err)
        res.status(500).json({"error": "An error occured", err})
    }
}

exports.signup = async (req, res) => {
    const {password, email, name} = req.body
    const hashedPw = getPwHash(password)

    if (await isExisted(name)){ // why is this a promise ???
        return res.status(500).send({"error": "Username existed"})
    }
    if (await isExisted(email)){
        return res.status(500).send({"error": "Email existed"})
    }

    const user = new User({
        name,
        email,
        password: hashedPw
    })

    try {
        let newUser = await user.save()
        const data = newUser._doc
        const token = createJWT(data)
        return res.status(201).json({"success": 'User Created', token, data})
    } catch(err) {
        return res.status(500).json({"error": "An error occured", err})
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
