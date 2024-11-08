const expect = require('expect.js')

const UserService = require("../service/user")

const {
    mockUserCache,
    mockUser,
    errorResponse,
    defaultParams
} = require('./user/config')

const userService = new UserService(defaultParams)

const userServiceWithNoCache = new UserService({
    ...defaultParams,
    cache: {
        get: () => { },
        set: () => { },
        del: () => { },
        keys: () => { }
    }
})

describe('userService test', () => {
    describe('findAll test', () => {
        it('should return list from cache', async () => {
            const result = await userService.findAll({})
            expect(result).to.eql(mockUserCache)
        })

        it('should return list from dao', async () => {
            const result = await userServiceWithNoCache.findAll({})
            expect(result).to.eql({
                currentPage: 1,
                data: mockUser,
                pageLimit: 10,
                totalDocuments: 10,
                totalPages: 1
            })
        })

        it('should throw an error', async () => {
            const userServiceWithError = new UserService({
                ...defaultParams,
                userDAO: {
                    findAll: () => Promise.reject(errorResponse)
                }
            })

            try {
                await userServiceWithError.findAll({})
            } catch (error) {
                expect(error).to.eql(errorResponse)

            }
        })
    })

    describe('findById test', () => {
        it('should return user from cache', async () => {
            const result = await userService.findById()
            expect(result).to.eql(mockUserCache)
        })

        it('should return user from dao', async () => {
            const result = await userServiceWithNoCache.findById()
            expect(result).to.eql(mockUser)
        })

        it('should return an error', async () => {
            const userServiceWithError = new UserService({
                ...defaultParams,
                userDAO: {
                    findById: () => Promise.reject(errorResponse)
                }
            })

            try {
                await userServiceWithError.findById()
            } catch (error) {
                expect(error).to.eql(errorResponse)
            }
        })
    })

    describe('findByAccountNumber test', () => {
        it('should return user from cache', async () => {
            const result = await userService.findByAccountNumber()
            expect(result).to.eql(mockUserCache)
        })

        it('should return user from dao', async () => {
            const result = await userServiceWithNoCache.findByAccountNumber()
            expect(result).to.eql(mockUser)
        })

        it('should return an error', async () => {
            const userServiceWithError = new UserService({
                ...defaultParams,
                userDAO: {
                    findByAccountNumber: () => Promise.reject(errorResponse)
                }
            })

            try {
                await userServiceWithError.findByAccountNumber()
            } catch (error) {
                expect(error).to.eql(errorResponse)
            }
        })
    })

    describe('findByIdentityNumber test', () => {
        it('should return user from cache', async () => {
            const result = await userService.findByIdentityNumber()
            expect(result).to.eql(mockUserCache)
        })

        it('should return user from dao', async () => {
            const result = await userServiceWithNoCache.findByIdentityNumber()
            expect(result).to.eql(mockUser)
        })

        it('should return an error', async () => {
            const userServiceWithError = new UserService({
                ...defaultParams,
                userDAO: {
                    findByIdentityNumber: () => Promise.reject(errorResponse)
                }
            })

            try {
                await userServiceWithError.findByIdentityNumber()
            } catch (error) {
                expect(error).to.eql(errorResponse)
            }
        })
    })

    describe('create test', () => {
        it('should return user', async () => {
            const result = await userService.create()
            expect(result).to.eql(mockUser)
        })

        it('should return an error', async () => {
            const userServiceWithError = new UserService({
                ...defaultParams,
                userDAO: {
                    create: () => Promise.reject(errorResponse)
                }
            })

            try {
                await userServiceWithError.create()
            } catch (error) {
                expect(error).to.eql(errorResponse)
            }
        })
    })

    describe('update test', () => {
        it('should return user', async () => {
            const result = await userService.update()
            expect(result).to.eql(mockUser)
        })

        it('should return an error', async () => {
            const userServiceWithError = new UserService({
                ...defaultParams,
                userDAO: {
                    update: () => Promise.reject(errorResponse)
                }
            })

            try {
                await userServiceWithError.update()
            } catch (error) {
                expect(error).to.eql(errorResponse)
            }
        })
    })

    describe('delete test', () => {
        it('should return user', async () => {
            const id = 123

            const result = await userService.delete(id)
            expect(result).to.eql({
                message: `User: ${id} successfully deleted`
            })
        })

        it('should return an error', async () => {
            const userServiceWithError = new UserService({
                ...defaultParams,
                userDAO: {
                    delete: () => Promise.reject(errorResponse)
                }
            })

            try {
                await userServiceWithError.delete()
            } catch (error) {
                expect(error).to.eql(errorResponse)
            }
        })
    })
})