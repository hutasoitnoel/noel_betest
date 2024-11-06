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

const mockListCache = [
    "users:page:1_limit:10",
    "users:page:2_limit:10",
    "users:page:3_limit:10",
]

const defaultParams = {
    userDAO: {
        findAll: () => Promise.resolve({
            data: mockUser,
            totalDocuments: 10
        }),
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
        del: () => { },
        keys: () => Promise.resolve(mockListCache)
    }
}

const mockUserModel = {
    find() {
        return {
            skip(num) {
                this.skipValue = num;
                return this;
            },
            limit(num) {
                this.limitValue = num;
                return Promise.resolve(mockUser);
            }
        };
    },
    findById: () => Promise.resolve(mockUser),
    findOne: () => Promise.resolve(mockUser),
    create: () => Promise.resolve(mockUser),
    findByIdAndUpdate: () => Promise.resolve(mockUser),
    findByIdAndDelete: () => Promise.resolve(mockUser),
    countDocuments: () => Promise.resolve(10)
}

module.exports = {
    mockUser,
    mockUserCache,
    mockListCache,
    errorResponse,
    defaultParams,
    mockUserModel
}