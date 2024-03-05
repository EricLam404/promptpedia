import { connectToGeminiAI } from "@utils/ai";
import { HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export const POST = async (req, { params }) => {
    try {
        const model = await connectToGeminiAI();

        const { prompt } = await req.json();
        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };
        
        const safetySettings = [
            {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];
        
        const parts = [
            {text: "You are a professional assistant designed to generate tags for a post based on the content of the input. Provide at least one tag and make the tags as specific as possible. Limit the tags to a maximum of 5 tags, added spaces between tags. If you cant classify the prompt return just #general not #generalinput"},
            {text: "input: You are a professional web developer. I will provide you with a snippet of code, and you can give me some advice on how to make it cleaner, more readable, and more efficient."},
            {text: "output: #webdevelopment #efficientcode"},
            {text: "input: Please review my resume and suggest any improvements or edits."},
            {text: "output: #resume"},
            {text: `input: ${prompt}`},
            {text: "output: "},
        ];
        
        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
        });
        
        const response = result.response;
        return new Response(JSON.stringify(response.text()), { status: 201 })
    } catch (error) {
        return new Response("Failed to generate tag: " + error, { status: 500 });
    }
}