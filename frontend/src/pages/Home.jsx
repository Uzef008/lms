import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, User, Heart } from 'lucide-react';

const categories = ["All", "Web Development", "Python", "Java", "JavaScript", "React Development", "Database"];

const Home = () => {
    const { courses, toggleFavorite, favorites, user, setFavorites } = useContext(GlobalContext);
    const [filter, setFilter] = useState('All');

    const filteredCourses = filter === 'All'
        ? courses
        : courses.filter(c => c.category === filter);

    const handleFavorite = async (e, courseId) => {
        e.preventDefault();
        if (!user) return alert('Please login to add favorites');
        // For demo using context (optimistic update to avoid needing to sync immediately)
        // Normally you'd hit the API, let's just update local context
        let updated;
        if (favorites.find(f => f._id === courseId)) {
            updated = favorites.filter(f => f._id !== courseId);
        } else {
            const c = courses.find(cc => cc._id === courseId);
            updated = [...favorites, c];
        }
        setFavorites(updated);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
                    >
                        Level Up Your Skills with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">SkillForge</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl max-w-2xl text-indigo-100 mb-10"
                    >
                        Join millions of learners from around the world. Master new skills, build real projects, and launch your career.
                    </motion.p>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }}>
                        <button className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-indigo-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Start Learning Now
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Courses List Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-gray-900">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Courses</h2>

                {/* Categories */}
                <div className="flex overflow-x-auto space-x-2 pb-6 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition ${filter === cat
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredCourses.map((course, idx) => {
                        const isFav = favorites.find(f => f._id === course._id);
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={course._id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 overflow-hidden flex flex-col group"
                            >
                                <Link to={`/course/${course._id}`} className="relative block h-48 overflow-hidden">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <button
                                        onClick={(e) => handleFavorite(e, course._id)}
                                        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition"
                                    >
                                        <Heart className={`h-5 w-5 ${isFav ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                                    </button>
                                </Link>

                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex items-center space-x-1 mb-2">
                                        <span className="text-xs font-semibold px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md">
                                            {course.category}
                                        </span>
                                    </div>
                                    <Link to={`/course/${course._id}`}>
                                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition">
                                            {course.title}
                                        </h3>
                                    </Link>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center text-sm text-gray-500 mb-4 mt-auto">
                                        <User className="h-4 w-4 mr-1" />
                                        <span className="truncate">{course.instructor}</span>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                            <span className="ml-1 font-bold text-gray-700">{course.rating}</span>
                                            <span className="text-xs text-gray-400 ml-1">({course.numOfReviews})</span>
                                        </div>
                                        <div className="font-extrabold text-lg text-gray-900">
                                            {course.isFree ? (
                                                <span className="text-green-600">Free</span>
                                            ) : (
                                                `$${course.price}`
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
