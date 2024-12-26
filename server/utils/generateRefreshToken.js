const jwt = require('jsonwebtoken')
module.exports.generateRefreshToken = (id) => {
    return jwt.sign({id},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN
    })
}