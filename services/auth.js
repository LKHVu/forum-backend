import {User} from '../models'
import validator from 'validator'

exports.isExisted = async (uniqueKey) => {
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