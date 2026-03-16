import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { ShoppingCart, Heart, User, LogOut, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logoutUser, cart } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                            SkillForge
                        </Link>
                    </div>

                    <div className="hidden md:flex flex-1 items-center justify-center px-8">
                        <div className="w-full max-w-lg relative">
                            <input type="text" placeholder="Search for courses..." className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600">
                            <ShoppingCart className="h-6 w-6" />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <>
                                <Link to="/mylearning" className="text-gray-600 hover:text-indigo-600 font-medium">My Learning</Link>
                                <Link to="/favorites" className="text-gray-600 hover:text-indigo-600">
                                    <Heart className="h-6 w-6" />
                                </Link>
                                <div className="relative group">
                                    <button className="flex items-center text-gray-600 hover:text-indigo-600 focus:outline-none">
                                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block border border-gray-100">
                                        <div className="px-4 py-2 border-b">
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                        {user.role === 'admin' && (
                                            <Link to="/admin" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                                                <User className="h-4 w-4 mr-2" /> Admin Panel
                                            </Link>
                                        )}
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center border-t border-gray-100">
                                            <LogOut className="h-4 w-4 mr-2" /> Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex space-x-4">
                                <Link to="/login" className="px-4 py-2 rounded-md text-indigo-600 border border-indigo-600 font-medium hover:bg-indigo-50 transition">Log In</Link>
                                <Link to="/register" className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">Sign Up</Link>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-indigo-600">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu (simplified) */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t p-4">
                    <Link to="/" className="block py-2 text-gray-800">Home</Link>
                    <Link to="/cart" className="block py-2 text-gray-800">Cart ({cart.length})</Link>
                    {user ? (
                        <>
                            <Link to="/mylearning" className="block py-2 text-gray-800">My Learning</Link>
                            <Link to="/favorites" className="block py-2 text-gray-800">Favorites</Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="block py-2 text-indigo-600 font-medium">Admin Panel</Link>
                            )}
                            <button onClick={handleLogout} className="block py-2 text-red-600 w-full text-left">Logout</button>
                        </>
                    ) : (
                        <div className="flex flex-col space-y-2 mt-4">
                            <Link to="/login" className="text-center px-4 py-2 rounded-md text-indigo-600 border border-indigo-600">Log In</Link>
                            <Link to="/register" className="text-center px-4 py-2 rounded-md bg-indigo-600 text-white">Sign Up</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
