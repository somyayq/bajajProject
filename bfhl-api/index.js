const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getFibonacci, isPrime, getHCF, getLCM } = require('./utils');

const app = express();
app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const EMAIL = process.env.OFFICIAL_EMAIL || "your_college_email@chitkara.edu.in";

// GET /health
app.get('/health', (req, res) => {
    res.status(200).json({
        is_success: true,
        official_email: EMAIL
    });
});

// POST /bfhl
app.post('/bfhl', async (req, res) => {
    try {
        const body = req.body;
        const keys = Object.keys(body);

        // 1. Validation: Exactly one functional key must be present 
        // (The user requirement implies we check for specific keys. 
        // The user example shows single key requests. We will strictly follow that.)
        const validKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
        const activeKey = keys.find(k => validKeys.includes(k));

        if (keys.length !== 1 || !activeKey) {
            return res.status(400).json({
                is_success: false,
                official_email: EMAIL,
                error: "Request must contain exactly one valid key: fibonacci, prime, lcm, hcf, or AI"
            });
        }

        const value = body[activeKey];
        let resultData;

        // 2. Logic Mapping
        switch (activeKey) {
            case 'fibonacci':
                if (!Number.isInteger(value) || value < 0) throw new Error("Input must be a positive integer");
                resultData = getFibonacci(value);
                break;

            case 'prime':
                if (!Array.isArray(value)) throw new Error("Input must be an array of integers");
                resultData = value.filter(n => typeof n === 'number' && isPrime(n));
                break;

            case 'lcm':
                if (!Array.isArray(value) || value.length === 0) throw new Error("Input must be a non-empty array");
                resultData = getLCM(value);
                break;

            case 'hcf':
                if (!Array.isArray(value) || value.length === 0) throw new Error("Input must be a non-empty array");
                resultData = getHCF(value);
                break;

            case 'AI':
                if (typeof value !== 'string') throw new Error("Input must be a question string");
                if (!process.env.GEMINI_API_KEY) throw new Error("Gemini API Key is not configured on the server");

                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const prompt = `Answer the following question in strictly one single word: ${value}`;
                try {
                    const result = await model.generateContent(prompt);
                    const response = await result.response;
                    const text = response.text();
                    // Extract text and clean up (remove punctuation/spaces if needed, but user just said single word)
                    // strict cleanup to ensure it's just one word or simple string
                    resultData = text.trim().split(/\s+/)[0].replace(/[^\w]/gi, '');
                } catch (aiError) {
                    console.error("AI Error:", JSON.stringify(aiError, null, 2));
                    throw new Error("AI Service unavailable or failed: " + aiError.message);
                }
                break;
        }

        // 3. Success Response
        return res.status(200).json({
            is_success: true,
            official_email: EMAIL,
            data: resultData
        });

    } catch (error) {
        // 4. Graceful Error Handling
        return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
