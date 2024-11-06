const express = require('express')
const router = express.Router()

const AuthService = require('../service/auth')
const authService = new AuthService()

module.exports = app => {
    app.use('/auth', router)

    router.post('/', (req, res) => {
        const token = authService.createToken()
        res.status(200).json(token)
    })
}