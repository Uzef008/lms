import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import { Heart, Star, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Favorites = () => {
    const { favorites, toggleFavorite } = useContext(GlobalContext);

    const removeFavorite = async (courseId) => {
        await toggleFavorite(courseId);
    };

    return (
        <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8">My Favorites</h1>

                {favorites.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-8 space-y-4"
                    >
                        <Heart className="h-20 w-20 text-pink-200" />
                        <p className="text-xl text-gray-500 font-medium">Your wishlist is empty.</p>
                        <p className="text-gray-400 mb-6">Explore our courses and save your favorites here.</p>
                        <Link to="/" className="inline-flex items-center bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition shadow-lg hover:shadow-xl transform active:scale-95">
                            Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {favorites.map((course, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}
                                    key={course._id}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 overflow-hidden flex flex-col group"
                                >
                                    <Link to={`/course/${course._id}`} className="relative h-48 overflow-hidden block">
                                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                        <button
                                            onClick={(e) => { e.preventDefault(); removeFavorite(course._id); }}
                                            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition"
                                        >
                                            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                                        </button>
                                    </Link>

                                    <div className="p-6 flex flex-col flex-1">
                                        <Link to={`/course/${course._id}`}>
                                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition">
                                                {course.title}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-gray-500 mb-4 font-medium">By {course.instructor}</p>

                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                                <span className="ml-1 font-bold text-gray-700">{course.rating}</span>
                                            </div>
                                            <div className="font-extrabold text-lg text-indigo-600">
                                                {course.isFree ? 'Free' : `$${course.price}`}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
