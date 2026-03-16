const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart');
        res.json(user.cart);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.addToCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const courseId = req.params.id;

        if (!user.cart.includes(courseId)) {
            user.cart.push(courseId);
            await user.save();
        }
        res.json(user.cart);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const courseId = req.params.id;

        user.cart = user.cart.filter(id => id.toString() !== courseId);
        await user.save();

        res.json(user.cart);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.checkoutCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // Add cart items to myLearning, ignoring duplicates
        user.cart.forEach(courseId => {
            if (!user.myLearning.includes(courseId)) {
                user.myLearning.push(courseId);
            }
        });

        // Clear the cart
        user.cart = [];
        await user.save();

        // Also update the Course model's students array for each purchased course
        const Course = require('../models/Course');
        for (const courseId of user.myLearning) {
            const course = await Course.findById(courseId);
            if (course && !course.students.includes(user._id)) {
                course.students.push(user._id);
                await course.save();
            }
        }

        res.json({ success: true, myLearning: user.myLearning, cart: user.cart });
    } catch (error) { res.status(500).json({ message: error.message }); }
};
