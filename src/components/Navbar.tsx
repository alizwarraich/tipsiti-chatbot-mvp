import React from "react";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
    return (
        <div className="border-b border-border w-full h-full flex items-center justify-between px-8">
            <h2 className="font-bold text-2xl">Tipsiti Chatbot</h2>
            <ModeToggle />
        </div>
    );
};

export default Navbar;
