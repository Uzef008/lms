import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, Trophy, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MyLearning = () => {
    const { myLearning } = useContext(GlobalContext);

    return (
        <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8">My Learning</h1>

                {myLearning.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-8 space-y-4"
                    >
                        <BookOpen className="h-20 w-20 text-indigo-100" />
                        <p className="text-xl text-gray-500 font-medium">You haven't enrolled in any courses yet.</p>
                        <p className="text-gray-400 mb-6">Discover amazing courses and start your journey.</p>
                        <Link to="/" className="inline-flex items-center bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition shadow-lg hover:shadow-xl transform active:scale-95">
                            Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {myLearning.map((course, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                                key={course._id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 overflow-hidden flex flex-col group relative"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                        <PlayCircle className="h-16 w-16 text-white" />
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-indigo-600 transition">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6 font-medium">By {course.instructor}</p>

                                    <div className="mt-auto">
                                        <div className="flex justify-between text-xs text-indigo-600 mb-2 font-bold tracking-wide uppercase">
                                            <span>Progress</span>
                                            <span>20%</span>
                                        </div>
                                        <div className="w-full bg-indigo-50 rounded-full h-2 mb-6 overflow-hidden">
                                            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                                        </div>

                                        <Link to={`/course/${course._id}`} className="block text-center w-full bg-white border-2 border-indigo-100 text-indigo-600 font-bold py-2.5 rounded-xl hover:bg-indigo-50 transition group-hover:border-indigo-600">
                                            Continue Learning
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyLearning;
