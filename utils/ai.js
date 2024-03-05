import { GoogleGenerativeAI } from "@google/generative-ai";

let model;

const MODEL_NAME = "gemini-pro"
let isConnected = false;

export const connectToGeminiAI = async () => {
    if(isConnected) {
        console.log("GeminiAI is already connected")
        return model;
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        isConnected = true;
        model = genAI.getGenerativeModel({ model: MODEL_NAME})
        console.log("GeminiAI is connected")
        return model;
    } catch (error) {
        console.log(error)
    }
}