import { InputAreaProps, placeSchema } from "@/types";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useTheme } from "next-themes";

import { z } from "zod";
import { Message } from "@prisma/client";
import PlaceCard from "./PlaceCard";

const ChatArea = ({ chat }: InputAreaProps) => {
    const { theme } = useTheme();

    const chatWithPlaces = chat.map(
        (message: Message & { places?: z.infer<typeof placeSchema>[] }) => ({
            ...message,
            places: message.places,
        })
    );

    return (
        <div className="w-full h-full overflow-y-auto p-4 md:p-8 flex flex-col gap-8">
            {chatWithPlaces.map((message) => (
                <div
                    key={message.id}
                    className={`w-full flex gap-2 ${
                        message.role === "USER"
                            ? "flex-row-reverse pl-[20%]"
                            : "flex-row pr-[20%]"
                    }`}
                >
                    {message.role === "USER" ? (
                        <p className="rounded py-1 px-3 bg-muted">
                            {message.content}
                        </p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <MarkdownPreview
                                source={message.content}
                                style={{ backgroundColor: "transparent" }}
                                wrapperElement={{
                                    "data-color-mode":
                                        theme === "light" ? "light" : "dark",
                                }}
                            />
                            {message.places && message.places.length > 0 && (
                                <div className="flex flex-wrap gap-6">
                                    {message.places.map((place) => (
                                        <PlaceCard
                                            key={place.title.toLowerCase()}
                                            place={place}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChatArea;
