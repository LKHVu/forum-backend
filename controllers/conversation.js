import {User, Conversation} from '../models'

exports.checkExistence = async(req, res) => {
    try {
        const user = await User.findById({_id: req.body.myId}).populate('conversations')
        const existConversations = user.conversations.filter(conversation => {
            return (
                conversation.userOneId === req.body.partnerId ||
                conversation.userTwoId === req.body.partnerId
            )
        })
        if (existConversations.length > 0){
            res.status(200).json({"Talked": 1})
        } else {
            res.status(200).json({"Talked": 0})
        }

    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.create = async (req, res) => {
    try {
        const user = await User.findById({_id: req.body.myId})
        const partner = await User.findById({_id: req.body.partnerId})
        const newConversation = new Conversation({
            userOneId: user._id,
            userTwoId: partner._id
        })
        savedConversation = await newConversation.save()
        user.conversations.push(savedConversation)
        user.save()
        partner.conversations.push(savedConversation)
        partner.save()
        res.status(200).json({ id: savedConversation._id, partnerId: partner._id})
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.loadMessages = async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.conversationId).populate('messages')
        if (conversation){
            res.status(200).json({id: conversation._id, messages: conversation.messages})
        } else {
            res.status(500).json({"Error": "Cannot find conversation"})
        }
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.createMessage = async (message) => {
    try {
    const conversation = await Conversation.findById(message.conversationId)
    const newMessage = new Message({
        text: message.text,
        userId: message.senderId
    })
    const savedMessage = await newMessage.save()
    conversation.messages.push(savedMessage)
    conversation.save()
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

