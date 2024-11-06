const jwt = require('jsonwebtoken')

class AuthService {
    createToken() {
        return jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}

module.exports = AuthService