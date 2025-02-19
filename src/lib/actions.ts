"use server";

import { Message, User } from "@prisma/client";
import prisma from "./prisma";

export async function sendMessage(formData: FormData) {
    const content = formData.get("content") as string;

    if (!content) throw new Error("Message content not found!");

    const user: User = (await prisma.user.findMany())[0];
    const message: Message = await prisma.message.create({
        data: {
            content,
            userId: user.id,
            role: "USER",
        },
    });

    console.log(`Created message ${message.id}`);

    return message;
}
