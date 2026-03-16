import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginUser } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await loginUser(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full glass-panel rounded-3xl p-8 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 -m-20 w-40 h-40 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-0 left-0 -m-20 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>

                <div className="relative z-10 text-center mb-10">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">Welcome Back</h2>
                    <p className="text-gray-500 text-sm">Sign in to continue your learning journey</p>
                </div>

                {error && <div className="mb-4 bg-red-50 text-red-500 p-3 rounded-xl text-sm border border-red-100">{error}</div>}

                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                    <div className="group relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                            placeholder="Email address"
                            required
                        />
                    </div>

                    <div className="group relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-gray-600">
                            <input type="checkbox" className="mr-2 text-indigo-600 focus:ring-indigo-500" />
                            Remember me
                        </label>
                        <a href="#" className="text-indigo-600 hover:underline font-medium">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transform transition active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="relative z-10 text-center mt-8 text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-500 uppercase tracking-wider">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
