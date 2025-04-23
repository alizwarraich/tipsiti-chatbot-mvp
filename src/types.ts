import { Message } from "@prisma/client";
import { z } from "zod";

export type InputAreaProps = {
    chat: Message[];
    setChat: React.Dispatch<React.SetStateAction<Message[]>>;
};

export type ChatCompletionRole = "user" | "assistant" | "developer" | "system";

export const placeSchema = z.object({
    title: z.string(),
    description: z.string(),
    coverImageUrl: z.string(),
    locationCode: z.string(),
    category: z.string(),
    priceRange: z.string(),
    href: z.string(),
});

export const responseSchema = z.object({
    type: z.enum(["text", "places"]),
    content: z.string(),
    places: z.array(placeSchema).nullable(),
});
