// src/components/Chat.tsx
import { useState, useRef, useEffect } from "react";
import { sendChatCompletion, type ChatMessage } from "../api/lmStudio";
import ToggleButton from './buttons/ToggleButton';
//import NewChatButton from './buttons/NewChatButton';

import type { User } from "../types/User";

interface ChatProps {
    newChatTrigger?: number;

    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function Chat({ newChatTrigger, user, setUser }: ChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: "system", content: "You are a helpful assistant." },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const [isOpen, setIsOpen] = useState(false);


    //prva poslata poruka
    //const [firstMsgTime, setFirstMsgTime] = useState<Date | null>(null);
    // const [msgCount, setMsgCount] = useState(0);

    const historyRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => setIsOpen(prev => !prev);

    useEffect(() => {
        if (newChatTrigger !== undefined) {
            setMessages([{ role: "system", content: "You are a helpful assistant." }]);
            setInput("");
           // setFirstMsgTime(null);
           // setMsgCount(0);
        }
    }, [newChatTrigger]);

    /*
    function handleNewChat() {
        setMessages([{ role: "system", content: "You are a helpful assistant." }]);
        setInput("");
       // setFirstMsgTime(null);
       // setMsgCount(0);
    }*/

    async function handleSend() {

         if (!user) return;

        //provera vremena
       // const now = new Date();

        const text = input.trim();
        if (!text || loading) return;

        if (user.messagesLeft <= 0) {
            setMessages(prev => [
                ...prev,
                { role: "assistant", content: "You have reached your daily limit of messages." }
            ]);
            return;
        }

        setUser(prev => prev ? { ...prev, messagesLeft: prev.messagesLeft - 1 } : prev);


        const next = [...messages, { role: "user" as const, content: text }];
        setMessages(next);
        setInput("");
        setLoading(true);


        try {
            const reply = await sendChatCompletion(next);
            setMessages([...next, { role: "assistant", content: reply }]);
        } catch (err) {
            setMessages([
                ...next,
                { role: "assistant", content: " Greška: ne mogu da se povežem na LM Studio." },
            ]);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (newChatTrigger !== undefined) {
            setMessages([{ role: "system", content: "You are a helpful assistant." }]);
            setInput("");
        }
    }, [newChatTrigger]);

    return (
        <div style={{ ...styles.page, width: isOpen ? '97%' : '80%' }}>
            <ToggleButton isOpen={isOpen} toggleSidebar={toggleSidebar} />

            {/* CHAT */}
            <div style={styles.history} ref={historyRef}>
                {messages
                    .filter(m => m.role !== "system")
                    .map((m, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.message,
                                ...(m.role === "user" ? styles.userMsg : styles.aiMsg),
                            }}
                        >
                            <b>{m.role === "user" ? "You" : "AI"}:</b> {m.content}
                        </div>
                    ))}
                {loading && <div style={styles.aiMsg}><i>AI typing...</i></div>}
            </div>

            {/* INPUT */}
            <div style={styles.row}>
                <input
                    style={styles.input}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Send a message…"
                    onKeyDown={e => (e.key === "Enter" ? handleSend() : null)}
                />
                <button style={styles.btn} onClick={handleSend} disabled={loading}>
                    Send
                </button>
            </div>
        </div>
    );

}

const styles: Record<string, React.CSSProperties> = {
    page: {
        position: "fixed",
        display: "flex",
        right: 5,
        top: 55,
        height: 'calc(100vh - 60px)',
        //width:"97%",
        flexDirection: "column",
        //backgroundColor: "#826262ff",
        color: "#f5f5f5",
        //zIndex:900,
        transition: "width 0.3s ease",
    },
    history: {
        flex: 1,
        overflowY: "auto",
        padding: 16,
        //width: 900,
        margin: "12px 20px",
        borderRadius: 12,
        background: "#141414",
        border: "1px solid #333",
    },
    message: {
        padding: "10px 14px",
        borderRadius: 12,
        marginBottom: 10,
        maxWidth: "75%",
        wordWrap: "break-word",
    },
    userMsg: {
        backgroundColor: "#d252bdff",
        color: "white",
        marginLeft: "auto",
        textAlign: "right" as const,
    },
    aiMsg: {
        backgroundColor: "#2a2a2a",
        color: "#f1f1f1",
        marginRight: "auto",
        textAlign: "left" as const,
    },
    row: {
        display: "flex",
        gap: 8,
        padding: "0 20px 10px 20px",
    },
    input: {
        flex: 1,
        padding: "10px 12px",
        border: "1.5px solid #d252bdff",
        borderRadius: 8,
        outline: "none",
        fontSize: 15,
        background: "#1f1f1f",
        color: "white",
    },
    btn: {
        padding: "10px 16px",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        background: "#d252bdff",
        color: "white",
        fontWeight: 600,
    },
};
