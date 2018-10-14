export default function(req, res, next){
    if (req.user.isAdmin){
        next()
    } else {
        res.status(500).json({"error": "You are not admin"})
    }
}