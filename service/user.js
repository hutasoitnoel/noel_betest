const invalidateUserCache = require("../helper/invalidateUserCache")
const validateUserCache = require("../helper/validateUserCache")

class UserService {
    constructor({ userDAO, cache }) {
        this.userDAO = userDAO
        this.cache = cache
    }

    async findAll({ page = 1, limit = 10 }) {
        const { data, totalDocuments } = await this.userDAO.findAll({ page, limit })

        return {
            currentPage: Number(page),
            pageLimit: Number(limit),
            totalDocuments,
            totalPages: Math.ceil(totalDocuments / limit),
            data
        };
    }

    async findById(userId) {
        const cachedData = await this.cache.get(`user:id:${userId}`)
        if (cachedData) {
            return JSON.parse(cachedData)
        }

        const user = await this.userDAO.findById(userId)
        if (user) {
            await validateUserCache(this.cache, user)
        }
        return user
    }

    async findByAccountNumber(accountNumber) {
        const userId = await this.cache.get(`user:accountNumber:${accountNumber}`)

        if (userId) {
            const cacheData = await this.cache.get(`user:id:${userId}`)
            return JSON.parse(cacheData)
        }

        const user = await this.userDAO.findByAccountNumber(accountNumber)
        if (user) {
            await validateUserCache(this.cache, user)
        }

        return user
    }

    async findByIdentityNumber(identityNumber) {
        const userId = await this.cache.get(`user:identityNumber:${identityNumber}`)
        if (userId) {
            const cacheData = await this.cache.get(`user:id:${userId}`)
            return JSON.parse(cacheData)
        }

        const user = await this.userDAO.findByIdentityNumber(identityNumber)
        if (user) {
            await validateUserCache(this.cache, user)
        }

        return user
    }

    async create(data) {
        return await this.userDAO.create(data)
    }

    async update(id, data) {
        const updatedUser = await this.userDAO.update(id, data);

        await invalidateUserCache(this.cache, id)

        return updatedUser;
    }

    async delete(id) {
        await this.userDAO.delete(id)

        await invalidateUserCache(this.cache, id)

        return {
            message: `User: ${id} successfully deleted`
        }
    }
}

module.exports = UserService