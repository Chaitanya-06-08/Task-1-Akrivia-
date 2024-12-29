const jwt = require('jsonwebtoken')
module.exports.generateRefreshToken = (email) => {
    return jwt.sign({email},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN
    })
}