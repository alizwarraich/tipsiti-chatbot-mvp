"use server";

import prisma from "./prisma";
import openAIClient from "./openai";
import { ChatCompletionRole } from "@/types";
import citiesData from "@/constants/cities.json";
import placesData from "@/constants/places.json";

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
        You are a helpful travel assistant.  Use the following data to answer the user's question. If data contains some places or cities info, display it in the form of card. If the data does not contain the answer, say "I don't have information about that."

        Data:
        ${placesContext}

        Question: ${query.content}
      `;

    const openAIResponse = await openAIClient.chat.completions.create({
        messages: [...context, { role: query.role, content: prompt }],
        model: "gpt-4-turbo",
    });

    const aiResponse = openAIResponse.choices[0].message.content;

    if (!aiResponse) throw new Error("Failed to get response!");

    const messageObject = await prisma.message.create({
        data: {
            content: aiResponse,
            role: "BOT",
        },
    });

    return {
        messageObject,
        aiResponse,
    };
}
