"use client";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, SendHorizonal } from "lucide-react";
import { sendMessage } from "@/lib/actions";

const InputArea = () => {
    const [message, setMessage] = React.useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // this is a server action
        const message = await sendMessage(new FormData(e.currentTarget));
        console.log(message);
    };

    return (
        <div className="border border-border rounded-xl w-full p-2 flex flex-col">
            <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={message}
                    name="content"
                    id="content"
                    onChange={(e) => setMessage(e.target.value)}
                    className="shadow-none border-none outline-none focus-visible:ring-0"
                    placeholder="Ask anything..."
                />
                <Button
                    disabled={!message}
                    className="min-w-8 min-h-8 w-8 h-8 rounded-full"
                >
                    <SendHorizonal />
                </Button>
            </form>
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    variant="outline"
                    className="text-xs flex items-center gap-1 rounded-full "
                >
                    <Plus />
                    <span>Suggest a destination</span>
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    className="text-xs flex items-center gap-1 rounded-full "
                >
                    <Plus />
                    <span>Suggest a hotel</span>
                </Button>
            </div>
        </div>
    );
};

export default InputArea;
