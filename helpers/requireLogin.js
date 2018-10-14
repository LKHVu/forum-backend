import passport from 'passport'

const requireLogin = passport.authenticate('jwt', {session: false})

export default requireLogin