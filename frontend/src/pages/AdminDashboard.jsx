import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, courses, fetchCourses } = useContext(GlobalContext);
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructor, setInstructor] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchUsers();
        }
    }, [user]);

    const fetchUsers = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/users', config);
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    };

    const handleDeleteCourse = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`http://localhost:5000/api/courses/${id}`, config);
                fetchCourses();
            } catch (error) {
                console.error('Failed to delete course', error);
            }
        }
    };

    const handleEditCourse = (course) => {
        setEditingId(course._id);
        setTitle(course.title);
        setDescription(course.description);
        setInstructor(course.instructor);
        setPrice(course.price);
        setCategory(course.category);
        setThumbnail(course.thumbnail);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const courseData = { title, description, instructor, price: Number(price), category, thumbnail };

            if (editingId) {
                await axios.put(`http://localhost:5000/api/courses/${editingId}`, courseData, config);
                setEditingId(null);
            } else {
                await axios.post('http://localhost:5000/api/courses', courseData, config);
            }
            fetchCourses();
            setTitle(''); setDescription(''); setInstructor(''); setPrice(''); setCategory(''); setThumbnail('');
        } catch (error) {
            console.error('Failed to save course', error);
        }
    };

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                Admin Dashboard
            </h1>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Course' : 'Create New Course'}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 shadow-sm focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Instructor Name</label>
                        <input type="text" value={instructor} onChange={e => setInstructor(e.target.value)} required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 shadow-sm focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 shadow-sm focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input type="text" value={category} onChange={e => setCategory(e.target.value)} required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 shadow-sm focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
                        <input type="url" value={thumbnail} onChange={e => setThumbnail(e.target.value)} required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 shadow-sm focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} required rows="4"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 shadow-sm focus:ring-purple-500 focus:border-purple-500"></textarea>
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            {editingId ? 'Update Course' : 'Publish Course'}
                        </button>
                        {editingId && (
                            <button type="button" onClick={() => { setEditingId(null); setTitle(''); setDescription(''); setInstructor(''); setPrice(''); setCategory(''); setThumbnail(''); }}
                                className="ml-4 bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-all">
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Courses</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {courses.map(course => (
                                <tr key={course._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <img className="h-10 w-10 rounded-md object-cover" src={course.thumbnail} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                                <div className="text-sm text-gray-500">{course.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.instructor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${course.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEditCourse(course)} className="text-indigo-600 hover:text-indigo-900 mr-4 font-semibold hover:underline">Edit</button>
                                        <button onClick={() => handleDeleteCourse(course._id)} className="text-red-600 hover:text-red-900 font-semibold hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Registered Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(u => (
                                <tr key={u._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
