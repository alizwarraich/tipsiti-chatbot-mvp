import { InputAreaProps } from "@/types";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useTheme } from "next-themes";

const ChatArea = ({ chat }: InputAreaProps) => {
    const { theme } = useTheme();
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
                    {message.role === "USER" ? (
                        <p className="rounded py-1 px-3 bg-muted">
                            {message.content}
                        </p>
                    ) : (
                        <MarkdownPreview
                            source={message.content}
                            style={{ backgroundColor: "transparent" }}
                            wrapperElement={{
                                "data-color-mode":
                                    theme === "light" ? "light" : "dark",
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChatArea;
