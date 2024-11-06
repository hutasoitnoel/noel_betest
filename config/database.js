const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
        });
        console.log('connected to DB');
    } catch (error) {
        console.log('error connecting to DB');
        process.exit(1);
    }
};

module.exports = connectDB;
