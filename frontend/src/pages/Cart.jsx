import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
    const { cart, removeFromCart, user, checkoutCart } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const total = cart.reduce((acc, course) => acc + Number(course.price), 0);

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            const success = await checkoutCart();
            if (success) {
                navigate('/mylearning');
            } else {
                alert('Payment failed');
            }
        } catch (error) {
            console.error(error);
            alert('Payment failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center space-y-4"
                    >
                        <ShoppingCart className="h-16 w-16 text-indigo-200" />
                        <p className="text-xl text-gray-500 font-medium h-48">Your cart is empty.</p>
                        <p className="text-gray-400 mb-6">Explore our courses and start learning today!</p>
                        <Link to="/" className="inline-flex items-center text-indigo-600 bg-indigo-50 px-6 py-3 rounded-full font-bold hover:bg-indigo-100 transition shadow-sm">
                            Keep Shopping <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-3">
                            <p className="font-semibold text-gray-600 mb-4">{cart.length} Course{cart.length > 1 ? 's' : ''} in Cart</p>
                            <div className="space-y-4">
                                {cart.map((course) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                        key={course._id}
                                        className="flex flex-col sm:flex-row items-center border border-gray-100 bg-white p-4 rounded-2xl hover:shadow-md transition group"
                                    >
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full sm:w-48 h-32 object-cover rounded-xl shadow-sm"
                                        />
                                        <div className="ml-0 sm:ml-6 flex-1 mt-4 sm:mt-0 w-full sm:w-auto">
                                            <Link to={`/course/${course._id}`} className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition block mb-1">
                                                {course.title}
                                            </Link>
                                            <p className="text-sm text-gray-500 font-medium group-hover:text-gray-700 transition">By {course.instructor}</p>
                                        </div>

                                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 px-4 sm:px-0 h-full">
                                            <div className="text-indigo-600 font-extrabold text-2xl tracking-tight">
                                                {course.isFree ? 'Free' : `$${course.price}`}
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(course._id)}
                                                className="text-gray-400 hover:text-red-500 flex items-center text-sm font-medium transition sm:mt-4 bg-gray-50 px-3 py-1.5 rounded-lg group-hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl sticky top-24">
                                <h3 className="text-lg font-bold text-gray-500 mb-2 uppercase tracking-wider">Total</h3>
                                <div className="text-4xl font-extrabold text-gray-900 mb-6">${total.toFixed(2)}</div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform transition active:scale-95 disabled:opacity-50 flex items-center justify-center text-lg"
                                >
                                    {loading ? 'Processing...' : 'Checkout'}
                                </button>
                                <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
                                    30-day money-back guarantee. Safe & secure payment.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
