const expect = require('expect.js')

const UserDAO = require("../data_access/user")

const StandardError = require('../helper/standardError')

const {
    mockUser,
    errorResponse,
    defaultParams,
    mockUserModel
} = require('./user/config')

const userDAO = new UserDAO({
    UserModel: mockUserModel
})

describe('userDAO test', () => {
    describe('findAll test', () => {
        it('should return a user', async () => {
            const result = await userDAO.findAll()
            expect(result).to.eql(mockUser)
        })
    })

    describe('findById test', () => {
        it('should return user', async () => {
            const result = await userDAO.findById()
            expect(result).to.eql(mockUser)
        })

        it('should throw user id not found', async () => {
            const id = 123

            const userDAOWithEmptyResult = new UserDAO({
                ...defaultParams,
                UserModel: {
                    findById: () => { }
                }
            })

            try {
                await userDAOWithEmptyResult.findById(id)
            } catch (error) {
                const expectedError = new StandardError({
                    statusCode: 404,
                    message: `User with ID: ${id} not found`
                })

                expect(error).to.eql(expectedError)
            }
        })

        it('should throw unexpected error', async () => {
            const userDAOWithError = new UserDAO({
                ...defaultParams,
                UserModel: {
                    findById: () => Promise.reject(errorResponse)
                }
            })

            try {
                await userDAOWithError.findById()
            } catch (error) {
                expect(error).to.eql(errorResponse)
            }
        })
    })

    describe('findByAccountNumber test', () => {
        it('should return user', async () => {
            const result = await userDAO.findByAccountNumber()
            expect(result).to.eql(mockUser)
        })

        it('should throw user id not found', async () => {
            const id = 123

            const userDAOWithEmptyResult = new UserDAO({
                ...defaultParams,
                UserModel: {
                    findOne: () => { }
                }
            })

            try {
                await userDAOWithEmptyResult.findByAccountNumber(id)
            } catch (error) {
                const expectedError = new StandardError({
                    statusCode: 404,
                    message: `User with account number: ${id} not found`
                })

                expect(error).to.eql(expectedError)
            }
        })

        it('should throw unexpected error', async () => {
            const userDAOWithError = new UserDAO({
                ...defaultParams,
                UserModel: {
                    findOne: () => Promise.reject(errorResponse)
                }
            })

            try {
                await userDAOWithError.findByAccountNumber()
            } catch (error) {
                expect(error).to.eql(errorResponse)
            }
        })
    })

    describe('findByIdentityNumber test', () => {
        it('should return user', async () => {
            const result = await userDAO.findByIdentityNumber()
            expect(result).to.eql(mockUser)
        })

        it('should throw user id not found', async () => {
            const id = 123

            const userDAOWithEmptyResult = new UserDAO({
                ...defaultParams,
                UserModel: {
                    findOne: () => { }
                }
            })

            try {
                await userDAOWithEmptyResult.findByIdentityNumber(id)
            } catch (error) {
                const expectedError = new StandardError({
                    statusCode: 404,
                    message: `User with identity number: ${id} not found`
                })

                expect(error).to.eql(expectedError)
            }
        })

        it('should throw unexpected error', async () => {
            const userDAOWithError = new UserDAO({
                ...defaultParams,
                UserModel: {
                    findOne: () => Promise.reject(errorResponse)
                }
            })

            try {
                await userDAOWithError.findByIdentityNumber()
            } catch (error) {
                expect(error).to.eql(errorResponse)
            }
        })
    })

    describe('create test', () => {
        it('should return user', async () => {
            const result = await userDAO.create()
            expect(result).to.eql(mockUser)
        })

        it('should throw duplicate error', async () => {
            const errorObj = {
                code: 11000,
                keyValue: {
                    userName: 'test username'
                }
            }

            const userDAOWithDuplicateError = new UserDAO({
                ...defaultParams,
                UserModel: {
                    create: () => Promise.reject(errorObj)
                }
            })

            try {
                await userDAOWithDuplicateError.create()
            } catch (error) {
                const expectedError = new StandardError({
                    statusCode: 409,
                    message: `${Object.keys(errorObj.keyValue)[0]}: ${errorObj.keyValue.key} is already taken`
                })

                expect(error).to.eql(expectedError)
            }
        })

        it('should throw unexpected error', async () => {
            const userDAOWithError = new UserDAO({
                ...defaultParams,
                UserModel: {
                    create: () => Promise.reject(errorResponse)
                }
            })

            try {
                await userDAOWithError.create()
            } catch (error) {
                expect(error).to.eql(errorResponse)
            }
        })
    })

    describe('update test', () => {
        it('should return user', async () => {
            const result = await userDAO.update()
            expect(result).to.eql(mockUser)
        })

        it('should throw duplicate error', async () => {
            const errorObj = {
                code: 11000,
                keyValue: {
                    userName: 'test username'
                }
            }

            const userDAOWithDuplicateError = new UserDAO({
                ...defaultParams,
                UserModel: {
                    findByIdAndUpdate: () => Promise.reject(errorObj)
                }
            })

            try {
                await userDAOWithDuplicateError.update()
            } catch (error) {
                const expectedError = new StandardError({
                    statusCode: 409,
                    message: `${Object.keys(errorObj.keyValue)[0]}: ${errorObj.keyValue.key} is already taken`
                })

                expect(error).to.eql(expectedError)
            }
        })

        it('should throw unexpected error', async () => {
            const userDAOWithError = new UserDAO({
                ...defaultParams,
                UserModel: {
                    findByIdAndUpdate: () => Promise.reject(errorResponse)
                }
            })

            try {
                await userDAOWithError.update()
            } catch (error) {
                expect(error).to.eql(errorResponse)
            }
        })
    })
    
    describe('delete test', () => {
        it('should return user', async () => {
            const result = await userDAO.delete()
            expect(result).to.eql(mockUser)
        })

        it('should throw not found error', async () => {
            const id = 432

            const userDAOWithNotFoundError = new UserDAO({
                ...defaultParams,
                UserModel: {
                    findByIdAndDelete: () => {}
                }
            })

            try {
                await userDAOWithNotFoundError.delete(id)
            } catch (error) {
                const expectedError = new StandardError({
                    statusCode: 404,
                    message: `User with ID: ${id} not found`
                })

                expect(error).to.eql(expectedError)
            }
        })

        it('should throw unexpected error', async () => {
            const userDAOWithError = new UserDAO({
                ...defaultParams,
                UserModel: {
                    findByIdAndDelete: () => Promise.reject(errorResponse)
                }
            })

            try {
                await userDAOWithError.delete()
            } catch (error) {
                expect(error).to.eql(errorResponse)
            }
        })
    })
})