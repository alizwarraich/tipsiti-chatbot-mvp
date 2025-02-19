import { Message } from "@prisma/client";

export type InputAreaProps = {
    chat: Message[];
    setChat: React.Dispatch<React.SetStateAction<Message[]>>;
};
