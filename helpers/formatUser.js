const formatUser = user => ({
    name: user.name,
    email: user.email,
    myId: user._id
})

export default formatUser