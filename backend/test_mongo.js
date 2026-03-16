const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms');
        console.log('CONNECTED_TO_MONGO');
        process.exit(0);
    } catch (err) {
        console.error('MONGO_ERROR: ' + err.message);
        process.exit(1);
    }
}
test();
