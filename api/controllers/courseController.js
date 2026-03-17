const Course = require('../models/Course');
const User = require('../models/User');

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) { res.json(course); }
        else { res.status(404).json({ message: 'Course not found' }); }
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.createCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.toggleFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const courseId = req.params.id;
        if (user.favorites.includes(courseId)) {
            user.favorites = user.favorites.filter(c => c.toString() !== courseId);
        } else {
            user.favorites.push(courseId);
        }
        await user.save();
        res.json(user.favorites);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.enrollCourse = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const courseId = req.params.id;
        if (!user.myLearning.includes(courseId)) {
            user.myLearning.push(courseId);
            await user.save();
        }
        const course = await Course.findById(courseId);
        if (!course.students.includes(user._id)) {
            course.students.push(user._id);
            await course.save();
        }
        res.json(user.myLearning);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            Object.assign(course, req.body);
            const updatedCourse = await course.save();
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            await Course.deleteOne({ _id: course._id });
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.createCourseReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const course = await Course.findById(req.params.id);

        if (course) {
            const alreadyReviewed = course.reviews.find(
                r => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                return res.status(400).json({ message: 'Course already reviewed by you' });
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            course.reviews.push(review);
            course.numOfReviews = course.reviews.length;
            course.rating = course.reviews.reduce((acc, item) => item.rating + acc, 0) / course.reviews.length;

            await course.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) { res.status(500).json({ message: error.message }); }
};
