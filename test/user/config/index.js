const StandardError = require('../../../helper/StandardError')

const mockUser = {
    userName: 'db_username',
    accountNumber: 123,
    emailAddress: 'db@mail.co',
    identityNumber: 456
}

const mockUserCache = {
    userName: 'cache_username',
    accountNumber: 135,
    emailAddress: 'cache@mail.co',
    identityNumber: 246
}

const errorResponse = new StandardError({
    statusCode: 500,
    message: 'unexpected error'
})

const defaultParams = {
    userDAO: {
        findAll: () => Promise.resolve(mockUser),
        findById: () => Promise.resolve(mockUser),
        findByAccountNumber: () => Promise.resolve(mockUser),
        findByIdentityNumber: () => Promise.resolve(mockUser),
        create: () => Promise.resolve(mockUser),
        update: () => Promise.resolve(mockUser),
        delete: () => { }
    },
    cache: {
        get: () => Promise.resolve(JSON.stringify(mockUserCache)),
        set: () => { },
        del: () => { }
    }
}

const mockUserModel = {
    find: () => Promise.resolve(mockUser),
    findById: () => Promise.resolve(mockUser),
    findOne: () => Promise.resolve(mockUser),
    create: () => Promise.resolve(mockUser),
    findByIdAndUpdate: () => Promise.resolve(mockUser),
    findByIdAndDelete: () => Promise.resolve(mockUser)
}

module.exports = {
    mockUser,
    mockUserCache,
    errorResponse,
    defaultParams,
    mockUserModel
}