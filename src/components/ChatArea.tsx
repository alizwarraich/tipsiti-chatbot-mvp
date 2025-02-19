import { InputAreaProps } from "@/types";

const ChatArea = ({ chat }: InputAreaProps) => {
    return (
        <div className="w-full flex flex-col gap-6">
            {chat.map((message) => (
                <div
                    key={message.id}
                    className={`w-full flex gap-2 ${
                        message.role === "USER"
                            ? "flex-row-reverse"
                            : "flex-row"
                    }`}
                >
                    <p
                        className={`rounded px-3 py-1 ${
                            message.role === "USER" && "bg-muted"
                        }`}
                    >
                        {message.content}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ChatArea;
