const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
        });
        console.log('connected to DB');
    } catch (error) {
        console.log('error connecting to DB');
        process.exit(1);
    }
};

module.exports = connectDB;
