const express = require('express')
const router = express.Router()

const User = require('../model/user')

const UserDAO = require('../data_access/user')
const userDAO = new UserDAO({ UserModel: User })

const UserService = require('../service/user')

const validateToken = require('../middlewares/validateToken')
const handleRequest = require('../middlewares/handleRequest')

module.exports = app => {
    app.use('/user', validateToken, router)

    const userService = new UserService({
        userDAO,
        cache: app.cache
    })

    router.get('/', handleRequest(() => userService.findAll()))
    router.get('/:id', handleRequest(req => userService.findById(req.params.id)))
    router.get('/account-number/:id', handleRequest(req => userService.findByAccountNumber(req.params.id)))
    router.get('/identity-number/:id', handleRequest(req => userService.findByIdentityNumber(req.params.id)))
    router.post('/', handleRequest(req => userService.create(req.body)))
    router.patch('/:id', handleRequest(req => userService.update(req.params.id, req.body)))
    router.delete('/:id', handleRequest(req => userService.delete(req.params.id)))
}