import ChatArea from "../components/ChatArea";
import InputArea from "../components/InputArea";

export default function Page() {
    return (
        <div className="p-8 min-h-screen max-h-screen grid grid-rows-[90%_10%] justify-items-center overflow-hidden font-[family-name:var(--font-geist-sans)]">
            <ChatArea />
            <InputArea />
        </div>
    );
}
