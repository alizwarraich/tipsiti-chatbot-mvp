import OpenAI from "openai";

const openAIClient = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export default openAIClient;
