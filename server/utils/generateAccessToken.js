const jwt = require('jsonwebtoken')
module.exports.generateAccessToken = (email) => {
    return jwt.sign({email},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN
    })
}