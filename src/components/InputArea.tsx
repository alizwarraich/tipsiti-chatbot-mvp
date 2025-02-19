"use client";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader, Plus, SendHorizonal } from "lucide-react";
import { getAIResponse, sendMessage } from "@/lib/actions";
import { InputAreaProps } from "@/types";
import { toast } from "sonner";
import { removeDuplicateMessages } from "@/lib/utils";

const InputArea = ({ chat, setChat }: InputAreaProps) => {
    const [message, setMessage] = React.useState("");
    const [responseLoading, setResponseLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // this is a server action
        try {
            setResponseLoading(true);
            const { messageObject } = await sendMessage(
                new FormData(e.currentTarget)
            );

            setChat([...chat, messageObject]);
            const updatedChat = [...chat, messageObject];
            setMessage("");

            const { messageObject: aiMessageObject } = await getAIResponse({
                query: { role: "user", content: messageObject.content },
                context: chat.map((message) => ({
                    role: message.role === "BOT" ? "assistant" : "user",
                    content: message.content,
                })),
            });

            setChat(removeDuplicateMessages([...updatedChat, aiMessageObject]));
            setResponseLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
            setResponseLoading(false);
        }
    };

    return (
        <div className="px-4 md:px-8 w-full">
            <div className="bg-background overflow-hidden border border-border rounded-xl w-full p-2 flex flex-col">
                <form
                    className="flex items-center gap-2"
                    onSubmit={handleSubmit}
                >
                    <Input
                        type="text"
                        value={message}
                        name="content"
                        id="content"
                        disabled={responseLoading}
                        onChange={(e) => setMessage(e.target.value)}
                        className="shadow-none border-none outline-none focus-visible:ring-0"
                        placeholder="Ask anything..."
                    />
                    <Button
                        disabled={!message || responseLoading}
                        className="min-w-8 min-h-8 w-8 h-8 rounded-full"
                    >
                        {responseLoading ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <SendHorizonal />
                        )}
                    </Button>
                </form>
                <div className="flex items-center gap-2">
                    <Button
                        size="xs"
                        variant="outline"
                        className="text-xs flex items-center gap-1 rounded-full"
                        disabled={true || responseLoading}
                    >
                        <Plus />
                        <span>Suggest a destination</span>
                    </Button>
                    <Button
                        size="xs"
                        variant="outline"
                        className="text-xs flex items-center gap-1 rounded-full"
                        disabled={true || responseLoading}
                    >
                        <Plus />
                        <span>Suggest a hotel</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InputArea;
