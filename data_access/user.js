const StandardError = require('../helper/standardError')

class UserDAO {
    constructor({ UserModel }) {
        this.model = UserModel
    }

    async findAll({ page, limit }) {
        try {
            const skip = (page - 1) * limit

            const data = await this.model
                .find()
                .skip(skip)
                .limit(limit)

            const totalDocuments = await this.model.countDocuments()

            return {
                data,
                totalDocuments
            }
        } catch (error) {
            throw error
        }
    }

    async findById(id) {
        try {
            const result = await this.model.findById(id);

            if (!result) {
                throw new StandardError({
                    statusCode: 404,
                    message: `User with ID: ${id} not found`
                });
            }

            return result;
        } catch (error) {
            throw error;
        }
    }

    async findByAccountNumber(id) {
        try {
            const result = await this.model.findOne({ accountNumber: id })

            if (!result) {
                throw new StandardError({
                    statusCode: 404,
                    message: `User with account number: ${id} not found`
                })
            }

            return result
        } catch (error) {
            throw error
        }

    }

    async findByIdentityNumber(id) {
        try {
            const result = await this.model.findOne({ identityNumber: id })

            if (!result) {
                throw new StandardError({
                    statusCode: 404,
                    message: `User with identity number: ${id} not found`
                })
            }

            return result
        } catch (error) {
            throw error
        }
    }

    async create(data) {
        try {
            return await this.model.create(data)
        } catch (error) {
            if (error.code === 11000) {
                const key = Object.keys(error.keyValue)[0];
                const value = error.keyValue[key]

                throw new StandardError({
                    statusCode: 409,
                    message: `${key}: ${value} is already taken`
                })
            }

            throw error;
        }
    }

    async update(id, data) {
        try {
            return await this.model.findByIdAndUpdate(
                id,
                data,
                {
                    new: true,
                    runValidators: true
                })
        } catch (error) {
            if (error.code === 11000) {
                const key = Object.keys(error.keyValue)[0];
                const value = error.keyValue[key]

                throw new StandardError({
                    statusCode: 409,
                    message: `${key}: ${value} is already taken`
                })
            }

            throw error;
        }

    }

    async delete(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);

            if (!result) {
                throw new StandardError({
                    statusCode: 404,
                    message: `User with ID: ${id} not found`
                });
            }

            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserDAO