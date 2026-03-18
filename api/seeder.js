const mongoose = require('mongoose');
const courses = require('./data/courses');
const Course = require('./models/Course');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms');


const importData = async () => {
    try {
        await Course.deleteMany();
        await User.deleteMany();

        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin', salt);

        await User.create({
            name: 'SkillForge Admin',
            email: 'admin@skillforge.com',
            password: hashedPassword,
            role: 'admin'
        });

        await Course.insertMany(courses);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
