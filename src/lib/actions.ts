"use server";

import prisma from "./prisma";
import openAIClient from "./openai";
import { ChatCompletionRole } from "@/types";

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
    const openAIResponse = await openAIClient.chat.completions.create({
        messages: [...context, query],
        model: "gpt-3.5-turbo",
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
