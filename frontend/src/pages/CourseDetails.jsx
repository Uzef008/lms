import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';
import { PlayCircle, Star, CheckCircle, Clock, Video, FileText, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart, cart, myLearning } = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/courses/${id}`);
                setCourse(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-indigo-600">Loading course details...</div>;
    if (!course) return <div className="min-h-screen flex items-center justify-center text-red-500">Course not found.</div>;

    const inCart = cart.find(c => c._id === course._id);
    const isEnrolled = myLearning.find(c => c._id === course._id);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero section */}
            <div className="bg-gray-900 text-white pt-16 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="md:col-span-2 space-y-6"
                    >
                        <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm">
                            <span>{course.category}</span>
                            <span>&gt;</span>
                            <span>{course.title}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold pb-2">{course.title}</h1>
                        <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">{course.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                            <span className="flex items-center text-yellow-400 font-bold bg-yellow-400/10 px-3 py-1 rounded-full">
                                <Star className="h-4 w-4 mr-1 fill-yellow-400" /> {course.rating}
                            </span>
                            <span>({course.numOfReviews} ratings)</span>
                            <span>•</span>
                            <span>{course.students?.length || 0} students</span>
                            <span>•</span>
                            <span>Created by <Link to={`/instructor/${encodeURIComponent(course.instructor)}`} className="text-indigo-300 underline underline-offset-4 hover:text-indigo-400">{course.instructor}</Link></span>
                        </div>

                        <div className="flex items-center text-sm text-gray-400 gap-4 mt-4">
                            <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> Last updated 12/2023</span>
                            <span className="flex items-center">English</span>
                        </div>
                    </motion.div>

                    {/* Floating Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="md:absolute right-4 sm:right-6 lg:right-8 top-16 w-full md:w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 text-gray-900 z-10"
                    >
                        <div className="relative group cursor-pointer">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                <PlayCircle className="h-16 w-16 text-white" />
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="text-3xl font-extrabold mb-4">
                                {course.isFree ? 'Free' : `$${course.price}`}
                            </div>

                            {isEnrolled ? (
                                <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition mb-4">
                                    Go to Course
                                </button>
                            ) : (
                                <div className="space-y-3 mb-6">
                                    {inCart ? (
                                        <button onClick={() => navigate('/cart')} className="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-800 transition shadow-lg">
                                            Go to Cart
                                        </button>
                                    ) : (
                                        <button onClick={() => addToCart(course)} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition shadow-lg hover:shadow-xl transform active:scale-95">
                                            Add to Cart
                                        </button>
                                    )}
                                    <button className="w-full bg-white text-gray-900 font-bold py-3 px-4 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition">
                                        Buy Now
                                    </button>
                                </div>
                            )}

                            <div className="text-sm">
                                <p className="font-bold mb-3 text-gray-800">This course includes:</p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center"><Video className="h-5 w-5 mr-3 text-gray-400" /> 20 hours on-demand video</li>
                                    <li className="flex items-center"><FileText className="h-5 w-5 mr-3 text-gray-400" /> 15 articles</li>
                                    <li className="flex items-center"><Smartphone className="h-5 w-5 mr-3 text-gray-400" /> Access on mobile and TV</li>
                                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-3 text-gray-400" /> Certificate of completion</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Course Content section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="md:w-2/3 pr-8">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-10 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">What you'll learn</h2>
                        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                            <div className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-indigo-500 flex-shrink-0" />
                                <span>Build highly interactive applications.</span>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-indigo-500 flex-shrink-0" />
                                <span>Master modern techniques and best practices.</span>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-indigo-500 flex-shrink-0" />
                                <span>Deep dive into the core mechanics.</span>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-indigo-500 flex-shrink-0" />
                                <span>Prepare for job interviews efficiently.</span>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Course Content</h2>
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        {course.curriculum && course.curriculum.map((item, index) => (
                            <div key={index} className="border-b border-gray-100 last:border-b-0 p-4 bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition cursor-pointer">
                                <div className="flex items-center font-medium text-gray-800">
                                    <PlayCircle className="h-5 w-5 mr-3 text-indigo-500" />
                                    {item.title}
                                </div>
                                <span className="text-sm text-gray-500">{item.length}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Student Reviews</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            {course.reviews && course.reviews.length > 0 ? (
                                course.reviews.map((review, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <div className="flex items-center mb-4">
                                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-4">
                                                {review.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{review.name}</h4>
                                                <div className="flex items-center text-yellow-400 text-sm">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400' : 'text-gray-300'}`} />
                                                    ))}
                                                    <span className="text-gray-500 ml-2 text-xs">{new Date(review.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-2">No reviews yet. Be the first to review!</p>
                            )}
                        </div>

                        {/* Review Form */}
                        {isEnrolled && (
                            <div className="bg-white p-8 border border-gray-200 rounded-2xl shadow-sm mt-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    const rating = e.target.rating.value;
                                    const comment = e.target.comment.value;

                                    try {
                                        const config = { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` } };
                                        await axios.post(`http://localhost:5000/api/courses/${course._id}/reviews`, { rating, comment }, config);
                                        // Refresh Course
                                        const { data } = await axios.get(`http://localhost:5000/api/courses/${id}`);
                                        setCourse(data);
                                        e.target.reset();
                                        alert('Review submitted successfully!');
                                    } catch (err) {
                                        alert(err.response?.data?.message || 'Failed to submit review');
                                    }
                                }}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                        <select name="rating" required className="w-full border border-gray-300 rounded-lg p-3">
                                            <option value="">Select...</option>
                                            <option value="5">5 - Excellent</option>
                                            <option value="4">4 - Very Good</option>
                                            <option value="3">3 - Good</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="1">1 - Poor</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                                        <textarea name="comment" required rows="4" className="w-full border border-gray-300 rounded-lg p-3"></textarea>
                                    </div>
                                    <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
                                        Submit Review
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
