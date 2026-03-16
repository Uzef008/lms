const express = require('express');
const router = express.Router();
const { getUsers, getCart, addToCart, removeFromCart, checkoutCart } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getUsers);

// Cart routes
router.get('/cart', protect, getCart);
router.post('/cart/:id', protect, addToCart);
router.delete('/cart/:id', protect, removeFromCart);

// Checkout
router.post('/checkout', protect, checkoutCart);

module.exports = router;
