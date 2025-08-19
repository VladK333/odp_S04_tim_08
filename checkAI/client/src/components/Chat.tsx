// src/components/Chat.tsx
import { useState, useRef, useEffect } from "react";
import { sendChatCompletion, type ChatMessage } from "../api/lmStudio";

interface ChatProps {
    onLoginClick: () => void; // callback za otvaranje login forme
}

export default function Chat({ onLoginClick }: ChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: "system", content: "You are a helpful assistant." },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    //prva poslata poruka
    const [firstMsgTime, setFirstMsgTime] = useState<Date | null>(null);
    const [msgCount, setMsgCount] = useState(0);


    const historyRef = useRef<HTMLDivElement>(null);

    async function handleSend() {

        //provera vremena
        const now = new Date();

        // resetuj limit ako je novi dan
        if (firstMsgTime && now.toDateString() !== firstMsgTime.toDateString()) {
            setFirstMsgTime(null);
            setMsgCount(0);
        }

        if (msgCount >= 50) {
            setMessages(prev => [
                ...prev,
                { role: "assistant", content: "You have reached your daily limit of 50 messages. Please try again tomorrow." }
            ]);
            return;
        }

        const text = input.trim();
        if (!text || loading) return;


        // prvi put danas
        if (!firstMsgTime) setFirstMsgTime(now);
        setMsgCount(prev => prev + 1);


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
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div style={styles.page}>
            {/* TAB GORE */}
            <div style={styles.tab}>
                <div style={styles.title}>CheckAI</div>
                <button style={styles.loginBtn} onClick={onLoginClick}>Log In</button>
                <button style={styles.loginBtn} onClick={() => setMessages([{ role: "system", content: "You are a helpful assistant." }])}>
    New Chat
  </button>
            </div>

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
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0d0d0d",
        color: "#f5f5f5",
        padding: 0,
        margin: 0,
    },
    tab: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        borderBottom: "1px solid #333",
        backgroundColor: "#1a1a1a",
    },
    title: {
        fontSize: 22,
        fontWeight: 600,
        color: "#d252bdff",
    },
    loginBtn: {
        padding: "6px 16px",
        border: "none",
        borderRadius: 8,
        backgroundColor: "#d252bdff",
        color: "white",
        cursor: "pointer",
        fontWeight: 600,
    },
    history: {
        flex: 1,
        overflowY: "auto",
        padding: 16,
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
        padding: "0 20px 20px 20px",
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
        boxShadow: "0 2px 8px rgba(156, 53, 144, 0.4)",
    },
};
