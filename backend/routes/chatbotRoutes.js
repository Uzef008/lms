const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy_key'
});

router.post('/', async (req, res) => {
    const { message } = req.body;

    if (!process.env.OPENAI_API_KEY) {
        // Mock response if no API key is provided
        let rep = "I am a mock AI assistant for SkillForge Academy! To enable real AI, add OPENAI_API_KEY in the backend .env file.";
        if (message.toLowerCase().includes('python')) rep = "We have several Python courses, ranging from Beginner to Advanced!";
        else if (message.toLowerCase().includes('development')) rep = "Web development is our most popular category. Check out our Complete Web Development Bootcamp.";
        else if (message.toLowerCase().includes('free')) rep = "You can filter courses by 'Free' on the Courses Dashboard.";

        return res.json({ response: rep });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant for SkillForge Academy, an online learning platform like Udemy. Guide users to find courses and answer their questions about the platform in a concise way." },
                { role: "user", content: message }
            ],
        });
        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
