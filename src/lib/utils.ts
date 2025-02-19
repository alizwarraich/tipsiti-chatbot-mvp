import { Message } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function removeDuplicateMessages(arr: Message[]) {
    const seenIds = new Set();
    const result = [];

    for (const obj of arr) {
        if (!seenIds.has(obj.id)) {
            seenIds.add(obj.id);
            result.push(obj);
        }
    }

    return result;
}
