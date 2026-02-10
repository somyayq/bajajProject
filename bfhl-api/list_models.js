const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Dummy init to get properly authorized if needed, though usually main entry is client.
        // actually SDK doesn't have listModels on the instance directly in all versions, 
        // but let's try a direct fetch if sdk fails or use the curl approach which is more reliable for debugging.

        console.log("Using Key:", process.env.GEMINI_API_KEY ? "Present" : "Missing");

        // Using simple fetch to list models to be 100% sure what the raw API sees
        const key = process.env.GEMINI_API_KEY;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                if (m.name.includes("gemini")) console.log(`- ${m.name} (${m.supportedGenerationMethods})`);
            });
        } else {
            console.log("Error listing models:", JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
