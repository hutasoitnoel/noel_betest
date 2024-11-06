const invalidateListCache = require("../helper/invalidateListCache")
const invalidateUserCache = require("../helper/invalidateUserCache")
const validateUserCache = require("../helper/validateUserCache")

class UserService {
    constructor({ userDAO, cache }) {
        this.userDAO = userDAO
        this.cache = cache
    }

    async findAll({ page = 1, limit = 10 }) {
        const cacheKey = `users:page:${page}_limit:${limit}`
        const cachedData = await this.cache.get(cacheKey)
        if (cachedData) {
            return JSON.parse(cachedData)
        }

        const { data, totalDocuments } = await this.userDAO.findAll({ page, limit })

        const result = {
            currentPage: Number(page),
            pageLimit: Number(limit),
            totalDocuments,
            totalPages: Math.ceil(totalDocuments / limit),
            data
        };

        await this.cache.set(cacheKey, JSON.stringify(result), { EX: 3600 })

        return result
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
        const result = await this.userDAO.create(data)

        await invalidateListCache(this.cache)

        return result
    }

    async update(id, data) {
        const updatedUser = await this.userDAO.update(id, data);

        await invalidateUserCache(this.cache, id)
        await invalidateListCache(this.cache)

        return updatedUser;
    }

    async delete(id) {
        await this.userDAO.delete(id)

        await invalidateUserCache(this.cache, id)
        await invalidateListCache(this.cache)

        return {
            message: `User: ${id} successfully deleted`
        }
    }
}

module.exports = UserService