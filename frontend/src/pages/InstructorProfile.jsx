import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Users, Star, Award } from 'lucide-react';
import { API_URL } from '../apiConfig';

const InstructorProfile = () => {
    const { name } = useParams();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstructorCourses = async () => {
            try {
                // Fetch all courses and filter by instructor name (simple implementation)
                const { data } = await axios.get(`${API_URL}/courses`);
                const instructorCourses = data.filter(c => c.instructor.toLowerCase() === decodeURIComponent(name).toLowerCase());
                setCourses(instructorCourses);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchInstructorCourses();
    }, [name]);


    if (loading) return <div className="min-h-screen flex items-center justify-center text-indigo-600">Loading profile...</div>;

    const totalStudents = courses.reduce((acc, c) => acc + (c.students?.length || 0), 0);
    const averageRating = courses.length ? courses.reduce((acc, c) => acc + c.rating, 0) / courses.length : 0;

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-gray-900 text-white pt-16 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left md:flex items-center gap-8">
                    <div className="h-32 w-32 rounded-full bg-indigo-500 mx-auto md:mx-0 flex items-center justify-center text-4xl font-bold shadow-2xl border-4 border-indigo-400">
                        {decodeURIComponent(name).charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-indigo-300 font-semibold mb-2">INSTRUCTOR</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{decodeURIComponent(name)}</h1>
                        <p className="text-gray-300 max-w-2xl leading-relaxed">
                            A passionate educator and software engineer dedicated to helping students learn modern technologies.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl flex flex-wrap justify-around p-6 border border-gray-100">
                    <div className="text-center p-4">
                        <div className="text-gray-400 mb-1 flex justify-center"><Users className="h-6 w-6" /></div>
                        <div className="text-2xl font-bold text-gray-900">{totalStudents}</div>
                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Students</div>
                    </div>
                    <div className="text-center p-4">
                        <div className="text-gray-400 mb-1 flex justify-center"><BookOpen className="h-6 w-6" /></div>
                        <div className="text-2xl font-bold text-gray-900">{courses.length}</div>
                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Courses</div>
                    </div>
                    <div className="text-center p-4">
                        <div className="text-gray-400 mb-1 flex justify-center"><Star className="h-6 w-6 fill-yellow-400 text-yellow-500" /></div>
                        <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Instructor Rating</div>
                    </div>
                    <div className="text-center p-4">
                        <div className="text-gray-400 mb-1 flex justify-center"><Award className="h-6 w-6" /></div>
                        <div className="text-2xl font-bold text-gray-900">10k+</div>
                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Reviews</div>
                    </div>
                </div>
            </div>

            {/* Courses List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <h2 className="text-2xl font-bold mb-8 text-gray-900">My Courses ({courses.length})</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {courses.map(course => (
                        <div key={course._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                            <Link to={`/course/${course._id}`}>
                                <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{course.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{course.category}</p>
                                    <div className="flex items-center mb-3">
                                        <span className="text-yellow-500 font-bold mr-1">{course.rating}</span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-4 w-4 ${i < Math.round(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-400 ml-2">({course.numOfReviews})</span>
                                    </div>
                                    <div className="font-extrabold text-lg flex items-center justify-between">
                                        {course.isFree ? 'Free' : `$${course.price}`}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InstructorProfile;
