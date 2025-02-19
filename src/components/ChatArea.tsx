import { InputAreaProps } from "@/types";

const ChatArea = ({ chat }: InputAreaProps) => {
    return (
        <div className="w-full h-full overflow-y-auto p-4 md:p-8 flex flex-col gap-4">
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
                        className={`rounded py-1 ${
                            message.role === "USER" && "px-3 bg-muted"
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
