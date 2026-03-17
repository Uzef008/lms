import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../apiConfig';

export const GlobalContext = createContext();

export const FormProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [myLearning, setMyLearning] = useState([]);

    useEffect(() => {
        // Load courses
        fetchCourses();

        // Check local storage for user and fetch full profile
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUser = JSON.parse(userInfo);
            setUser(parsedUser);
            fetchUserProfile(parsedUser.token);
        }
    }, []);

    const fetchUserProfile = async (token) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get(`${API_URL}/auth/profile`, config);
            setCart(data.cart || []);
            setFavorites(data.favorites || []);
            setMyLearning(data.myLearning || []);
        } catch (error) {
            console.error('Failed to load user profile', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/courses`);
            setCourses(data);
        } catch (error) {
            console.error("Failed to load courses", error);
        }
    };

    const loginUser = async (email, password) => {
        try {
            const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            await fetchUserProfile(data.token);
            return true;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    const registerUser = async (name, email, password) => {
        try {
            const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            await fetchUserProfile(data.token);
            return true;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    };

    const logoutUser = () => {
        setUser(null);
        setCart([]);
        setFavorites([]);
        setMyLearning([]);
        localStorage.removeItem('userInfo');
    };

    const addToCart = async (course) => {
        if (!cart.find(c => c._id === course._id)) {
            // Optimistic update
            setCart([...cart, course]);
            if (user) {
                try {
                    const config = { headers: { Authorization: `Bearer ${user.token}` } };
                    await axios.post(`${API_URL}/users/cart/${course._id}`, {}, config);
                } catch (error) {
                    console.error('Failed to update cart on server');
                }
            }
        }
    };

    const removeFromCart = async (courseId) => {
        setCart(cart.filter(c => c._id !== courseId));
        if (user) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`${API_URL}/users/cart/${courseId}`, config);
            } catch (error) {
                console.error('Failed to remove from cart on server');
            }
        }
    };

    const toggleFavorite = async (courseId) => {
        if (!user) return false;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post(`${API_URL}/courses/${courseId}/favorite`, {}, config);

            // Re-fetch courses array if needed to map object IDs, but `data` returns array of ObjectIds in current backend.
            // Let's reload profile
            await fetchUserProfile(user.token);
            return true;
        } catch (error) {
            console.error('Failed to toggle favorite');
            return false;
        }
    };

    const checkoutCart = async () => {
        if (!user) return false;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post(`${API_URL}/users/checkout`, {}, config);
            if (data.success) {
                await fetchUserProfile(user.token);
                return true;
            }
        } catch (error) {
            console.error('Failed to checkout cart');
            return false;
        }
    };


    const clearCart = () => setCart([]);

    // We can also sync toggleFavorite if we want, currently it might be in CourseDetails

    return (
        <GlobalContext.Provider value={{
            user, courses, cart, favorites, myLearning,
            loginUser, registerUser, logoutUser, checkoutCart,
            addToCart, removeFromCart, toggleFavorite, setFavorites, setMyLearning, clearCart, fetchCourses, setCart
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
