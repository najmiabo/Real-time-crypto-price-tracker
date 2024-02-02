const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers
        console.log(access_token, "askjdaskd")
        if (!access_token) {
            throw { name: 'Unauthenticated' }
        }

        const payload = verifyToken(access_token)

        const user = await User.findByPk(payload.id)
        if (!user) {
            throw { name: 'Unauthenticated' }
        }

        req.user = {
            id: user.id,
            email: user.email
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication