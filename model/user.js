const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'userName is a required field'],
        unique: true,
        maxlength: [20, 'username should not exceed 20 characters'],
        match: [/^[a-zA-Z0-9]+$/, 'username must be alphanumeric']
    },
    accountNumber: {
        type: Number,
        required: [true, 'accountNumber is a required field'],
        unique: true,
        validate: {
            validator: value => {
                return value.toString().length === 10;
            },
            message: () => `account number must have 10 digits`
        }
    },
    emailAddress: {
        type: String,
        required: [true, 'emailAddress is a required field'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'invalid email']
    },
    identityNumber: {
        type: Number,
        required: [true, 'identityNumber is a required field'],
        unique: true,
        validate: {
            validator: value => {
                return value.toString().length === 16;
            },
            message: () => `identity number must have 16 digits`
        }
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User