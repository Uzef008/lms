const express = require('express');
const router = express.Router();
const {
    getCourses,
    getCourseById,
    createCourse,
    toggleFavorite,
    enrollCourse,
    updateCourse,
    deleteCourse,
    createCourseReview
} = require('../controllers/courseController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getCourses)
    .post(protect, admin, createCourse);

router.route('/:id/reviews').post(protect, createCourseReview);

router.route('/:id')
    .get(getCourseById)
    .put(protect, admin, updateCourse)
    .delete(protect, admin, deleteCourse);

router.route('/:id/favorite').post(protect, toggleFavorite);
router.route('/:id/enroll').post(protect, enrollCourse);

module.exports = router;
