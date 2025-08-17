// src/components/Chat.tsx
import { useState, useRef, useEffect } from "react";
import { sendChatCompletion, type ChatMessage } from "../api/lmStudio";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

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
        { role: "assistant", content: "❌ Greška: ne mogu da se povežem na LM Studio." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // auto scroll na dno kad dodje nova poruka
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={styles.page}>
      <div style={styles.left}></div>
      <div style={styles.right}>
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
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#0d0d0d", // ista crna kao login
    color: "#f5f5f5",
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    padding: 16,
    backgroundColor: "#1a1a1a", // tamnija nijansa za chat prozor
    boxShadow: "-2px 0 12px rgba(0,0,0,0.6)",
    borderRadius: "16px 0 0 16px",
  },
  history: {
    flex: 1,
    overflowY: "auto",
    padding: 12,
    marginBottom: 12,
    border: "1px solid #333",
    borderRadius: 12,
    background: "#141414",
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
  row: { display: "flex", gap: 8 },
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
    fontWeight: "600",
    boxShadow: "0 2px 8px rgba(156, 53, 144, 0.4)",
  },
};
