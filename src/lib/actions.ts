"use server";

import prisma from "./prisma";
import openAIClient from "./openai";
import { ChatCompletionRole, responseSchema } from "@/types";
import citiesData from "@/constants/cities.json";
import placesData from "@/constants/places.json";

import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const placesContext = `
        Cities Data:
        ${JSON.stringify(citiesData)}

        Places Data:
        ${JSON.stringify(placesData)}
      `;

export async function sendMessage(formData: FormData) {
    const content = formData.get("content") as string;

    if (!content) throw new Error("Message content not found!");

    const user = (await prisma.user.findMany())[0];
    const messageObject = await prisma.message.create({
        data: {
            content,
            userId: user.id,
            role: "USER",
        },
    });

    return {
        messageObject,
    };
}

export async function getAIResponse({
    query,
    context,
}: {
    query: { role: ChatCompletionRole; content: string };
    context: { role: ChatCompletionRole; content: string }[];
}) {
    const prompt = `
        You are a helpful travel assistant that ONLY uses the provided data to answer questions. 
        DO NOT use any external knowledge or make up information.
        
        Available Data:
        ${placesContext}

        Question: ${query.content}

        Respond in the following JSON format:
        ${JSON.stringify(responseSchema.shape, null, 2)}

        Rules:
        1. If the user asks about a place that is not in our database, respond with type "text" and explain that we don't have information about that specific place
        2. If the user asks about multiple places or a category of places, respond with type "places" and include all relevant places in the places array
        3. If the user asks about a single place that exists in our database, respond with type "places" and include that single place in the array
        4. Always include a helpful content message that explains the response
        5. NEVER make up information or use knowledge outside of our provided data
      `;

    const openAIResponse = await openAIClient.beta.chat.completions.parse({
        messages: [...context, { role: query.role, content: prompt }],
        model: "gpt-4o-mini",
        response_format: zodResponseFormat(responseSchema, "response"),
    });

    if (!openAIResponse) throw new Error("Failed to get response!");

    let finalResponse: z.infer<typeof responseSchema> = {
        content: "",
        type: "text",
        places: [],
    };

    const message = openAIResponse.choices[0]?.message;

    if (message?.parsed) {
        finalResponse = message.parsed;
    } else {
        finalResponse = {
            content: message?.refusal || "Something went wrong!",
            type: "text",
            places: [],
        };
    }

    const messageObject = await prisma.message.create({
        data: {
            content: JSON.stringify(finalResponse),
            role: "BOT",
        },
    });

    return {
        messageObject,
        aiResponse: finalResponse,
    };
}

export async function getMessages() {
    const messages = await prisma.message.findMany({
        orderBy: {
            createdAt: "asc",
        },
    });

    return messages;
}
