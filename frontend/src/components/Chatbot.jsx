import React, { useState } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm SkillForge AI. How can I help you today?", isBot: true }
    ]);
    const [input, setInput] = useState('');

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { text: input, isBot: false };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');

        try {
            const res = await axios.post('http://localhost:5000/api/chatbot', { message: userMsg.text });
            setMessages((prev) => [...prev, { text: res.data.response, isBot: true }]);
        } catch (error) {
            setMessages((prev) => [...prev, { text: "Sorry, I'm having trouble connecting right now.", isBot: true }]);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 h-96"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center shadow-md z-10">
                            <div className="flex items-center space-x-2">
                                <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <MessageCircle className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold text-lg">SkillForge AI</h3>
                            </div>
                            <button onClick={toggleChat} className="text-white/80 hover:text-white transition">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 flex flex-col">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: msg.isBot ? -10 : 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${msg.isBot
                                            ? "bg-white text-gray-800 self-start border border-gray-100"
                                            : "bg-indigo-600 text-white self-end text-right"
                                        }`}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                        </div>

                        {/* Input Form */}
                        <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1 px-4 py-2 focus:outline-none bg-gray-100 rounded-full text-sm mr-2 focus:ring-2 focus:ring-indigo-100"
                            />
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                                disabled={!input.trim()}
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleChat}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <MessageCircle className="h-7 w-7" />
                </motion.button>
            )}
        </div>
    );
};

export default Chatbot;
