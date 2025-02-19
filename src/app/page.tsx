"use client";

import React from "react";
import ChatArea from "../components/ChatArea";
import InputArea from "../components/InputArea";
import { Message } from "@prisma/client";
import Navbar from "@/components/Navbar";

export default function Page() {
    const [chat, setChat] = React.useState<Message[]>([]);

    return (
        <div className="min-h-screen max-h-screen grid grid-rows-[5%_95%] overflow-hidden">
            <Navbar />
            <div className="grid grid-rows-[90%_10%] justify-items-center font-[family-name:var(--font-geist-sans)]">
                <ChatArea chat={chat} setChat={setChat} />
                <InputArea chat={chat} setChat={setChat} />
            </div>
        </div>
    );
}
