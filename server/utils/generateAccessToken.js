const jwt = require('jsonwebtoken')
module.exports.generateAccessToken = (id) => {
    return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN
    })
}