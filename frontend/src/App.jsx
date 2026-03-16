import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseDetails from './pages/CourseDetails';
import Cart from './pages/Cart';
import MyLearning from './pages/MyLearning';
import Favorites from './pages/Favorites';
import AdminDashboard from './pages/AdminDashboard';
import InstructorProfile from './pages/InstructorProfile';
import { GlobalContext } from './context/GlobalContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(GlobalContext);
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const AdminRoute = ({ children }) => {
    const { user } = useContext(GlobalContext);
    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }
    return children;
};

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/course/:id" element={<CourseDetails />} />
                        <Route path="/instructor/:name" element={<InstructorProfile />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/mylearning" element={
                            <ProtectedRoute><MyLearning /></ProtectedRoute>
                        } />
                        <Route path="/favorites" element={
                            <ProtectedRoute><Favorites /></ProtectedRoute>
                        } />
                        <Route path="/admin" element={
                            <AdminRoute><AdminDashboard /></AdminRoute>
                        } />
                    </Routes>
                </main>
                <Chatbot />
            </div>
        </Router>
    );
}

export default App;
