import {Thread, Comment} from '../models'

exports.addComment = async (req, res) => {
    // const currentUser = req.user 
    // if (currentUser === null){
    //     return res.redirect('/signin')
    // }
    try {
        const thread = await Thread.findbyId(req.params.threadId)
        const {author, authorId, content, }
        const newComment = new Comment({
            content: req.body.content,
            threadId: req.params.threadId,
        })
        
        const savedComment = await newComment.save()
        thread.comments.push(savedComment)
        thread.save()

    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}